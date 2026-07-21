/* ═══════════════════════════════════════════════════════════════
   LAYOUT FILE · Club Mahindra Saj, Mahabaleshwar
   APPROXIMATE layout — built from Google data, not the official
   plan. What is REAL here: the resort's true location (Mappls /
   Google coordinates: 17.928879, 73.692546, Panchgani–
   Mahabaleshwar Rd, Metgutad — the hilltop "Saj on the Mountain"
   property), its 74 hilltop rooms (Studio, 1-Bed & 2-Bed suites)
   and every facility listed — a multi-cuisine restaurant, a
   speciality restaurant, a coffee shop, the rooftop swimming
   pool, Svaastha Spa, gym, Happy Hub indoor games, kids' play
   area, banquet & conference hall, garden lawn and a valley /
   sunset view point — all verified from the official Club
   Mahindra pages and Google reviews. What is APPROXIMATE: the
   exact shape of internal paths and building positions. Replace
   with a traced version when the official plan arrives.
   ═══════════════════════════════════════════════════════════════ */
const RESORT_META = {
  kicker: 'Club Mahindra Resorts · Mahabaleshwar',
  name:   'Saj resort',
  has3d:  false
};

const CONFIG = {
  metersPerUnit: 0.365,          // calibrated: boundary ≈ 9 acres (estimated)
  walkMetersPerMinute: 60,       // hill property — slightly slower
  gps: {
    enabled: false,              // needs a 2nd on-site coordinate — see note
    refs: [
      // Real Mappls/Google coordinate of the resort (main gate / porch):
      { id:'reception', lat: 17.928879, lng: 73.692546 },
      // On site: right-click the POOL on Google Maps, paste here, set enabled:true
      { id:'pool',      lat: 0.000000,  lng: 0.000000 }
    ]
  }
};

const NODES = {
  // entry drive from the SW (Panchgani–Mahabaleshwar road)
  GATE:[300,706], G1:[340,672], G2:[380,636], G3:[426,602], RCJ:[478,570], MB:[528,546],
  // upper (north) arc
  N1:[556,496], N2:[600,456], N3:[664,436], N4:[732,440], N5:[794,466], N6:[842,506], EJ:[876,556],
  // lower (south) arc  (back to EJ)
  S1:[540,600], S2:[576,644], S3:[640,668], S4:[712,670], S5:[778,646], S6:[838,606],
  // east ridge promenade → sunset view point
  RV1:[930,584], VJ:[978,606],
  // spurs & sub-junctions
  SPAJ:[560,452], POOLJ:[724,406],
  HUBJ:[588,624], BANJ:[664,706], LAWNJ:[812,590]
};
const CHAINS = [
  ['drive',    ['GATE','G1','G2','G3','RCJ','MB']],
  ['north',    ['MB','N1','N2','N3','N4','N5','N6','EJ']],
  ['south',    ['MB','S1','S2','S3','S4','S5','S6','EJ']],
  ['ridge',    ['EJ','RV1','VJ']],
  ['spaPath',  ['N1','SPAJ']],
  ['poolPath', ['N3','POOLJ']],
  ['hubPath',  ['S2','HUBJ']],
  ['banPath',  ['S3','BANJ']],
  ['lawnPath', ['S5','LAWNJ']]
];
const CLOSED = [];

