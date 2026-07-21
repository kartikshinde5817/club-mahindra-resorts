/* ═══════════════════════════════════════════════════════════════
   LAYOUT FILE · Club Mahindra Sherwood, Mahabaleshwar
   APPROXIMATE layout — built from Google data, not the official
   plan. What is REAL here: the resort's true location (Google
   coordinates), its size (8 acres, from the resort's own
   description) and every facility listed (Unwind Restaurant,
   Svaastha Spa, pool, Happy Hub, gym, kids' area, banquet,
   souvenir shop, bungalows — all verified from Google reviews
   and the official Club Mahindra pages). What is APPROXIMATE:
   the exact shape of internal paths and building positions.
   Replace with a traced version when the official plan arrives.
   ═══════════════════════════════════════════════════════════════ */
const RESORT_META = {
  kicker: 'Club Mahindra Resorts · Mahabaleshwar',
  name:   'Sherwood resort',
  has3d:  false
};

const CONFIG = {
  metersPerUnit: 0.406,          // calibrated: boundary = 8 acres
  walkMetersPerMinute: 60,       // hill property — slightly slower
  gps: {
    enabled: false,              // needs a 2nd on-site coordinate — see note
    refs: [
      // Real Google Maps coordinate of the resort (main entrance/porch):
      { id:'reception', lat: 17.9120059, lng: 73.6740673 },
      // On site: right-click the POOL on Google Maps, paste here, set enabled:true
      { id:'pool',      lat: 0.000000,  lng: 0.000000 }
    ]
  }
};

const NODES = {
  GATE:[1008,470], D1:[958,462], D2:[908,455], RCJ:[858,450], MB:[812,440],
  N1:[780,392], N2:[750,350], N3:[698,308], N4:[622,296], N5:[545,312], N6:[478,340], BGN:[448,368],
  S1:[770,480], S2:[722,500], S3:[664,522], S4:[590,528], S5:[522,502], S6:[480,466], BGS:[456,436],
  BG1:[432,392],
  SP1:[736,452], SPJ:[700,432],
  V1:[470,292], VJ:[404,286],
  L1:[888,502], LWJ:[864,540]
};
const CHAINS = [
  ['drive',    ['GATE','D1','D2','RCJ','MB']],
  ['north',    ['MB','N1','N2','N3','N4','N5','N6','BGN']],
  ['south',    ['MB','S1','S2','S3','S4','S5','S6','BGS']],
  ['bung',     ['BGN','BG1','BGS']],
  ['spaPath',  ['S1','SP1','SPJ']],
  ['viewPath', ['N5','V1','VJ']],
  ['lawnPath', ['D2','L1','LWJ']]
];
const CLOSED = [];

