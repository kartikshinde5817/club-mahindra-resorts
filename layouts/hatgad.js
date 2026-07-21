/* ═══════════════════════════════════════════════════════════════
   LAYOUT FILE · Club Mahindra Hatgad (Saputara)
   APPROXIMATE layout — built from Google data, not the official
   plan. What is REAL here: the resort's true location (Mappls /
   Google coordinates: 20.538641, 73.754961, Saputara–Nashik Rd,
   Village Hatgad, Nashik dist.), its 75 hillside rooms (studio,
   1-BR & 2-BR apartments) and every facility listed — The Palm
   Restaurant, swimming pool, Svaastha Spa, gym, Happy Hub indoor
   games, kids' play area, amphitheatre, garden lawn, souvenir
   shop and a valley view point — all verified from the official
   Club Mahindra pages and Google reviews. What is APPROXIMATE:
   the exact shape of internal paths and building positions.
   Replace with a traced version when the official plan arrives.
   ═══════════════════════════════════════════════════════════════ */
const RESORT_META = {
  kicker: 'Club Mahindra Resorts · Saputara',
  name:   'Hatgad resort',
  has3d:  false
};

const CONFIG = {
  metersPerUnit: 0.372,          // calibrated: boundary ≈ 10 acres (estimated)
  walkMetersPerMinute: 60,       // hill property — slightly slower
  gps: {
    enabled: false,              // needs a 2nd on-site coordinate — see note
    refs: [
      // Real Mappls/Google coordinate of the resort (main gate / porch):
      { id:'reception', lat: 20.538641, lng: 73.754961 },
      // On site: right-click the POOL on Google Maps, paste here, set enabled:true
      { id:'pool',      lat: 0.000000,  lng: 0.000000 }
    ]
  }
};

const NODES = {
  // entry drive: main gate (SE) → reception → main building
  GATE:[978,700], D1:[936,672], D2:[896,646], D3:[858,614], RCJ:[816,572], MB:[776,530],
  // north arc: main building → upper ridge → west junction
  N1:[744,482], N2:[720,430], N3:[686,382], N4:[626,352], N5:[556,340], N6:[490,346], N7:[434,372], WJ:[398,432],
  // south arc: main building → lower ring → west junction
  S1:[752,568], S2:[718,608], S3:[658,630], S4:[586,636], S5:[516,620], S6:[452,562], S7:[414,502],
  // spurs & sub-junctions
  POOLJ:[796,452],
  SPAJ:[706,344],
  V1:[506,312], VJ:[470,286],
  LWJ:[900,568],
  AMJ:[652,676],
  HBJ:[494,588]
};
const CHAINS = [
  ['drive',     ['GATE','D1','D2','D3','RCJ','MB']],
  ['north',     ['MB','N1','N2','N3','N4','N5','N6','N7','WJ']],
  ['south',     ['MB','S1','S2','S3','S4','S5','S6','S7','WJ']],
  ['poolPath',  ['N1','POOLJ']],
  ['spaPath',   ['N3','SPAJ']],
  ['viewPath',  ['N5','V1','VJ']],
  ['lawnPath',  ['D3','LWJ']],
  ['amphiPath', ['S3','AMJ']],
  ['hubPath',   ['S5','HBJ']]
];
const CLOSED = [];