const POIS = [
  /* Rooms — 74 suites across the hilltop blocks */
  {id:'studioA', name:'Studio Suites · A', cat:'room', x:600,y:414, spur:'N2', bld:[600,414,42,14,-4], lx:0, ly:-14, anch:'middle'},
  {id:'oneB',    name:'1-Bed Suites · B',  cat:'room', x:740,y:398, spur:'N4', bld:[740,398,44,14,6],  lx:0, ly:-14, anch:'middle'},
  {id:'twoC',    name:'2-Bed Suites · C',  cat:'room', x:886,y:476, spur:'N6', bld:[886,476,38,14,26], lx:8, ly:-2},
  {id:'studioD', name:'Studio Suites · D', cat:'room', x:512,y:636, spur:'S1', bld:[512,636,40,14,14], lx:-10,ly:2, anch:'end'},
  {id:'oneE',    name:'1-Bed Suites · E',  cat:'room', x:712,y:714, spur:'S4', bld:[712,714,44,14,-4], lx:0, ly:16, anch:'middle'},
  {id:'twoF',    name:'2-Bed Suites · F',  cat:'room', x:876,y:634, spur:'S6', bld:[876,634,38,14,-24],lx:0, ly:16, anch:'middle'},
  /* Dining */
  {id:'multi',   name:'Multi-Cuisine Restaurant', cat:'dine', x:488,y:514, spur:'MB',  bld:[488,514,36,15,-24], lx:-8,ly:-6, anch:'end'},
  {id:'coffee',  name:'Coffee Shop',        cat:'dine', x:430,y:548, spur:'RCJ', bld:[430,548,20,12,-22], lx:-8,ly:6, anch:'end'},
  {id:'special', name:'Speciality Restaurant', cat:'dine', x:848,y:566, spur:'EJ', bld:[848,566,32,14,-8], lx:8, ly:6},
  /* Activities & wellness */
  {id:'pool',    name:'Rooftop Swimming Pool', cat:'act', x:710,y:384, spur:'POOLJ', lx:-8, ly:-14, anch:'end'},
  {id:'spa',     name:'Svaastha Spa',       cat:'act', x:540,y:428, spur:'SPAJ', bld:[540,428,26,13,-8], lx:-12,ly:-2, anch:'end'},
  {id:'gym',     name:'Gym',                cat:'act', x:540,y:454, spur:'SPAJ', bld:[540,454,20,12,4],  lx:-12,ly:4, anch:'end'},
  {id:'hub',     name:'Happy Hub · Games',  cat:'act', x:572,y:650, spur:'HUBJ', bld:[572,650,26,14,-8], lx:-8,ly:14, anch:'end'},
  {id:'kids',    name:"Kids' Play Area",    cat:'act', x:620,y:648, spur:'HUBJ', lx:2, ly:18, anch:'middle'},
  {id:'lawn',    name:'Garden Lawn',        cat:'act', x:812,y:588, gnode:'LAWNJ', lx:6, ly:16, anch:'middle'},
  {id:'view',    name:'Sunset / Valley View Point', cat:'act', x:1006,y:624, spur:'VJ', lx:-8, ly:8, anch:'end'},
  /* Facilities */
  {id:'reception', name:'Reception',        cat:'fac', x:492,y:588, spur:'RCJ', bld:[492,588,46,17,-22], lx:0, ly:18, anch:'middle'},
  {id:'banquet', name:'Banquet & Conference Hall', cat:'fac', x:648,y:726, spur:'BANJ', bld:[648,726,44,16,2], lx:-8,ly:6, anch:'end'},
  {id:'parking', name:'Parking',            cat:'fac', x:356,y:614, spur:'G2', lx:-8, ly:14, anch:'end'},
  {id:'gate',    name:'Main Gate',          cat:'fac', x:300,y:706, gnode:'GATE', lx:6, ly:18, anch:'middle'}
];

const GROUPS = [
  ['Suites & rooms', ['studioA','oneB','twoC','studioD','oneE','twoF']],
  ['Dining', ['multi','coffee','special']],
  ['Activities & wellness', ['pool','spa','gym','hub','kids','lawn','view']],
  ['Facilities', ['reception','banquet','parking','gate']]
];

const LANDMARK = {
  RCJ:'Reception', MB:'the main building', N1:'Svaastha Spa', SPAJ:'Svaastha Spa',
  N3:'the Rooftop Pool', POOLJ:'the Rooftop Pool', N2:'Studio Suites A',
  N4:'1-Bed Suites B', N6:'2-Bed Suites C', S1:'Studio Suites D',
  S4:'1-Bed Suites E', S6:'2-Bed Suites F', S2:'Happy Hub', HUBJ:'Happy Hub',
  S3:'the Banquet Hall', BANJ:'the Banquet Hall', S5:'the Garden Lawn', LAWNJ:'the Garden Lawn',
  EJ:'the ridge', RV1:'the view promenade', VJ:'the Sunset View Point', G2:'Parking'
};

const BOUNDARY = [
  [300,500],[330,432],[380,378],[446,342],[520,326],[598,326],[672,336],
  [744,332],[816,344],[882,364],[938,396],[984,436],[1020,490],[1040,548],
  [1036,606],[1012,656],[974,698],[922,728],[860,744],[794,750],[724,752],
  [658,750],[596,744],[540,730],[484,730],[430,732],[376,730],[322,724],
  [286,704],[266,668],[262,620],[268,568],[282,524]
];
const PUBLIC_ROAD = [[300,770],[450,782],[610,786],[770,782],[912,772]];

const DECOR = {
  roadLabel:'Panchgani–Mahabaleshwar Rd', roadLabelPos:[906,802],
  lawns:[{x:812,y:586,rx:40,ry:26,rot:8, label:'Lawn'}],
  trees:250,
  treeAvoid:[
    [576,398,50,34],[716,382,50,34],[862,460,50,34],[488,620,50,34],
    [686,698,54,34],[860,618,50,34],
    [420,500,130,110],[688,362,80,46],[518,404,54,66],
    [548,634,110,40],[620,708,72,40],[780,562,72,52],
    [306,586,60,40],[984,606,44,40]
  ],
  poolDeck:[[688,362],[716,354],[740,362],[750,384],[740,406],[716,414],[692,408],[682,386]],
  pools:[[712,384,20,11,8],[730,396,8,5,-6,true]],
  parking:{x:330,y:600,w:44,h:22,rot:-16,cx:352,cy:612},
  kidsSpot:{x:620,y:648},
  mobileFit:[300,320,1040,780],
  desktopFit:[220,300,1070,820]
};