const POIS = [
  /* Rooms */
  {id:'wing1',  name:'Rooms · Wing 1',        cat:'room', x:884,y:410, spur:'RCJ', bld:[884,410,34,13,24],  lx:10, ly:18},
  {id:'wing2',  name:'Rooms · Wing 2',        cat:'room', x:928,y:424, spur:'D2',  bld:[928,424,30,12,-18], lx:10, ly:-6},
  {id:'duplex', name:'Duplex & Suites',       cat:'room', x:640,y:338, spur:'N4',  bld:[640,338,30,13,-22], lx:-12, ly:-8, anch:'end'},
  {id:'bung1',  name:'Bungalow 1',            cat:'room', x:420,y:330, spur:'BGN', bld:[420,330,16,11,20],  lx:-10,ly:-8, anch:'end'},
  {id:'bung2',  name:'Bungalow 2',            cat:'room', x:392,y:398, spur:'BG1', bld:[392,398,16,11,-12], lx:-10,ly:4,  anch:'end'},
  {id:'bung3',  name:'Bungalow 3',            cat:'room', x:446,y:462, spur:'BGS', bld:[446,462,16,11,8],   lx:-8, ly:16, anch:'end'},
  /* Dining */
  {id:'unwind', name:'Unwind Restaurant & Bar', cat:'dine', x:796,y:378, spur:'N1', bld:[796,378,34,14,14], lx:2, ly:-14},
  {id:'banquet',name:'Banquet Hall',          cat:'dine', x:856,y:392, spur:'RCJ', bld:[856,392,28,13,-8], lx:2, ly:-14, anch:'middle'},
  /* Activities & wellness */
  {id:'pool',   name:'Swimming Pool',         cat:'act', x:742,y:330, spur:'N2',  lx:-4, ly:-14, anch:'end'},
  {id:'spa',    name:'Svaastha Spa',          cat:'act', x:678,y:416, spur:'SPJ', bld:[678,416,24,12,14],  lx:-12,ly:-8, anch:'end'},
  {id:'gym',    name:'Gym',                   cat:'act', x:706,y:470, spur:'SPJ', bld:[706,470,17,11,-6],  lx:-10,ly:14, anch:'end'},
  {id:'hub',    name:'Happy Hub · Indoor Games', cat:'act', x:716,y:518, spur:'S2', bld:[716,518,26,13,-8], lx:2, ly:20, anch:'middle'},
  {id:'kids',   name:"Kids' Play Area",       cat:'act', x:640,y:544, spur:'S3',  lx:-2, ly:18, anch:'middle'},
  {id:'lawn',   name:'Garden Lawn',           cat:'act', x:864,y:540, gnode:'LWJ', lx:6, ly:18, anch:'middle'},
  {id:'view',   name:'Valley View Point',     cat:'act', x:366,y:282, spur:'VJ',  lx:-8, ly:-8, anch:'end'},
  /* Facilities */
  {id:'reception', name:'Reception',          cat:'fac', x:836,y:414, spur:'RCJ', bld:[836,414,50,18,-6], lx:-4, ly:-16, anch:'end'},
  {id:'shop',   name:'Souvenir Shop',         cat:'fac', x:800,y:470, spur:'MB',  bld:[800,470,15,10,-6], lx:-8, ly:16, anch:'end'},
  {id:'parking',name:'Parking',               cat:'fac', x:930,y:498, spur:'D2',  lx:8,  ly:16, anch:'middle'},
  {id:'gate',   name:'Main Gate',             cat:'fac', x:1008,y:470, gnode:'GATE', lx:6, ly:19, anch:'middle'}
];

const GROUPS = [
  ['Rooms', ['wing1','wing2','duplex','bung1','bung2','bung3']],
  ['Dining', ['unwind','banquet']],
  ['Activities & wellness', ['pool','spa','gym','hub','kids','lawn','view']],
  ['Facilities', ['reception','shop','parking','gate']]
];

const LANDMARK = {
  RCJ:'Reception', MB:'the main building', N2:'Swimming Pool',
  N4:'Duplex & Suites', S2:'Happy Hub', S3:"Kids' Play Area",
  SPJ:'Svaastha Spa', BGN:'the Bungalows', BGS:'the Bungalows',
  D2:'Parking', VJ:'Valley View Point', LWJ:'the Garden Lawn',
  N5:'the forest trail', S5:'the forest trail'
};

const BOUNDARY = [
  [360,270],[430,240],[510,225],[590,222],[670,232],[745,250],[810,272],
  [870,300],[925,335],[970,375],[1005,420],[1022,468],[1015,515],[985,555],
  [940,585],[885,605],[825,615],[760,612],[695,600],[630,585],[565,568],
  [505,545],[450,515],[405,478],[372,435],[350,390],[342,345],[346,305]
];
const PUBLIC_ROAD = [[1078,320],[1060,382],[1044,440],[1034,472],[1042,525],[1056,580],[1066,640]];

const DECOR = {
  roadLabel:'Blue Valley Ride · off Medha–Satara Rd', roadLabelPos:[1230,668],
  lawns:[{x:862,y:548,rx:42,ry:30,rot:-8}],
  trees:230,
  treeAvoid:[
    [702,296,88,74],[768,360,175,120],[818,516,95,66],[902,482,58,38],
    [656,398,70,86],[696,506,48,30],[606,322,70,36],
    [404,318,36,26],[374,384,36,26],[428,448,38,28]
  ],
  poolDeck:[[706,312],[736,298],[766,304],[786,322],[790,348],[774,366],[744,372],[716,362],[702,338]],
  pools:[[744,332,22,12,8],[726,352,10,6,-6,true]],
  parking:{x:906,y:486,w:46,h:22,rot:14,cx:930,cy:498},
  kidsSpot:{x:640,y:544},
  mobileFit:[560,240,1080,640],
  desktopFit:[315,200,1255,700]
};
