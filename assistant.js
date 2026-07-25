/* ═══════════════════════════════════════════════════════════════
   SARII — voice assistant for the Club Mahindra wayfinding app
   ═══════════════════════════════════════════════════════════════
   Shared by index.html and map.html. Pure browser APIs, no
   dependencies and no network calls of our own:
     · speechSynthesis      → Siri's voice (works offline)
     · SpeechRecognition    → hearing the guest
   IMPORTANT BROWSER LIMITS (deliberately surfaced to the guest
   rather than failing silently):
     · SpeechRecognition exists in Chrome/Edge/Safari, NOT Firefox.
       In Chrome it streams audio to Google's servers, so listening
       needs internet even though speaking does not.
     · Both need https (or localhost) — same secure-context rule
       that governs GPS.
     · Browsers block speech until the guest interacts with the
       page, so the welcome line is queued and delivered on the
       first tap/keypress if it cannot play immediately.
   ═══════════════════════════════════════════════════════════════ */
(function(){
'use strict';

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;

/* Two independent switches, because they answer different needs:
     cmr_voice     — the conversational assistant (microphone, wake word,
                     questions & answers). OFF unless the guest turns it on.
     cmr_nav_voice — spoken navigation: "starting the route…", turn calls,
                     "you are near…", "you have arrived". ON by default,
                     because that is the part everyone expects to just work. */
const LS_KEY = 'cmr_voice';
const LS_NAV = 'cmr_nav_voice';
const SS_GREET = 'cmr_greeted';      // per-tab: "this guest already heard the welcome"

const Siri = {
  enabled:false, navVoice:true, greeted:false, listening:false, speaking:false,
  recog:null, voice:null, lastSpoken:'', micDenied:false, errCount:0,
  cfg:{ welcome:'', onCommand:null, hint:'' },

  _readFlags(){
    try{
      this.enabled  = localStorage.getItem(LS_KEY)==='1';   // OFF unless switched on
      this.navVoice = localStorage.getItem(LS_NAV)!=='0';   // ON unless switched off
    }catch(e){ this.enabled=false; this.navVoice=true; }
    if(this._greetedThisSession()) this.greeted=true;
  },

  /* The welcome belongs to the session, not the page: it is spoken once when
     the guest signs in, and every page afterwards knows it has been said. Since
     sign-in is per-tab, that works out to exactly one welcome per visit. */
  _greetedThisSession(){ try{ return sessionStorage.getItem(SS_GREET)==='1'; }catch(e){ return false; } },
  markGreeted(){ this.greeted=true; try{ sessionStorage.setItem(SS_GREET,'1'); }catch(e){} },

  /* ── page setup ─────────────────────────────────────────── */
  configure(cfg){
    Object.assign(this.cfg, cfg||{});
    this._readFlags();
    this._buildUI();
    if(synth) synth.onvoiceschanged = ()=>this._pickVoice();
    if(this.enabled){
      // She was switched on before this page loaded — the guest did it on the
      // main page. Microphone permission is already granted for this origin, so
      // open the ear straight away rather than waiting for a tap: otherwise she
      // looks "on" while hearing nothing, and the guest switches her on again.
      this._startRecog();
      this._tryGreet();
      // Some browsers ignore speak() issued while the page is still parsing,
      // so try again at the points where the engine is reliably awake.
      if(document.readyState!=='complete')
        window.addEventListener('load',()=>{ if(!this.greeted) this._tryGreet(true); },{once:true});
      setTimeout(()=>{ if(!this.greeted) this._tryGreet(true); this._startRecog(); },900);
    }
    // Audio and the microphone both need a real user gesture in most browsers,
    // so ANY first interaction re-attempts the greeting and opens the mic.
    const arm = ()=>{
      if(!this.enabled) return;
      if(!this.greeted) this._tryGreet(true);
      this._startRecog();
      if(this.greeted){
        ['pointerdown','touchstart','click','keydown','scroll'].forEach(ev=>
          document.removeEventListener(ev,arm,true));
      }
    };
    ['pointerdown','touchstart','click','keydown','scroll'].forEach(ev=>
      document.addEventListener(ev,arm,true));
  },

  /* Chrome reports an empty voice list until the engine warms up, and speaking
     during that window fails silently — so wait (briefly) for it. */
  _voicesReady(){
    return new Promise(res=>{
      if(!synth) return res();
      if((synth.getVoices()||[]).length) return res();
      let done=false; const fin=()=>{ if(!done){done=true;res();} };
      try{ synth.addEventListener('voiceschanged',fin,{once:true}); }catch(e){}
      const prev=synth.onvoiceschanged;
      synth.onvoiceschanged=()=>{ try{prev&&prev();}catch(e){} fin(); };
      setTimeout(fin,1200);            // never hang on a browser that stays silent
    });
  },

  /* Several things race to deliver the welcome (load, a timer, the first
     gesture, the unlock button). Exactly one attempt may be in flight at a
     time — otherwise the browser queues them all and the guest hears the
     greeting three or four times over once audio is finally allowed. */
  _tryGreet(){
    if(this.greeted||!this.cfg.welcome||!synth) return;
    if(this._greetInFlight) return;
    this._greetInFlight=true;
    this._voicesReady().then(()=>{
      this._pickVoice();
      this._utter(this.cfg.welcome,{
        onStart:()=>{ this.markGreeted(); this._greetInFlight=false; this._showUnlock(false); },
        onBlocked:()=>{ this._greetInFlight=false; this._showUnlock(true); }
      });
    });
  },

  supported(){ return !!(synth); },
  canListen(){ return !!SR; },

  /* ── speaking ───────────────────────────────────────────── */
  speak(text,opts){
    opts=opts||{};
    if(!text) return;
    if(!this.enabled && !opts.force) return;
    if(!synth) return;
    this.lastSpoken = text;
    this._utter(text,opts);
  },
  repeat(){ if(this.lastSpoken) this.speak(this.lastSpoken); },

  /* Spoken navigation — route start, turn calls, landmarks, arrival. This is
     deliberately NOT tied to `enabled`: the guest can leave the question-and-
     answer assistant switched off and still be talked through the walk. */
  sayNav(text,opts){
    if(!this.navVoice||!text||!synth) return;
    this.lastSpoken = text;
    this._utter(text, Object.assign({},opts||{}));
  },
  setNavVoice(on){
    this.navVoice=!!on;
    try{ localStorage.setItem(LS_NAV, this.navVoice?'1':'0'); }catch(e){}
    if(!this.navVoice && !this.enabled){ try{ synth&&synth.cancel(); }catch(e){} this.speaking=false; }
  },

  /* Speak, then run `done` when the line finishes (or after maxWait, so a
     silent/blocked engine can never strand the caller). Used by the sign-in
     page: the click is a real user gesture, which is the one moment audio is
     guaranteed to be allowed — so the welcome is spoken there, before we
     navigate to the dashboard. */
  speakThen(text,done,maxWait){
    let fired=false;
    const go=()=>{ if(fired)return; fired=true; try{done&&done();}catch(e){} };
    // No `enabled` check on purpose — the caller has already decided this line
    // should be said (the sign-in welcome is spoken even with Q&A switched off).
    if(!synth||!text){ go(); return; }
    this.lastSpoken=text;
    const t=setTimeout(go, maxWait||3500);
    this._utter(text,{
      onEnd:()=>{ clearTimeout(t); setTimeout(go,180); },
      onBlocked:()=>{ clearTimeout(t); go(); }
    });
  },

  /* Core speech call. `onStart` fires only when audio genuinely begins, and
     `onBlocked` when it does not — that is how we detect the browser's
     autoplay block rather than guessing from synth.speaking.

     Two Chrome quirks are worked around here:
       1. cancel() immediately followed by speak() can kill the new utterance,
          so we only cancel when something is really playing, and give the
          queue a tick to clear before speaking.
       2. the TTS engine can take over a second to warm up on the first
          utterance, so a short "did it start?" window produces false
          negatives — we wait longer and retry once before giving up. */
  _utter(text,opts){
    opts=opts||{};
    if(!this.voice) this._pickVoice();
    // Don't let Siri hear herself: recognition pauses while speaking.
    this._pauseRecog();
    const busy = !!(synth.speaking||synth.pending);
    if(busy && opts.interrupt!==false){ try{ synth.cancel(); }catch(e){} }
    const fire=()=>this._rawSpeak(text,opts,0);
    if(busy) setTimeout(fire,90); else fire();
  },
  _rawSpeak(text,opts,attempt){
    const u = new SpeechSynthesisUtterance(text);
    // Brave (and any browser with strict fingerprinting protection) hides the
    // voice list. Forcing a voice/lang we cannot verify makes it silent, so we
    // only set them when a real voice was found and otherwise use the defaults.
    if(this.voice){ u.voice = this.voice; if(this.voice.lang) u.lang = this.voice.lang; }
    const tone = this._tone();
    u.rate = tone.rate; u.pitch = tone.pitch; u.volume = 1;
    this.speaking = true;
    this._setBubble(text);
    let started=false, settled=false;
    u.onstart = ()=>{
      started=true; settled=true;
      this.audioBlocked=false; this._paint();
      opts.onStart&&opts.onStart();
    };
    u.onend = u.onerror = ()=>{ this.speaking=false; this._resumeRecog(); opts.onEnd&&opts.onEnd(); };
    try{
      synth.speak(u);
      // Chrome sometimes parks the queue paused (notably after a navigation).
      if(synth.paused){ try{ synth.resume(); }catch(e){} }
    }catch(e){ this.speaking=false; this._resumeRecog(); }
    setTimeout(()=>{
      if(started||settled) return;
      if(synth.speaking||synth.pending) return;      // still warming up — let it run
      if(attempt<1){                                  // one clean retry
        try{ synth.cancel(); }catch(e){}
        setTimeout(()=>this._rawSpeak(text,opts,attempt+1),120);
        return;
      }
      this.speaking=false;
      this.audioBlocked=true;
      this._paint();
      opts.onBlocked&&opts.onBlocked();
    },1500);
  },

  /* ── choosing the voice ─────────────────────────────────────────
     Every operating system ships its own text-to-speech engine, so no two
     devices can be given the *same* voice — there is no way to bundle one
     without a paid cloud TTS service. What we can do is always reach for the
     same KIND of voice: the calm, natural, female English voice each platform
     offers, in the order below, so an iPhone, an Android and a laptop all
     sound as close to one another (and to Siri) as the device allows.

     Named first, best first, per platform. Anything not listed still gets
     scored on language / gender / "natural" below. */
  _voiceRank(name){
    const N = String(name||'').toLowerCase();
    const PREFERRED = [
      /* Apple — iOS & macOS. Samantha IS the classic Siri-family timbre. */
      'samantha','ava','allison','susan','zoe','serena','karen','tessa','moira','fiona',
      /* Microsoft — Windows/Edge. "Online (Natural)" voices are neural and soft.
         Ana is deliberately absent: it is a child voice. */
      'neerja','aria','jenny','sonia','libby','michelle','heera','hazel','zira',
      /* Google — Android & Chrome. */
      'google uk english female','google us english','google english'
    ];
    /* Whole words only — otherwise "ava" would also match names that merely
       contain those three letters. */
    for(let i=0;i<PREFERRED.length;i++){
      const p=PREFERRED[i];
      if(new RegExp('(^|[^a-z])'+p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^a-z]|$)').test(N))
        return PREFERRED.length-i;
    }
    return 0;
  },
  _pickVoice(){
    if(!synth) return;
    const vs = synth.getVoices()||[];
    if(!vs.length) return;                        // Brave hides the list — use the default
    const female = /female|woman|samantha|ava|allison|susan|zoe|serena|karen|tessa|moira|fiona|zira|aria|jenny|sonia|libby|michelle|neerja|heera|veena|salli|joanna|kalpana|lekha/i;
    const male   = /male\b|man\b|rishi|daniel|alex|fred|oliver|ryan|guy|david|mark|prabhat|hemant/i;
    /* "compact"/"eloquence" are the old robotic Apple voices; novelty voices
       (Albert, Bad News, …) are jokes. Both are the opposite of soft. */
    const harsh  = /compact|eloquence|novelty|albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|hysterical|pipe organ|trinoids|whisper|zarvox|jester|superstar|wobble|grandma|grandpa|rocko|shelley|sandy|flo|reed|eddy/i;
    const score = v=>{
      let s = this._voiceRank(v.name) * 10;       // a named favourite wins outright
      if(/^en[-_]IN/i.test(v.lang)) s+=9;         // Indian English first — Indian resorts
      else if(/^en[-_]GB/i.test(v.lang)) s+=6;
      else if(/^en[-_](US|AU|NZ|IE|ZA)/i.test(v.lang)) s+=5;
      else if(/^en/i.test(v.lang)) s+=4;
      else s-=25;                                 // never read English in a non-English voice
      if(/natural|neural|enhanced|premium|siri/i.test(v.name)) s+=8;   // the soft ones
      if(female.test(v.name)) s+=5;
      if(male.test(v.name)) s-=6;
      if(harsh.test(v.name)) s-=30;
      if(v.localService===false) s+=1;            // cloud/neural voices sound better
      return s;
    };
    const best = vs.slice().sort((a,b)=>score(b)-score(a))[0] || null;
    if(best && score(best) <= 0) return;          // nothing decent — leave the default alone
    this.voice = best;
  },

  /* Same intent everywhere, with a small per-engine correction: Google's
     Android voice reads brighter and quicker than Apple's at identical
     numbers, so it gets nudged down to match. Unhurried and level is what
     makes a voice sound "soft" — not volume. */
  _tone(){
    const n=(this.voice&&this.voice.name||'').toLowerCase();
    if(/google/.test(n))     return {rate:0.92, pitch:0.96};
    if(/microsoft/.test(n))  return {rate:0.95, pitch:1.00};
    return {rate:0.95, pitch:1.00};               // Apple, Samsung, and unknown engines
  },

  /* No visible unlock prompt by design — if the browser blocks audio we simply
     retry silently on the guest's first tap (see the gesture arming in
     configure). Sign-in speaks inside a real gesture, so this is rare. */
  _showUnlock(){},

  /* ── listening ──────────────────────────────────────────── */
  _startRecog(){
    if(!SR || !this.enabled || this.listening || this.micDenied) return;
    try{
      const r = new SR();
      r.lang='en-IN'; r.continuous=false; r.interimResults=false; r.maxAlternatives=3;
      r.onresult = e=>{
        this.errCount=0;
        const alts=[];
        for(let i=0;i<e.results[0].length;i++) alts.push(e.results[0][i].transcript);
        const said = alts[0]||'';
        this._setBubble('“'+said+'”', true);
        this._handle(said, alts);
      };
      r.onerror = e=>{
        if(e.error==='not-allowed'||e.error==='service-not-allowed'){
          this.micDenied=true; this.listening=false;
          this._micOut('Microphone is blocked. Siri can still speak.');
          return;
        }
        // Brave ships the SpeechRecognition object but removes the Google
        // speech service behind it, so every attempt fails with `network`.
        // Firefox has no recognition at all. Either way: fall back to typing.
        if(e.error==='network'){
          this.netFails=(this.netFails||0)+1;
          if(this.netFails>=2){
            this.micDenied=true; this.listening=false;
            this._micOut('Voice input is not available in this browser.');
            return;
          }
        }
        this.errCount++;
      };
      r.onend = ()=>{
        this.listening=false;
        // keep the ear open, but back off if the service keeps failing
        if(this.enabled && !this.micDenied && !this._recogPaused && this.errCount<6){
          setTimeout(()=>this._startRecog(), this.errCount?800:250);
        }else if(this.errCount>=6&&!this.micDenied){
          this.micDenied=true; this._micOut('Voice input is unavailable right now.');
        }
      };
      this.recog=r; r.start(); this.listening=true; this._paint();
    }catch(e){ this.listening=false; this.micDenied=true; this._micOut('Voice input is not available in this browser.'); }
  },
  /* mic is unusable — reveal the typed input so the assistant still works */
  _micOut(msg){
    this._setBubble(msg);
    this._paint();
  },
  _pauseRecog(){ this._recogPaused=true; try{ this.recog&&this.recog.abort(); }catch(e){} this.listening=false; },
  _resumeRecog(){ this._recogPaused=false; if(this.enabled) setTimeout(()=>this._startRecog(),220); },
  _stopRecog(){ this._recogPaused=true; try{ this.recog&&this.recog.abort(); }catch(e){} this.listening=false; },

  /* ── is this actually being said TO her? ─────────────────────────
     The microphone hears the whole lobby, not just the guest holding the
     phone. Answering a sentence that merely happened to contain "today" or
     "food" is worse than staying quiet, so anything that does not look like
     it was aimed at Siri is ignored completely — no answer, not even an
     apology. Something counts as aimed at her when it names her, is a
     greeting, opens like a question or an instruction, is short the way
     people speak to a phone, or lands while she is mid-conversation. */
  _norm(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim(); },
  /* speech-to-text stretches greetings out — "hii", "heyyy", "helloo", "hmmm" */
  _GREET:/^(h+i+|h+e+y+|h+e+l+l*o+|h+m+|m+h*m+|yo|namaste|hola|excuse me|are you there|you there|listen|good (morning|afternoon|evening|night))$/,
  _OPENER:/^(what|where|when|which|who|whose|why|how|is|are|was|were|do|does|did|can|could|will|would|should|shall|tell|show|take|give|find|guide|navigate|open|start|stop|exit|cancel|clear|repeat|help|please|lets|let|route|distance|near|walk|drive|go)\b|^i (want|need|am|m|would|d like)\b/,

  /* "siri", "hi siri", "hii siri", "hello", "hmm" — all mean "wake up" */
  isWake(text){
    let t=this._norm(text);
    if(!t) return false;
    t=t.replace(/^siri\b\s*/,'').replace(/\s*\bsiri$/,'').trim();
    if(!t) return true;
    return this._GREET.test(t);
  },
  /* drop a leading "siri" / "hey siri" so "siri take me to the pool" still works */
  stripWake(text){
    return String(text||'').replace(/^\s*((o+k+a*y*|h+e+y+|h+i+|h+e+l+l*o+)\s+)?siri\b[\s,.!?]*/i,'').trim();
  },
  addressed(text,inConversation){
    if(inConversation) return true;
    let t=this._norm(text);
    if(!t) return false;
    if(/\bsiri\b/.test(t)) return true;
    if(this.isWake(t)) return true;
    t=t.replace(/^(h+i+|h+e+y+|h+e+l+l*o+|namaste|ok|okay|please)\s+/,'');   // "hello take me to…"
    if(this._OPENER.test(t)) return true;
    return t.split(' ').length<=4;      // people speak to a phone in short phrases
  },

  _handle(said, alts){
    const fn = this.cfg.onCommand;
    if(!fn){ return; }
    const list = alts&&alts.length ? alts : [said];
    let talking=false;
    try{ talking = !!(this.cfg.inConversation && this.cfg.inConversation()); }catch(e){}
    if(!list.some(a=>this.addressed(a,talking))) return;   // overheard, not asked
    let handled=false;
    try{ handled = fn(said, list); }catch(e){ handled=false; }
    // She was asked something and has no answer — say only that.
    if(!handled) this.speak(this.cfg.hint || 'Sorry.');
  },

  /* Ask by typing — identical handling to speech, so every command and
     question works the same whether it was spoken or typed. */
  ask(text){
    const q=String(text||'').trim();
    if(!q) return;
    this._setBubble('“'+q+'”', true);
    // A typed submit is a user gesture, so this also unblocks her voice.
    if(!this.greeted) this.greeted=true;
    this._handle(q,[q]);
  },
  showAsk(){},   /* typed input removed — voice only */

  /* Let a page mount its own labelled on/off switch (e.g. on the dashboard). */
  mountToggle(target,label){
    const el=(typeof target==='string')?document.getElementById(target):target;
    if(!el) return null;
    const btn=document.createElement('button');
    btn.type='button'; btn.className='siri-switch'; btn.id='siriSwitch';
    const name=label||'Voice assistant';
    const paint=()=>{
      btn.classList.toggle('on',this.enabled);
      btn.innerHTML='<span class="dot"></span>'+name+' · '+(this.enabled?'On':'Off');
      btn.setAttribute('aria-pressed',this.enabled?'true':'false');
    };
    btn.onclick=()=>{
      if(this.enabled && !this.greeted){ this._tryGreet(); this._startRecog(); paint(); return; }
      this.toggle(); paint();
    };
    this._switchPaint=paint;
    paint();
    el.appendChild(btn);
    return btn;
  },

  /* ── on/off ─────────────────────────────────────────────── */
  toggle(){ this.setEnabled(!this.enabled); },
  setEnabled(on){
    this.enabled=!!on;
    localStorage.setItem(LS_KEY, this.enabled?'1':'0');
    if(this.enabled){
      this.micDenied=false; this.errCount=0; this.audioBlocked=false;
      this._showUnlock(false);
      // A toggle click IS a user gesture, so this is the reliable moment to speak.
      // The full welcome is only for a guest who somehow never heard it at sign-in.
      this.speak((this.greeted||!this.cfg.welcome)
        ? 'Voice assistant is on. How can I help you?' : this.cfg.welcome, {force:true});
      this.markGreeted();
      this._startRecog();
    }else{
      try{ synth&&synth.cancel(); }catch(e){}
      this.speaking=false;
      this._showUnlock(false);
      this._stopRecog();
      this._setBubble('Voice assistant off');
      setTimeout(()=>this._setBubble(''),1600);
    }
    this._paint();
  },

  /* ── tiny UI: one toggle button + a status bubble ───────── */
  _buildUI(){
    if(document.getElementById('siriBtn')) return;
    const style=document.createElement('style');
    style.textContent=`
.siri-dock{position:fixed;right:16px;bottom:16px;z-index:60;display:flex;flex-direction:column;
  align-items:flex-end;gap:8px;max-width:min(340px,80vw)}
.siri-btn{width:46px;height:46px;border-radius:50%;position:relative;flex:none;
  border:1px solid #2E4437;background:#1B2A20EE;color:#9DB3A4;cursor:pointer;display:grid;place-items:center;
  box-shadow:0 8px 22px #0008;backdrop-filter:blur(4px);transition:.15s;padding:0}
.siri-btn:hover{border-color:#F2A93B;color:#F2A93B}
.siri-btn.on{background:#2A2013;border-color:#F2A93B;color:#F2A93B}
.siri-btn.listening::after{content:"";position:absolute;inset:-4px;border-radius:50%;
  border:2px solid #F2A93B66;animation:siriPulse 1.4s ease-out infinite}
@keyframes siriPulse{0%{transform:scale(.9);opacity:.9}100%{transform:scale(1.25);opacity:0}}
.siri-btn svg{width:21px;height:21px;display:block}
.siri-row{display:flex;gap:8px;align-items:center}
.siri-bubble{max-width:100%;background:#1B2A20F2;border:1px solid #2E4437;color:#EDE7D6;border-radius:13px;
  padding:9px 13px;font:500 13px 'Instrument Sans',system-ui,sans-serif;line-height:1.45;
  box-shadow:0 10px 28px #0008;opacity:0;transform:translateY(6px);transition:.2s;
  pointer-events:none;display:none}
.siri-bubble.show{opacity:1;transform:translateY(0);display:block}
.siri-bubble.heard{color:#F2A93B}
/* inline on/off switch a page can mount anywhere */
.siri-switch{display:inline-flex;align-items:center;gap:9px;cursor:pointer;background:#16241B;
  border:1px solid #2E4437;border-radius:999px;padding:8px 14px;color:#9DB3A4;
  font:600 12.5px 'Instrument Sans',system-ui,sans-serif;transition:.15s}
.siri-switch:hover{border-color:#F2A93B}
.siri-switch .dot{width:9px;height:9px;border-radius:50%;background:#6E8577;flex:none;transition:.15s}
.siri-switch.on{color:#F2A93B;border-color:#F2A93B;background:#2A2013}
.siri-switch.on .dot{background:#F2A93B;box-shadow:0 0 0 3px #F2A93B33}
@media (prefers-reduced-motion: reduce){.siri-btn.listening::after{animation:none}}`;
    document.head.appendChild(style);

    const dock=document.createElement('div');
    dock.id='siriDock'; dock.className='siri-dock';

    const bub=document.createElement('div');
    bub.id='siriBubble'; bub.className='siri-bubble'; bub.setAttribute('role','status');
    dock.appendChild(bub);



    const row=document.createElement('div');
    row.className='siri-row';


    const b=document.createElement('button');
    b.id='siriBtn'; b.className='siri-btn'; b.type='button';
    b.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`;
    b.onclick=()=>{
      // If she is on but has not actually managed to speak yet, a tap almost
      // certainly means "let me hear you" — not "switch yourself off". Turning
      // her off here would be a trap the guest could not easily undo.
      if(this.enabled && !this.greeted){
        this._showUnlock(false);
        this._tryGreet();          // capture-phase listener may already have started one
        this._startRecog();
        return;
      }
      // Switched on but not listening yet — some browsers hold the microphone
      // back until the page is tapped. A tap here means "start hearing me".
      if(this.enabled && !this.listening && !this.micDenied){
        this._startRecog(); this._paint();
        return;
      }
      this.toggle();
    };
    row.appendChild(b);
    dock.appendChild(row);
    document.body.appendChild(dock);

    this._paint();
    if(!this.supported()){
      b.title='Voice is not supported in this browser';
    }
    // No speech recognition at all (Firefox, older Safari) → typing is the way in.
    if(!SR){ this.micDenied=true; }
    // one-line diagnostic — makes "why is she silent?" (and "why does she sound
    // different on my phone?") answerable straight from devtools
    try{
      this._voicesReady().then(()=>{
        this._pickVoice();
        const t=this._tone();
        console.log('[Siri] ready · speech:'+(!!synth)+' mic:'+(!!SR)
          +' qa:'+this.enabled+' nav:'+this.navVoice+' secure:'+window.isSecureContext
          +' voice:'+(this.voice?this.voice.name+' ('+this.voice.lang+')':'browser default')
          +' rate:'+t.rate+' pitch:'+t.pitch);
      });
    }catch(e){}
  },
  _paint(){
    if(this._switchPaint) try{ this._switchPaint(); }catch(e){}
    const b=document.getElementById('siriBtn'); if(!b) return;
    b.classList.toggle('on',this.enabled);
    b.classList.toggle('listening',this.enabled&&this.listening);
    b.setAttribute('aria-pressed',this.enabled?'true':'false');
    b.setAttribute('aria-label',this.enabled?'Turn voice assistant off':'Turn voice assistant on');
    b.title = this.enabled
      ? (this.audioBlocked?'Tap to let Siri speak'
        : this.micDenied?'Siri is on (microphone blocked)':'Siri is listening — tap to turn off')
      : 'Tap to turn on the voice assistant';
  },
  _setBubble(text,heard){
    const el=document.getElementById('siriBubble'); if(!el) return;
    clearTimeout(this._bubT);
    if(!text){ el.classList.remove('show'); return; }
    el.textContent=text; el.classList.toggle('heard',!!heard); el.classList.add('show');
    this._bubT=setTimeout(()=>el.classList.remove('show'), Math.min(9000, 2600+text.length*45));
  }
};

/* Read the switches immediately, so a page that never calls configure()
   (the sign-in screen) still knows whether it may speak. */
Siri._readFlags();
if(synth) try{ synth.addEventListener('voiceschanged',()=>Siri._pickVoice()); }catch(e){}
Siri._pickVoice();

window.Siri = Siri;
})();
