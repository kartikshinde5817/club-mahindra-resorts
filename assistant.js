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
const LS_KEY = 'cmr_voice';

const Siri = {
  enabled:false, greeted:false, listening:false, speaking:false,
  recog:null, voice:null, lastSpoken:'', micDenied:false, errCount:0,
  cfg:{ welcome:'', onCommand:null, hint:'' },

  /* ── page setup ─────────────────────────────────────────── */
  configure(cfg){
    Object.assign(this.cfg, cfg||{});
    this.enabled = localStorage.getItem(LS_KEY)!=='0';   // on unless switched off
    this._buildUI();
    if(synth) synth.onvoiceschanged = ()=>this._pickVoice();
    if(this.enabled){
      this._tryGreet();
      // Some browsers ignore speak() issued while the page is still parsing,
      // so try again at the points where the engine is reliably awake.
      if(document.readyState!=='complete')
        window.addEventListener('load',()=>{ if(!this.greeted) this._tryGreet(true); },{once:true});
      setTimeout(()=>{ if(!this.greeted) this._tryGreet(true); },900);
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
        onStart:()=>{ this.greeted=true; this._greetInFlight=false; this._showUnlock(false); },
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

  /* Speak, then run `done` when the line finishes (or after maxWait, so a
     silent/blocked engine can never strand the caller). Used by the sign-in
     page: the click is a real user gesture, which is the one moment audio is
     guaranteed to be allowed — so the welcome is spoken there, before we
     navigate to the dashboard. */
  speakThen(text,done,maxWait){
    let fired=false;
    const go=()=>{ if(fired)return; fired=true; try{done&&done();}catch(e){} };
    if(!this.enabled||!synth||!text){ go(); return; }
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
    u.rate = 1.0; u.pitch = 1.05; u.volume = 1;
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

  _pickVoice(){
    if(!synth) return;
    const vs = synth.getVoices()||[];
    if(!vs.length) return;
    const female = /female|woman|samantha|zira|google uk english female|aria|neerja|heera|veena|salli|joanna/i;
    const score = v=>{
      let s=0;
      if(/^en[-_]IN/i.test(v.lang)) s+=6;         // Indian English preferred
      else if(/^en[-_]GB/i.test(v.lang)) s+=4;
      else if(/^en/i.test(v.lang)) s+=3;
      if(female.test(v.name)) s+=3;               // Siri reads as female
      if(/google/i.test(v.name)) s+=1;
      return s;
    };
    this.voice = vs.slice().sort((a,b)=>score(b)-score(a))[0] || null;
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

  _handle(said, alts){
    const fn = this.cfg.onCommand;
    if(!fn){ return; }
    let handled=false;
    try{ handled = fn(said, alts||[said]); }catch(e){ handled=false; }
    if(!handled) this.speak(this.cfg.hint || "Sorry, I did not catch that.");
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
      this.speak(this.greeted? 'Voice assistant is on. How can I help you?' : this.cfg.welcome, {force:true});
      this.greeted=true;
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
    // one-line diagnostic — makes "why is she silent?" answerable from devtools
    try{
      console.log('[Siri] ready · speech:'+(!!synth)+' mic:'+(!!SR)
        +' enabled:'+this.enabled+' secure:'+window.isSecureContext);
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

window.Siri = Siri;
})();
