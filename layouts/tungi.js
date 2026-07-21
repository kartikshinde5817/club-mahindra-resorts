/* ═══════════════════════════════════════════════════════════
   LAYOUT FILE · Club Mahindra Tungi, Lonavala
   Traced from the resort's official layout plan.
   One file like this per resort → the shared map engine
   (map.html) draws everything else automatically.
   ═══════════════════════════════════════════════════════════ */
const RESORT_META = {
  kicker: 'Club Mahindra Resorts · Tungi, Lonavala',
  name:   'Tungi resort',
  has3d:  true
};
/* ═══════════ CONFIG ═══════════ */
const CONFIG = {
  metersPerUnit: 0.746,          // calibrated so the traced site = 42 acres
  walkMetersPerMinute: 65,
  gps: {
    enabled: true,                // ← real coordinates below, from Google Maps
    refs: [
      { id:'reception', lat: 18.6620144, lng: 73.4728187 },  // Tunga Reception (Google Maps)
      { id:'pool',      lat: 18.6636114, lng: 73.4720185 }   // Swimming Pool (Google Maps)
    ]
  }
};

/* ═══════════ MAP DATA — traced from the resort layout plan ═══════════ */
const NODES = {
  WCL:[303,148], W1:[292,182], W2:[287,218], W3:[287,254], W4:[281,290],
  SEL:[236,332], W5:[247,354], W6:[257,382], W7:[266,406],
  S1:[283,416], S2:[311,409], S3:[339,418], S4:[367,407], S5:[395,417],
  S6:[423,406], S7:[451,416], S8:[479,408], S9:[507,415], S10:[535,408],
  SERP:[562,401], SR:[586,396],
  NWJ:[348,102], NB1:[377,112], B7j:[407,121], NB2:[438,130], B6j:[467,137], TRK:[497,158],
  NE1:[511,141], B5j:[525,119], NE2:[548,113], B3j:[571,108],
  T1:[499,187], B1j:[505,214], T2:[523,246], BR:[549,274], T3:[577,296], CHK:[603,313],
  E1:[631,323], E2:[659,330], E3:[687,333], E4:[715,334],
  SW1:[600,336], SW2:[597,359], SW4:[603,416], SW5:[623,429], SW6:[644,440],
  CV1:[667,456], CV2:[688,484], CV3:[703,512], CRTW:[720,540],
  H0:[742,338], H1j:[769,341], HA:[799,354], H2j:[827,372],
  P1:[855,392], P2:[882,408], P3:[908,420], PLZ:[932,432],
  SPa:[957,447], SPj:[979,461],
  PS1:[940,471], PS2:[944,504], PS3:[945,532], RB:[946,558],
  PP1:[746,522], PP2:[744,494], POOLJ:[745,468],
  CR1:[749,551], CR2:[777,556], CR3:[805,559], LAWNW:[830,562], CR4:[861,561], CR5:[893,560], CR6:[921,559],
  LW1:[832,600], LW2:[838,638], LOOPB:[852,672],
  LE1:[941,582], LE2:[930,626], LE3:[911,652], LE4:[886,668],
  RC1:[918,678], RECj:[950,690],
  GT1:[836,694], GATE:[815,720],
  F1:[817,682], F2:[787,692], F3:[755,700], FIREJ:[731,706],
  RE1:[966,565], RE2:[977,588], AMj:[982,612], RE3:[975,641], RE4:[963,667]
};
// Each chain draws as one smooth trail; consecutive node pairs become graph edges.
const CHAINS = [
  ['westRoad', ['WCL','W1','W2','W3','W4','SEL','W5','W6','W7','S1']],
  ['serpent',  ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','SERP','SR']],
  ['bSpine',   ['NWJ','NB1','B7j','NB2','B6j','TRK']],
  ['neBranch', ['TRK','NE1','B5j','NE2','B3j']],
  ['trunk',    ['TRK','T1','B1j','T2','BR','T3','CHK']],
  ['solarTop', ['CHK','E1','E2','E3','E4','H0','H1j','HA','H2j','P1','P2','P3','PLZ']],
  ['solarWest',['CHK','SW1','SW2','SR','SW4','SW5','SW6','CV1','CV2','CV3','CRTW']],
  ['spaRd',    ['PLZ','SPa','SPj']],
  ['plazaS',   ['PLZ','PS1','PS2','PS3','RB']],
  ['poolPath', ['CR1','PP1','PP2','POOLJ']],
  ['courts',   ['CRTW','CR1','CR2','CR3','LAWNW','CR4','CR5','CR6','RB']],
  ['lawnW',    ['LAWNW','LW1','LW2','LOOPB']],
  ['lawnE',    ['RB','LE1','LE2','LE3','LE4','LOOPB']],
  ['recLink',  ['LE4','RC1','RECj']],
  ['amaraRd',  ['RB','RE1','RE2','AMj','RE3','RE4','RECj']],
  ['gateRd',   ['LOOPB','GT1','GATE']],
  ['fireRd',   ['LOOPB','F1','F2','F3','FIREJ']]
];
// The plan marks the top of the west road as CLOSED — drawn hazy, never routed.
const CLOSED = [[348,102],[331,116],[316,131],[303,148]];

/* Places. bld:[cx,cy,w,h,rot] draws a roofed building. spur = road node it connects from. */
const POIS = [
  {id:'a1', name:'Block A1', cat:'room', x:256,y:284, spur:'W4', bld:[256,284,14,58,6],  lx:-12,ly:0,  anch:'end'},
  {id:'a2', name:'Block A2', cat:'room', x:231,y:360, spur:'W5', bld:[231,360,32,13,78], lx:-12,ly:14, anch:'end'},
  {id:'a3', name:'Block A3', cat:'room', x:285,y:369, spur:'W5', bld:[285,369,36,13,72], lx:14, ly:-6},
  {id:'a4', name:'Block A4', cat:'room', x:254,y:431, spur:'W7', bld:[254,431,36,12,34], lx:-12,ly:16, anch:'end'},
  {id:'a5', name:'Block A5', cat:'room', x:336,y:437, spur:'S3', bld:[336,437,58,15,19], lx:2,  ly:22, anch:'middle'},
  {id:'b1', name:'Block B1', cat:'room', x:538,y:226, spur:'B1j',bld:[538,226,42,12,74], lx:16, ly:2},
  {id:'b2', name:'Block B2', cat:'room', x:552,y:147, spur:'B5j',bld:[552,147,44,12,-78],lx:15, ly:8},
  {id:'b3', name:'Block B3', cat:'room', x:580,y:103, spur:'B3j',bld:[580,103,32,13,-64],lx:14, ly:-6},
  {id:'b5', name:'Block B5', cat:'room', x:524,y:104, spur:'B5j',bld:[524,104,42,10,-25],lx:-4, ly:-14,anch:'middle'},
  {id:'b6', name:'Block B6', cat:'room', x:471,y:121, spur:'B6j',bld:[471,121,42,14,0],  lx:-2, ly:-14,anch:'middle'},
  {id:'b7', name:'Block B7', cat:'room', x:416,y:108, spur:'B7j',bld:[416,108,34,13,52], lx:-13,ly:-8, anch:'end'},
  {id:'h1', name:'Block H1', cat:'room', x:763,y:317, spur:'H1j',bld:[763,317,41,17,60], lx:2,  ly:-16,anch:'middle'},
  {id:'h2', name:'Block H2', cat:'room', x:830,y:357, spur:'H2j',bld:[830,357,66,16,13], lx:6,  ly:-16,anch:'middle'},
  {id:'amara',  name:'AMARA Restaurant', cat:'dine', x:1030,y:622, spur:'AMj', bld:[1030,622,44,17,80], lx:16,ly:2},
  {id:'banquet',name:'Banquet Hall',     cat:'dine', x:1013,y:654, spur:'AMj', bld:[1013,654,36,13,72], lx:12,ly:14},
  {id:'ripples',name:'Ripples',          cat:'dine', x:1003,y:588, spur:'RE2', bld:[1003,588,36,13,-84],lx:15,ly:-4},
  {id:'pool',  name:'Swimming Pool',   cat:'act', x:812,y:462, spur:'POOLJ', lx:-4, ly:-15, anch:'middle'},
  {id:'spa',   name:'Spa',             cat:'act', x:1022,y:486, spur:'SPj', bld:[1022,486,50,38,-31], lx:20,ly:-14},
  {id:'hub',   name:'Happy Hub',       cat:'act', x:914,y:497, spur:'PS2', bld:[914,497,26,16,-20], lx:-6,ly:-16, anch:'middle'},
  {id:'kids',  name:"Kids' Play Area", cat:'act', x:741,y:531, spur:'CR1', lx:-8, ly:-12, anch:'end'},
  {id:'court', name:'Badminton & Basketball', cat:'act', x:801,y:541, spur:'CR3', lx:6, ly:-14, anch:'middle'},
  {id:'playground', name:'Playground', cat:'act', x:570,y:430, spur:'SERP', lx:-4, ly:16, anch:'middle'},
  {id:'rose',  name:'Rose Garden',     cat:'act', x:563,y:346, spur:'SW2', lx:-12, ly:2, anch:'end'},
  {id:'selfie',name:'Selfie Point',    cat:'act', x:236,y:332, gnode:'SEL', lx:-12, ly:4, anch:'end'},
  {id:'reception', name:'Reception (Tunga)', cat:'fac', x:952,y:712, spur:'RECj', bld:[952,712,32,11,-11], lx:6,ly:18, anch:'middle'},
  {id:'parking', name:'Parking', cat:'fac', x:754,y:589, spur:'CR1', lx:0, ly:17, anch:'middle'},
  {id:'gate',  name:'Main Gate',   cat:'fac', x:815,y:720, gnode:'GATE', lx:4, ly:19, anch:'middle'},
  {id:'fire',  name:'Fire Office', cat:'fac', x:722,y:700, spur:'FIREJ', bld:[722,700,14,10,0], lx:-4,ly:-12, anch:'end'},
  {id:'solar', name:'Solar Park',  cat:'fac', x:692,y:377, spur:'E3', lx:2, ly:14, anch:'middle'},
  {id:'chowk', name:'Prakash Chowk', cat:'fac', x:603,y:313, gnode:'CHK', lx:-13, ly:-6, anch:'end'},
  {id:'bridge',name:'Bridge',        cat:'fac', x:549,y:274, gnode:'BR', lx:-12, ly:0, anch:'end'}
];
const GROUPS = [
  ['Room blocks', ['a1','a2','a3','a4','a5','b1','b2','b3','b5','b6','b7','h1','h2']],
  ['Dining', ['amara','ripples','banquet']],
  ['Activities & wellness', ['pool','spa','hub','kids','court','playground','rose','selfie']],
  ['Facilities', ['reception','parking','gate','fire','solar','chowk','bridge']]
];
const LANDMARK = {
  B7j:'Block B7', B6j:'Block B6', B5j:'Block B5', B3j:'Block B3', B1j:'Block B1',
  TRK:'the B-cluster junction', BR:'the Bridge', CHK:'Prakash Chowk',
  E3:'Solar Park', H1j:'Block H1', H2j:'Block H2', PLZ:'Swimming Pool',
  SPj:'the Spa', PS2:'Happy Hub', RB:'the roundabout', LAWNW:'the lawn',
  LOOPB:'the lawn', GATE:'Main Gate', FIREJ:'Fire Office', CRTW:"Kids' Play Area",
  CR3:'the courts', AMj:'AMARA', RECj:'Reception', SEL:'Selfie Point',
  SR:'the terrace garden', SERP:'the terrace garden', S3:'Block A5',
  W5:'Block A3', W4:'Block A1', W7:'Block A4', POOLJ:'Swimming Pool', CR1:'Parking'
};
const BOUNDARY = [
  [330,85],[360,79],[400,80],[445,83],[490,85],[535,87],[575,90],[605,94],
  [628,112],[650,140],[672,172],[695,205],[718,238],[742,268],[768,292],[795,312],
  [822,330],[848,344],[872,356],[898,372],[925,390],[952,410],[980,432],[1008,452],[1035,470],
  [1062,492],[1080,520],[1088,552],[1086,585],[1076,616],[1060,645],[1040,672],[1016,696],
  [990,716],[965,730],[938,738],[908,738],[878,734],[848,730],[815,726],[786,724],[756,718],[728,712],[706,704],
  [688,688],[672,668],[658,644],[646,618],[636,590],[628,562],[620,534],[612,506],[604,478],[596,460],
  [566,462],[530,466],[492,468],[452,466],[412,462],[372,458],[334,452],[298,448],[262,444],[238,438],
  [226,420],[219,396],[216,370],[219,344],[226,318],[236,292],[248,266],[260,240],[272,214],[283,188],[293,162],[303,136],[314,112]
];
const PUBLIC_ROAD = [[698,745],[758,733],[812,726],[872,730],[940,737],[1012,745],[1078,753]];


/* map decorations for the Tungi scene */
const DECOR = {
  roadLabel:'Tung Rd · to Pawna Lake', roadLabelPos:[1055,772],
  lawns:[{x:884,y:616,rx:41,ry:50,rot:-8,label:'Lawn'}],
  trees:170,
  treeAvoid:[[646,348,96,74],[776,392,150,130],[770,528,70,34],[736,574,36,30],[843,566,84,104],[940,690,60,40]],
  solar:{x:646,y:348,w:96,h:74,rows:5,cols:7},
  terraces:{x:592,y:402},
  poolDeck:[[793,405],[828,396],[862,398],[893,412],[910,436],[912,466],[898,494],[868,510],[834,512],[806,500],[790,476],[786,440]],
  pools:[[856,432,26,13,16],[837,472,17,10,-8],[879,466,12,8,0,true]],
  courts:[{x:777,y:530,w:24,h:15,c:'#3E5F9E',s:'#7FA3E0',line:789},{x:804,y:530,w:22,h:15,c:'#7A4A3C',s:'#C88A6E'}],
  parking:{x:730,y:578,w:48,h:22,rot:8,cx:754,cy:589},
  kidsSpot:{x:741,y:531},
  roseGarden:{x:563,y:346},
  closedLabel:{x:296,y:112,text:'Road closed'},
  mobileFit:[660,300,1120,790]
};