const POIS = [
  /* Rooms — 75 apartments across the hillside blocks */
  {id:'studioA', name:'Studio Apartments · A', cat:'room', x:766,y:404, spur:'N2', bld:[766,404,42,15,16],  lx:2,  ly:-14, anch:'middle'},
  {id:'oneB',    name:'1-Bedroom · Block B',   cat:'room', x:598,y:300, spur:'N4', bld:[598,300,44,14,-8],  lx:0,  ly:-14, anch:'middle'},
  {id:'twoC',    name:'2-Bedroom · Block C',   cat:'room', x:452,y:304, spur:'N6', bld:[452,304,42,14,-14], lx:-10,ly:-8,  anch:'end'},
  {id:'studioF', name:'Studio Apartments · F', cat:'room', x:372,y:360, spur:'N7', bld:[372,360,40,14,64],  lx:-12,ly:2,   anch:'end'},
  {id:'oneE',    name:'1-Bedroom · Block E',   cat:'room', x:762,y:642, spur:'S2', bld:[762,642,42,14,-16], lx:8,  ly:16},
  {id:'twoD',    name:'2-Bedroom · Block D',   cat:'room', x:586,y:684, spur:'S4', bld:[586,684,46,14,6],   lx:2,  ly:18,  anch:'middle'},
  /* Dining */
  {id:'palm',    name:'The Palm Restaurant',   cat:'dine', x:812,y:504, spur:'MB',  bld:[812,504,36,15,-26], lx:10, ly:-6},
  /* Activities & wellness */
  {id:'pool',    name:'Swimming Pool',         cat:'act', x:830,y:438, spur:'POOLJ', lx:6,  ly:-14, anch:'middle'},
  {id:'spa',     name:'Svaastha Spa',          cat:'act', x:684,y:316, spur:'SPAJ', bld:[684,316,26,13,-10], lx:0,  ly:-14, anch:'middle'},
  {id:'gym',     name:'Gym',                   cat:'act', x:730,y:308, spur:'SPAJ', bld:[730,308,18,12,10],  lx:10, ly:2},
  {id:'hub',     name:'Happy Hub · Indoor Games', cat:'act', x:470,y:604, spur:'HBJ', bld:[470,604,26,14,-10], lx:-8, ly:16, anch:'end'},
  {id:'kids',    name:"Kids' Play Area",       cat:'act', x:534,y:602, spur:'HBJ',  lx:2,  ly:18, anch:'middle'},
  {id:'amphi',   name:'Amphitheatre',          cat:'act', x:652,y:676, gnode:'AMJ', lx:4,  ly:18, anch:'middle'},
  {id:'lawn',    name:'Garden Lawn',           cat:'act', x:900,y:568, gnode:'LWJ', lx:8,  ly:16, anch:'middle'},
  {id:'view',    name:'Valley View Point',     cat:'act', x:436,y:266, spur:'VJ',   lx:-8, ly:-8, anch:'end'},
  /* Facilities */
  {id:'reception', name:'Reception',           cat:'fac', x:800,y:552, spur:'RCJ', bld:[800,552,48,17,-26], lx:-6, ly:16, anch:'end'},
  {id:'shop',    name:'Souvenir Shop',         cat:'fac', x:744,y:556, spur:'MB',  bld:[744,556,16,11,-24], lx:-8, ly:14, anch:'end'},
  {id:'parking', name:'Parking',               cat:'fac', x:932,y:678, spur:'D2',  lx:8,  ly:16, anch:'middle'},
  {id:'gate',    name:'Main Gate',             cat:'fac', x:978,y:700, gnode:'GATE', lx:6, ly:18, anch:'middle'}
];

const GROUPS = [
  ['Rooms', ['studioA','oneB','twoC','studioF','oneE','twoD']],
  ['Dining', ['palm']],
  ['Activities & wellness', ['pool','spa','gym','hub','kids','amphi','lawn','view']],
  ['Facilities', ['reception','shop','parking','gate']]
];

const LANDMARK = {
  RCJ:'Reception', MB:'the main building', N1:'the Swimming Pool', POOLJ:'the Swimming Pool',
  N2:'Studio Apartments A', N4:'1-Bedroom Block B', N6:'2-Bedroom Block C',
  SPAJ:'Svaastha Spa', S2:'1-Bedroom Block E', S4:'2-Bedroom Block D',
  S5:'Happy Hub', HBJ:'Happy Hub', AMJ:'the Amphitheatre', LWJ:'the Garden Lawn',
  WJ:'the hillside trail', N7:'the hillside trail', S6:'the hillside trail',
  V1:'the valley trail', VJ:'Valley View Point', D2:'Parking', D3:'the Garden Lawn'
};

const BOUNDARY = [
  [318,362],[352,302],[410,258],[482,232],[560,222],[636,226],[706,242],
  [770,268],[828,300],[878,340],[922,384],[962,432],[996,486],[1018,542],
  [1022,600],[1014,652],[996,702],[960,734],[912,750],[856,750],[796,744],
  [730,742],[664,742],[600,742],[540,726],[486,704],[440,676],[400,640],
  [368,596],[342,544],[324,488],[314,430],[314,392]
];
const PUBLIC_ROAD = [[1046,510],[1060,580],[1062,652],[1048,722],[1018,788]];

const DECOR = {
  roadLabel:'Saputara–Nashik Rd · to Saputara', roadLabelPos:[1150,520],
  lawns:[{x:906,y:560,rx:42,ry:28,rot:-6, label:'Lawn'}],
  trees:260,
  treeAvoid:[
    [742,386,50,36],[574,286,50,34],[430,288,46,34],[350,338,46,46],
    [738,624,50,36],[560,668,54,34],
    [742,486,124,86],[798,412,72,54],[652,294,92,40],
    [448,584,110,42],[620,652,70,48],[872,530,74,58],[906,660,58,38]
  ],
  poolDeck:[[806,414],[834,406],[858,414],[870,436],[860,458],[836,470],[810,464],[798,440]],
  pools:[[830,436,20,11,10],[850,450,8,5,-6,true]],
  terraces:{x:628,y:662},
  parking:{x:910,y:666,w:44,h:22,rot:-12,cx:932,cy:678},
  kidsSpot:{x:534,y:602},
  mobileFit:[360,240,1050,760],
  desktopFit:[280,200,1140,790]
};
