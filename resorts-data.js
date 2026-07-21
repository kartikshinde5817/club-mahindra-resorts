/* ═══════════════════════════════════════════════════════════════
   CLUB MAHINDRA RESORTS — resort list (from clubmahindra.com)
   To add/rename a resort: edit this list only.
   q = what we ask Google Maps to show for the layout view.
   page = special page (only Tungi has a full walking map today).
   ═══════════════════════════════════════════════════════════════ */
const RESORTS = [
  /* ── Maharashtra ── */
  {id:'tungi',      name:'Club Mahindra Tungi, Lonavala',            state:'Maharashtra', q:'Club Mahindra Resort Tungi Lonavala', page:'tungi.html', featured:true},
  {id:'sherwood',   name:'Club Mahindra Sherwood, Mahabaleshwar',    state:'Maharashtra', q:'Club Mahindra Sherwood Resort Mahabaleshwar', mapped:true},
  {id:'saj',        name:'Club Mahindra Saj, Mahabaleshwar',         state:'Maharashtra', q:'Club Mahindra Saj Resort Mahabaleshwar', mapped:true},
  {id:'hatgad',     name:'Club Mahindra Hatgad (Saputara)',          state:'Maharashtra', q:'Club Mahindra Hatgad Resort', mapped:true},
  {id:'alibaug',    name:'Club Mahindra Alibaug',                    state:'Maharashtra', q:'Club Mahindra Alibaug Resort'},
  {id:'koyna',      name:'Forest Escape Koyna',                      state:'Maharashtra', q:'Forest Escape Resort Koyna'},
  {id:'ambaghat',   name:'Riverside County Resort, Amba Ghat',       state:'Maharashtra', q:'Riverside County Resort Amba Ghat'},
  {id:'imagicaa',   name:'Imagicaa Hotel, Khopoli',                  state:'Maharashtra', q:'Imagicaa Hotel Khopoli'},
  {id:'tropicana',  name:'Tropicana Villa, Alibaug',                 state:'Maharashtra', q:'Tropicana Villas Alibaug'},
  {id:'dulwich',    name:'Dulwich Estate',                           state:'Maharashtra', q:'Dulwich Estate Maharashtra'},

  /* ── Goa ── */
  {id:'acacia',     name:'Club Mahindra Acacia Palms, Colva',        state:'Goa', q:'Club Mahindra Acacia Palms Resort Goa'},
  {id:'emerald',    name:'Club Mahindra Emerald Palms',              state:'Goa', q:'Club Mahindra Emerald Palms Resort Goa'},
  {id:'varca',      name:'Club Mahindra Varca Beach',                state:'Goa', q:'Club Mahindra Varca Beach Resort Goa'},
  {id:'assonora',   name:'Club Mahindra Assonora',                   state:'Goa', q:'Club Mahindra Assonora Goa'},
  {id:'courtyard',  name:'Courtyard Villa',                          state:'Goa', q:'Courtyard Villa Goa Club Mahindra'},
  {id:'orchard',    name:'Orchard Villa',                            state:'Goa', q:'Orchard Villa Goa Club Mahindra'},
  {id:'rivervilla', name:'River Villa',                              state:'Goa', q:'River Villa Goa Club Mahindra'},
  {id:'arohamaj',   name:'Aroha Palms Majestic, Bardez',             state:'Goa', q:'Aroha Palms Majestic Bardez Goa'},
  {id:'arohagr',    name:'Aroha Palms Grande, Bardez',               state:'Goa', q:'Aroha Palms Grande Bardez Goa'},
  {id:'igreha',     name:'Igreha Villa C, Siolim',                   state:'Goa', q:'Igreha Villas Siolim Goa'},
  {id:'ishavilas',  name:'Ishavilas, Siolim',                        state:'Goa', q:'Ishavilas Siolim Goa'},
  {id:'monforte',   name:'Monforte Villa',                           state:'Goa', q:'Monforte Villa Goa'},
  {id:'moira',      name:'The Moira Villa',                          state:'Goa', q:'The Moira Villa Goa'},

  /* ── Kerala ── */
  {id:'munnar',     name:'Club Mahindra Munnar',                     state:'Kerala', q:'Club Mahindra Munnar Resort'},
  {id:'mtserene',   name:'Club Mahindra Mount Serene, Munnar',       state:'Kerala', q:'Club Mahindra Mount Serene Munnar'},
  {id:'thekkady',   name:'Club Mahindra Thekkady',                   state:'Kerala', q:'Club Mahindra Thekkady Resort'},
  {id:'ashtamudi',  name:'Club Mahindra Ashtamudi',                  state:'Kerala', q:'Club Mahindra Ashtamudi Resort'},
  {id:'poovar',     name:'Club Mahindra Poovar',                     state:'Kerala', q:'Club Mahindra Poovar Resort'},
  {id:'cherai',     name:'Club Mahindra Cherai, Kochi',              state:'Kerala', q:'Club Mahindra Cherai Beach Resort'},
  {id:'vythiri',    name:'Vythiri Village, Wayanad',                 state:'Kerala', q:'Vythiri Village Resort Wayanad'},
  {id:'arookutty',  name:'Club Mahindra Arookutty, Alleppey',        state:'Kerala', q:'Club Mahindra Arookutty Resort'},

  /* ── Karnataka ── */
  {id:'madikeri',   name:'Club Mahindra Madikeri, Coorg',            state:'Karnataka', q:'Club Mahindra Madikeri Resort Coorg'},
  {id:'virajpet',   name:'Club Mahindra Virajpet, Coorg',            state:'Karnataka', q:'Club Mahindra Virajpet Resort Coorg'},
  {id:'vijayshree', name:'Vijayshree Resort & Heritage Village, Hampi', state:'Karnataka', q:'Vijayshree Resort Heritage Village Hampi'},
  {id:'eagleton',   name:'Eagleton Golf Resort, Bengaluru',          state:'Karnataka', q:'Eagleton Golf Resort Bangalore'},
  {id:'goldenlm',   name:'Golden Landmark Resort, Mysuru',           state:'Karnataka', q:'Golden Landmark Resort Mysore'},

  /* ── Tamil Nadu ── */
  {id:'danish',     name:'Club Mahindra Danish Villa, Ooty',         state:'Tamil Nadu', q:'Club Mahindra Danish Villa Ooty'},
  {id:'derby',      name:'Club Mahindra Derby Green, Ooty',          state:'Tamil Nadu', q:'Club Mahindra Derby Green Ooty'},
  {id:'leposhe',    name:'Le Poshe, Kodaikanal',                     state:'Tamil Nadu', q:'Le Poshe by Sparsa Kodaikanal'},
  {id:'amani',      name:'Amani Villa, Coonoor',                     state:'Tamil Nadu', q:'Amani Villas Coonoor'},

  /* ── Puducherry ── */
  {id:'puducherry', name:'Club Mahindra Puducherry',                 state:'Puducherry', q:'Club Mahindra Puducherry Resort'},

  /* ── Andhra Pradesh ── */
  {id:'starlit',    name:'Starlit Suites, Tirupati',                 state:'Andhra Pradesh', q:'Starlit Suites Tirupati'},
  {id:'dindi',      name:'Dindi RVR, on the Godavari',               state:'Andhra Pradesh', q:'Dindi Resort RVR Godavari'},

  /* ── Andaman & Nicobar ── */
  {id:'havelock',   name:'Symphony Palms, Havelock Island',          state:'Andaman & Nicobar', q:'Symphony Palms Beach Resort Havelock'},
  {id:'neil',       name:'Symphony Summer Sands, Neil Island',       state:'Andaman & Nicobar', q:'Summer Sands Beach Resort Neil Island'},
  {id:'portblair',  name:'Symphony Samudra, Port Blair',             state:'Andaman & Nicobar', q:'Symphony Samudra Port Blair'},

  /* ── Lakshadweep ── */
  {id:'kavaratti',  name:'Kavaratti, Lakshadweep (new)',             state:'Lakshadweep', q:'Kavaratti Lakshadweep'},

  /* ── Gujarat ── */
  {id:'kensville',  name:'Club Mahindra Kensville Golf Resort, Ahmedabad', state:'Gujarat', q:'Kensville Golf Resort Ahmedabad'},
  {id:'gir',        name:'Club Mahindra Gir',                        state:'Gujarat', q:'Club Mahindra Gir Resort'},
  {id:'dwarka',     name:'Club Mahindra Dwarka',                     state:'Gujarat', q:'Club Mahindra Dwarka Resort'},
  {id:'netrang',    name:'Club Mahindra Netrang',                    state:'Gujarat', q:'Club Mahindra Netrang'},
  {id:'pavagadh',   name:'Club Mahindra Pavagadh',                   state:'Gujarat', q:'Club Mahindra Pavagadh Resort'},

  /* ── Rajasthan ── */
  {id:'udaipur',    name:'Club Mahindra Udaipur',                    state:'Rajasthan', q:'Club Mahindra Udaipur Resort'},
  {id:'jaisalmer',  name:'Club Mahindra Jaisalmer',                  state:'Rajasthan', q:'Club Mahindra Jaisalmer Resort'},
  {id:'kumbhal',    name:'Club Mahindra Kumbhalgarh',                state:'Rajasthan', q:'Club Mahindra Kumbhalgarh Resort'},
  {id:'jaipur',     name:'Club Mahindra Jaipur',                     state:'Rajasthan', q:'Club Mahindra Resort Jaipur'},
  {id:'aravali',    name:'Hotel Aravali, Mount Abu',                 state:'Rajasthan', q:'Hotel Aravali Mount Abu'},
  {id:'hummingbird',name:'Hummingbird Resorts',                      state:'Rajasthan', q:'Hummingbird Resort Rajasthan'},
  {id:'tigerkingdom',name:'Hotel Tiger Kingdom, Ranthambore',        state:'Rajasthan', q:'Hotel Tiger Kingdom Ranthambore'},
  {id:'naturersj',  name:'Club Mahindra Nature Resort',              state:'Rajasthan', q:'Club Mahindra Nature Resort Rajasthan'},
  {id:'pushkar',    name:'Club Mahindra Pushkar Fort',               state:'Rajasthan', q:'Pushkar Fort Resort Club Mahindra'},
  {id:'bharatpur',  name:'Club Mahindra Bharatpur',                  state:'Rajasthan', q:'Club Mahindra Bharatpur'},
  {id:'pratap',     name:'Pratap Niwas Palace, Jodhpur',             state:'Rajasthan', q:'Pratap Niwas Palace Jodhpur'},

  /* ── Madhya Pradesh ── */
  {id:'kanha',      name:'Club Mahindra Kanha',                      state:'Madhya Pradesh', q:'Club Mahindra Kanha Resort'},
  {id:'bundela',    name:'Bundela Resort, Khajuraho',                state:'Madhya Pradesh', q:'Bundela Resort Khajuraho'},
  {id:'bandhavgarh',name:'Club Mahindra Bandhavgarh (new)',          state:'Madhya Pradesh', q:'Club Mahindra Bandhavgarh'},

  /* ── Daman & Diu ── */
  {id:'jampore',    name:'Praveg Beach Resort, Jampore (Daman)',     state:'Daman & Diu', q:'Praveg Beach Resort Jampore Daman'},
  {id:'lighthouse', name:'Praveg Beach Resort, Lighthouse (Daman)',  state:'Daman & Diu', q:'Praveg Beach Resort Lighthouse Daman'},
  {id:'chakratirth',name:'Praveg Beach Resort, Chakratirth (Diu)',   state:'Daman & Diu', q:'Praveg Beach Resort Chakratirth Diu'},
  {id:'nagoa',      name:'Praveg Beach Resort, Nagoa (Diu)',         state:'Daman & Diu', q:'Praveg Beach Resort Nagoa Diu'},

  /* ── Himachal Pradesh ── */
  {id:'dharamshala',name:'Club Mahindra Dharamshala',                state:'Himachal Pradesh', q:'Club Mahindra Dharamshala Resort'},
  {id:'kandaghat',  name:'Club Mahindra Kandaghat, Shimla',          state:'Himachal Pradesh', q:'Club Mahindra Kandaghat Resort'},
  {id:'whitemeadows',name:'Club Mahindra White Meadows, Manali',     state:'Himachal Pradesh', q:'Club Mahindra White Meadows Manali'},
  {id:'snowpeaks',  name:'Club Mahindra Snow Peaks, Manali',         state:'Himachal Pradesh', q:'Club Mahindra Snow Peaks Manali'},
  {id:'naldehra',   name:'Club Mahindra Pristine Peaks, Naldehra',   state:'Himachal Pradesh', q:'Club Mahindra Pristine Peaks Naldehra'},
  {id:'janjehli',   name:'Club Mahindra Janjehli',                   state:'Himachal Pradesh', q:'Club Mahindra Janjehli'},

  /* ── Uttarakhand ── */
  {id:'mussoorie',  name:'Club Mahindra Mussoorie',                  state:'Uttarakhand', q:'Club Mahindra Mussoorie Resort'},
  {id:'binsarvalley',name:'Club Mahindra Binsar Valley, Almora',     state:'Uttarakhand', q:'Club Mahindra Binsar Valley Resort'},
  {id:'binsarvilla',name:'Club Mahindra Binsar Villa, Almora',       state:'Uttarakhand', q:'Club Mahindra Binsar Villa'},
  {id:'kanatal',    name:'Club Mahindra Kanatal',                    state:'Uttarakhand', q:'Club Mahindra Kanatal Resort'},
  {id:'patkote',    name:'Club Mahindra Patkote (Corbett)',          state:'Uttarakhand', q:'Club Mahindra Patkote'},

  /* ── Jammu & Kashmir ── */
  {id:'houseboats', name:'Kashmir Houseboats, Srinagar',             state:'Jammu & Kashmir', q:'Kashmir Houseboats Club Mahindra Srinagar'},
  {id:'zaznar',     name:'White House Zaznar',                       state:'Jammu & Kashmir', q:'White House Zaznar Kashmir'},

  /* ── Uttar Pradesh ── */
  {id:'saura',      name:'Saura Hotel, Agra',                        state:'Uttar Pradesh', q:'Saura Hotel Agra'},
  {id:'ayodhya',    name:'Praveg Tent City, Ayodhya (Brahma Kund)',  state:'Uttar Pradesh', q:'Praveg Tent City Ayodhya'},

  /* ── Punjab ── */
  {id:'ranjitvihar',name:'Fortune Ranjit Vihar, Amritsar',           state:'Punjab', q:'Fortune Ranjit Vihar Amritsar'},

  /* ── Sikkim ── */
  {id:'gangtok',    name:'Club Mahindra Gangtok',                    state:'Sikkim', q:'Club Mahindra Gangtok Resort'},
  {id:'levintuna',  name:'Le Vintuna, Gangtok',                      state:'Sikkim', q:'Le Vintuna Hotel Gangtok'},
  {id:'chumbi',     name:'The Chumbi Mountain Retreat, Pelling',     state:'Sikkim', q:'Chumbi Mountain Retreat Pelling'},

  /* ── Assam ── */
  {id:'kaziranga',  name:'Summit Green Lake Tea Resort, Kaziranga',  state:'Assam', q:'Summit Green Lake Tea Resort Kaziranga'},

  /* ── Bihar ── */
  {id:'bodhgaya',   name:'Marasa Sarovar Premiere, Bodh Gaya',       state:'Bihar', q:'Marasa Sarovar Premiere Bodhgaya'},

  /* ── International ── */
  {id:'dubai',      name:'Club Mahindra Arabian Dreams, Dubai',      state:'UAE (Dubai)', q:'Club Mahindra Arabian Dreams Dubai'},
  {id:'kathmandu',  name:'Kathmandu, Nepal (new)',                   state:'Nepal', q:'Club Mahindra Kathmandu Nepal'},
  {id:'phuket',     name:'Phuket, Thailand (new)',                   state:'Thailand', q:'Club Mahindra Phuket Thailand'},
  {id:'tbilisi',    name:'Royal Tulip Hotel & Casino, Tbilisi',      state:'Georgia', q:'Royal Tulip Hotel Casino Tbilisi'},
  {id:'caribia',    name:'Holiday Club Turun Caribia, Turku',        state:'Finland', q:'Holiday Club Caribia Turku'},
  {id:'katinkulta', name:'Holiday Club Katinkulta',                  state:'Finland', q:'Holiday Club Katinkulta Vuokatti'},
  {id:'kuusamon',   name:'Holiday Club Kuusamon Tropiikki',          state:'Finland', q:'Holiday Club Kuusamon Tropiikki'},
  {id:'saariselka', name:'Holiday Club Saariselkä',                  state:'Finland', q:'Holiday Club Saariselka'},
  {id:'saimaa',     name:'Holiday Club Saimaan Rauha',               state:'Finland', q:'Holiday Club Saimaa'},
  {id:'tampere',    name:'Holiday Club Tampereen Kehräämo',          state:'Finland', q:'Holiday Club Tampereen Kehraamo'},
  {id:'vierumaki',  name:'Holiday Club Vierumäki',                   state:'Finland', q:'Holiday Club Vierumaki'},
  {id:'are',        name:'Holiday Club Åre',                         state:'Sweden', q:'Holiday Club Are Sweden'},
  {id:'vista',      name:'Holiday Club Vista Amadores',              state:'Spain', q:'Holiday Club Vista Amadores Gran Canaria'},
  {id:'jardin',     name:'Holiday Club Jardin Amadores',             state:'Spain', q:'Holiday Club Jardin Amadores Gran Canaria'},
  {id:'puertocalma',name:'Holiday Club Puerto Calma',                state:'Spain', q:'Holiday Club Puerto Calma Gran Canaria'},
  {id:'solamadores',name:'Holiday Club Sol Amadores',                state:'Spain', q:'Holiday Club Sol Amadores Gran Canaria'}
];

/* Order of the state dropdown: Indian states first, then international */
const STATE_ORDER = [
  'Maharashtra','Goa','Kerala','Karnataka','Tamil Nadu','Puducherry',
  'Andhra Pradesh','Andaman & Nicobar','Lakshadweep','Gujarat','Rajasthan',
  'Madhya Pradesh','Daman & Diu','Himachal Pradesh','Uttarakhand',
  'Jammu & Kashmir','Uttar Pradesh','Punjab','Sikkim','Assam','Bihar',
  'UAE (Dubai)','Nepal','Thailand','Georgia','Finland','Sweden','Spain'
];
const INTL_START = 'UAE (Dubai)';

/* ═══════════════════════════════════════════════════════════════
   NEARBY PLACES TO VISIT (within ~100 km of each resort)
   Keyed by the resort id above. Each entry: {name, km}
     name = what Google Maps routes to (kept specific so it geocodes)
     km   = approximate road distance from the resort (guide only)
   Tapping a place in the resort dashboard opens Google Maps with the
   driving route FROM the resort TO that place. To add/edit a resort's
   list, change only this map. A resort with no entry here still shows
   an "Explore nearby attractions on Google Maps" button.
   ═══════════════════════════════════════════════════════════════ */
const NEARBY = {
  /* ── Maharashtra ── */
  tungi:[{name:"Pawna Lake",km:5},{name:"Tikona Fort",km:9},{name:"Lohagad Fort",km:16},{name:"Bhushi Dam, Lonavala",km:18},{name:"Della Adventure Park, Lonavala",km:20},{name:"Tiger Point, Lonavala",km:22},{name:"Karla Caves",km:24}],
  sherwood:[{name:"Venna Lake, Mahabaleshwar",km:3},{name:"Lingmala Waterfall",km:6},{name:"Mapro Garden, Mahabaleshwar",km:8},{name:"Arthur's Seat, Mahabaleshwar",km:11},{name:"Panchgani",km:19},{name:"Table Land, Panchgani",km:20},{name:"Pratapgad Fort",km:23},{name:"Kaas Plateau",km:38}],
  saj:[{name:"Venna Lake, Mahabaleshwar",km:3},{name:"Lingmala Waterfall",km:6},{name:"Mapro Garden, Mahabaleshwar",km:8},{name:"Arthur's Seat, Mahabaleshwar",km:11},{name:"Panchgani",km:19},{name:"Table Land, Panchgani",km:20},{name:"Pratapgad Fort",km:23}],
  hatgad:[{name:"Saputara Lake",km:9},{name:"Pandava Caves, Saputara",km:10},{name:"Sunset Point, Saputara",km:11},{name:"Shabari Dham",km:32},{name:"Purna Wildlife Sanctuary",km:40},{name:"Gira Waterfalls, Waghai",km:52}],
  alibaug:[{name:"Alibaug Beach",km:5},{name:"Kolaba Fort",km:6},{name:"Nagaon Beach",km:10},{name:"Kihim Beach",km:12},{name:"Kashid Beach",km:32},{name:"Murud-Janjira Fort",km:56}],
  koyna:[{name:"Ozarde Waterfall",km:9},{name:"Koyna Dam (Shivsagar Lake)",km:10},{name:"Nehru Garden, Koyna",km:11},{name:"Koyna Wildlife Sanctuary",km:12},{name:"Tapola",km:25},{name:"Mahabaleshwar",km:45}],
  ambaghat:[{name:"Amba Ghat Viewpoint",km:2},{name:"Gaganbawada",km:16},{name:"Vishalgad Fort",km:22},{name:"Panhala Fort",km:48},{name:"Jyotiba Temple, Kolhapur",km:55}],
  imagicaa:[{name:"Imagica Theme Park, Khopoli",km:1},{name:"Zenith Waterfall, Khopoli",km:8},{name:"Karnala Bird Sanctuary",km:26},{name:"Kune Waterfalls, Lonavala",km:26},{name:"Ballaleshwar Ganpati, Pali",km:30},{name:"Lonavala",km:30}],
  tropicana:[{name:"Alibaug Beach",km:6},{name:"Kolaba Fort",km:7},{name:"Nagaon Beach",km:9},{name:"Kihim Beach",km:11},{name:"Kashid Beach",km:31},{name:"Murud-Janjira Fort",km:55}],
  dulwich:[{name:"Parsi Point, Panchgani",km:5},{name:"Table Land, Panchgani",km:6},{name:"Sydney Point, Panchgani",km:7},{name:"Mapro Garden",km:7},{name:"Mahabaleshwar",km:19},{name:"Venna Lake, Mahabaleshwar",km:21}],

  /* ── Goa ── */
  acacia:[{name:"Colva Beach",km:2},{name:"Benaulim Beach",km:5},{name:"Betalbatim Beach",km:6},{name:"Margao",km:8},{name:"Basilica of Bom Jesus, Old Goa",km:28},{name:"Cabo de Rama Fort",km:30},{name:"Dudhsagar Falls",km:60}],
  emerald:[{name:"Varca Beach",km:3},{name:"Colva Beach",km:6},{name:"Margao",km:10},{name:"Mobor Beach",km:12},{name:"Basilica of Bom Jesus, Old Goa",km:30},{name:"Dudhsagar Falls",km:58}],
  varca:[{name:"Varca Beach",km:2},{name:"Benaulim Beach",km:5},{name:"Colva Beach",km:7},{name:"Cavelossim Beach",km:8},{name:"Margao",km:11},{name:"Dudhsagar Falls",km:60}],
  assonora:[{name:"Mayem Lake",km:10},{name:"Mapusa",km:12},{name:"Calangute Beach",km:20},{name:"Baga Beach",km:22},{name:"Anjuna Beach",km:24},{name:"Fort Aguada",km:28}],
  courtyard:[{name:"Fort Aguada",km:12},{name:"Calangute Beach",km:12},{name:"Baga Beach",km:14},{name:"Panjim",km:16},{name:"Anjuna Beach",km:16},{name:"Basilica of Bom Jesus, Old Goa",km:20}],
  orchard:[{name:"Fort Aguada",km:12},{name:"Calangute Beach",km:12},{name:"Baga Beach",km:14},{name:"Panjim",km:16},{name:"Anjuna Beach",km:16},{name:"Basilica of Bom Jesus, Old Goa",km:20}],
  rivervilla:[{name:"Candolim Beach",km:7},{name:"Fort Aguada",km:8},{name:"Sinquerim Beach",km:8},{name:"Calangute Beach",km:10},{name:"Anjuna Beach",km:14},{name:"Panjim",km:14}],
  arohamaj:[{name:"Candolim Beach",km:8},{name:"Fort Aguada",km:9},{name:"Calangute Beach",km:10},{name:"Baga Beach",km:11},{name:"Anjuna Beach",km:13},{name:"Panjim",km:16}],
  arohagr:[{name:"Candolim Beach",km:8},{name:"Fort Aguada",km:9},{name:"Calangute Beach",km:10},{name:"Baga Beach",km:11},{name:"Anjuna Beach",km:13},{name:"Panjim",km:16}],
  igreha:[{name:"Chapora Fort",km:8},{name:"Morjim Beach",km:8},{name:"Vagator Beach",km:9},{name:"Ashwem Beach",km:10},{name:"Anjuna Beach",km:12},{name:"Arambol Beach",km:16}],
  ishavilas:[{name:"Chapora Fort",km:8},{name:"Morjim Beach",km:8},{name:"Vagator Beach",km:9},{name:"Ashwem Beach",km:10},{name:"Anjuna Beach",km:12},{name:"Arambol Beach",km:16}],
  monforte:[{name:"Panjim",km:15},{name:"Miramar Beach",km:16},{name:"Basilica of Bom Jesus, Old Goa",km:18},{name:"Dona Paula",km:18},{name:"Calangute Beach",km:18}],
  moira:[{name:"Mapusa",km:6},{name:"Panjim",km:15},{name:"Calangute Beach",km:16},{name:"Anjuna Beach",km:16},{name:"Fort Aguada",km:18}],

  /* ── Kerala ── */
  munnar:[{name:"Tea Museum, Munnar",km:5},{name:"Attukal Waterfalls, Munnar",km:9},{name:"Mattupetty Dam",km:13},{name:"Eravikulam National Park",km:13},{name:"Echo Point, Munnar",km:15},{name:"Kundala Lake",km:20},{name:"Top Station",km:32}],
  mtserene:[{name:"Tea Museum, Munnar",km:6},{name:"Attukal Waterfalls, Munnar",km:10},{name:"Mattupetty Dam",km:14},{name:"Eravikulam National Park",km:14},{name:"Echo Point, Munnar",km:16},{name:"Kundala Lake",km:21},{name:"Top Station",km:33}],
  thekkady:[{name:"Periyar Wildlife Sanctuary",km:4},{name:"Periyar Lake",km:5},{name:"Spice Plantations, Thekkady",km:6},{name:"Mangala Devi Temple",km:14},{name:"Vandanmedu",km:25},{name:"Gavi",km:40}],
  ashtamudi:[{name:"Ashtamudi Lake",km:2},{name:"Kollam Beach",km:10},{name:"Thangassery Lighthouse",km:12},{name:"Munroe Island",km:25},{name:"Jatayu Earth's Center",km:45},{name:"Palaruvi Waterfalls",km:70}],
  poovar:[{name:"Poovar Island",km:2},{name:"Azhimala Shiva Temple",km:15},{name:"Kovalam Beach",km:25},{name:"Vizhinjam",km:28},{name:"Neyyar Dam",km:35},{name:"Padmanabhaswamy Temple",km:40}],
  cherai:[{name:"Cherai Beach",km:2},{name:"Marine Drive, Kochi",km:28},{name:"Fort Kochi",km:30},{name:"Chinese Fishing Nets, Fort Kochi",km:30},{name:"Mattancherry Palace",km:32},{name:"Hill Palace, Tripunithura",km:35}],
  vythiri:[{name:"Pookode Lake",km:6},{name:"Chembra Peak",km:12},{name:"Soochipara Falls",km:20},{name:"Edakkal Caves",km:25},{name:"Banasura Sagar Dam",km:25},{name:"Kuruva Island",km:45}],
  arookutty:[{name:"Vembanad Lake",km:5},{name:"Alleppey Backwaters",km:12},{name:"Pathiramanal Island",km:15},{name:"Alappuzha Beach",km:18},{name:"Marari Beach",km:20}],

  /* ── Karnataka ── */
  madikeri:[{name:"Madikeri Fort",km:1},{name:"Raja's Seat, Madikeri",km:2},{name:"Omkareshwara Temple, Madikeri",km:2},{name:"Abbey Falls",km:8},{name:"Dubare Elephant Camp",km:30},{name:"Namdroling Monastery, Kushalnagar",km:35},{name:"Talacauvery",km:45}],
  virajpet:[{name:"Padi Igguthappa Temple",km:12},{name:"Chelavara Falls",km:18},{name:"Tadiandamol Peak",km:25},{name:"Iruppu Falls",km:30},{name:"Nagarhole National Park",km:45}],
  vijayshree:[{name:"Virupaksha Temple, Hampi",km:3},{name:"Hampi Bazaar",km:3},{name:"Matanga Hill, Hampi",km:4},{name:"Vittala Temple, Hampi",km:5},{name:"Lotus Mahal, Hampi",km:5},{name:"Anegundi",km:8},{name:"Tungabhadra Dam",km:20}],
  eagleton:[{name:"Nrityagram",km:15},{name:"Manchanabele Dam",km:20},{name:"Wonderla Bangalore",km:25},{name:"Big Banyan Tree",km:30},{name:"Savandurga",km:35},{name:"Bangalore Palace",km:45}],
  goldenlm:[{name:"Mysore Palace",km:5},{name:"St. Philomena's Church, Mysuru",km:5},{name:"Mysore Zoo",km:6},{name:"Chamundi Hills",km:12},{name:"Srirangapatna",km:18},{name:"Brindavan Gardens",km:25}],

  /* ── Tamil Nadu ── */
  danish:[{name:"Botanical Garden, Ooty",km:2},{name:"Ooty Lake",km:3},{name:"Rose Garden, Ooty",km:3},{name:"Doddabetta Peak",km:10},{name:"Coonoor",km:19},{name:"Pykara Falls",km:20}],
  derby:[{name:"Botanical Garden, Ooty",km:2},{name:"Ooty Lake",km:3},{name:"Rose Garden, Ooty",km:3},{name:"Doddabetta Peak",km:10},{name:"Coonoor",km:19},{name:"Pykara Falls",km:20}],
  leposhe:[{name:"Bryant Park, Kodaikanal",km:2},{name:"Coaker's Walk, Kodaikanal",km:2},{name:"Kodaikanal Lake",km:3},{name:"Pine Forest, Kodaikanal",km:5},{name:"Dolphin's Nose, Kodaikanal",km:6},{name:"Pillar Rocks, Kodaikanal",km:7},{name:"Silver Cascade Falls",km:8}],
  amani:[{name:"Sim's Park, Coonoor",km:2},{name:"Lamb's Rock, Coonoor",km:8},{name:"Dolphin's Nose, Coonoor",km:10},{name:"Catherine Falls",km:12},{name:"Doddabetta Peak",km:12},{name:"Ooty",km:19}],

  /* ── Puducherry ── */
  puducherry:[{name:"Promenade Beach, Puducherry",km:3},{name:"Rock Beach, Puducherry",km:3},{name:"Sri Aurobindo Ashram",km:3},{name:"Botanical Garden, Puducherry",km:4},{name:"Paradise Beach, Puducherry",km:8},{name:"Chunnambar Backwaters",km:8},{name:"Auroville",km:12}],

  /* ── Andhra Pradesh ── */
  starlit:[{name:"ISKCON Tirupati",km:5},{name:"Chandragiri Fort",km:12},{name:"Tirumala Venkateswara Temple",km:22},{name:"Silathoranam, Tirumala",km:24},{name:"Sri Kalahasti Temple",km:36},{name:"Talakona Waterfall",km:55}],
  dindi:[{name:"Godavari River Cruise, Dindi",km:2},{name:"Antarvedi",km:30},{name:"Coringa Wildlife Sanctuary",km:40},{name:"Rajahmundry",km:55},{name:"Kolleru Lake",km:60}],

  /* ── Andaman & Nicobar ── */
  havelock:[{name:"Vijaynagar Beach, Havelock",km:2},{name:"Kalapathar Beach, Havelock",km:5},{name:"Elephant Beach, Havelock",km:6},{name:"Radhanagar Beach, Havelock",km:8}],
  neil:[{name:"Bharatpur Beach, Neil Island",km:2},{name:"Laxmanpur Beach, Neil Island",km:3},{name:"Natural Bridge, Neil Island",km:4},{name:"Sitapur Beach, Neil Island",km:5}],
  portblair:[{name:"Cellular Jail, Port Blair",km:3},{name:"Anthropological Museum, Port Blair",km:3},{name:"Corbyn's Cove Beach",km:7},{name:"Chidiya Tapu",km:25},{name:"Wandoor Beach",km:28}],

  /* ── Lakshadweep ── */
  kavaratti:[{name:"Kavaratti Lagoon",km:1},{name:"Ujra Mosque, Kavaratti",km:2},{name:"Marine Aquarium, Kavaratti",km:2},{name:"Dolphin Dive Centre, Kavaratti",km:2}],

  /* ── Gujarat ── */
  kensville:[{name:"Auto World Vintage Car Museum, Ahmedabad",km:25},{name:"Adalaj Stepwell",km:30},{name:"Sabarmati Ashram",km:35},{name:"Kankaria Lake, Ahmedabad",km:40},{name:"Nalsarovar Bird Sanctuary",km:55}],
  gir:[{name:"Gir National Park",km:3},{name:"Kamleshwar Dam",km:10},{name:"Devaliya Safari Park",km:12},{name:"Somnath Temple",km:45},{name:"Junagadh",km:60}],
  dwarka:[{name:"Dwarkadhish Temple, Dwarka",km:2},{name:"Gomti Ghat, Dwarka",km:2},{name:"Rukmini Devi Temple, Dwarka",km:2},{name:"Nageshwar Jyotirlinga",km:16},{name:"Bet Dwarka",km:30},{name:"Beyt Dwarka Lighthouse",km:32}],
  netrang:[{name:"Rajpipla",km:30},{name:"Zarwani Waterfall",km:35},{name:"Ninai Waterfall",km:55},{name:"Statue of Unity, Kevadia",km:65}],
  pavagadh:[{name:"Kalika Mata Temple, Pavagadh",km:3},{name:"Champaner Archaeological Park",km:5},{name:"Jama Masjid, Champaner",km:5},{name:"Hathni Mata Waterfall",km:40},{name:"Vadodara",km:48}],

  /* ── Rajasthan ── */
  udaipur:[{name:"City Palace, Udaipur",km:3},{name:"Lake Pichola",km:3},{name:"Jagdish Temple, Udaipur",km:3},{name:"Fateh Sagar Lake",km:5},{name:"Saheliyon ki Bari",km:5},{name:"Sajjangarh Monsoon Palace",km:8},{name:"Eklingji Temple",km:22}],
  jaisalmer:[{name:"Jaisalmer Fort",km:2},{name:"Patwon ki Haveli",km:2},{name:"Gadisar Lake",km:3},{name:"Bada Bagh",km:6},{name:"Kuldhara Village",km:18},{name:"Sam Sand Dunes",km:42}],
  kumbhal:[{name:"Kumbhalgarh Fort",km:3},{name:"Kumbhalgarh Wildlife Sanctuary",km:5},{name:"Mucchal Mahavir Temple",km:10},{name:"Ranakpur Jain Temple",km:25},{name:"Haldighati",km:40}],
  jaipur:[{name:"Jal Mahal",km:6},{name:"Hawa Mahal",km:8},{name:"City Palace, Jaipur",km:8},{name:"Jantar Mantar, Jaipur",km:8},{name:"Nahargarh Fort",km:10},{name:"Amber Fort",km:12},{name:"Jaigarh Fort",km:14}],
  aravali:[{name:"Nakki Lake, Mount Abu",km:2},{name:"Dilwara Temples",km:3},{name:"Sunset Point, Mount Abu",km:3},{name:"Mount Abu Wildlife Sanctuary",km:7},{name:"Achalgarh Fort",km:11},{name:"Guru Shikhar",km:15}],
  tigerkingdom:[{name:"Surwal Lake",km:10},{name:"Ranthambore National Park",km:12},{name:"Ranthambore Fort",km:14},{name:"Trinetra Ganesh Temple, Ranthambore",km:14},{name:"Kachida Valley",km:18}],
  naturersj:[{name:"Kumbhalgarh Fort",km:5},{name:"Kumbhalgarh Wildlife Sanctuary",km:6},{name:"Ranakpur Jain Temple",km:25},{name:"Haldighati",km:40}],
  pushkar:[{name:"Pushkar Lake",km:3},{name:"Brahma Temple, Pushkar",km:3},{name:"Rangji Temple, Pushkar",km:3},{name:"Savitri Temple, Pushkar",km:4},{name:"Ana Sagar Lake, Ajmer",km:14},{name:"Ajmer Sharif Dargah",km:15}],
  bharatpur:[{name:"Keoladeo National Park",km:3},{name:"Bharatpur Palace",km:4},{name:"Lohagarh Fort, Bharatpur",km:5},{name:"Fatehpur Sikri",km:23},{name:"Deeg Palace",km:35}],
  pratap:[{name:"Clock Tower Market, Jodhpur",km:4},{name:"Mehrangarh Fort",km:5},{name:"Jaswant Thada",km:5},{name:"Umaid Bhawan Palace",km:7},{name:"Mandore Gardens",km:9},{name:"Kaylana Lake",km:11}],

  /* ── Madhya Pradesh ── */
  kanha:[{name:"Kanha National Park",km:3},{name:"Kanha Museum",km:3},{name:"Shravan Tal",km:10},{name:"Bamni Dadar Sunset Point",km:12}],
  bundela:[{name:"Western Group of Temples, Khajuraho",km:3},{name:"Khajuraho Temples",km:3},{name:"Raneh Falls",km:20},{name:"Panna National Park",km:30},{name:"Pandav Falls",km:34}],
  bandhavgarh:[{name:"Bandhavgarh National Park",km:3},{name:"Baghel Museum",km:3},{name:"Bandhavgarh Fort",km:10},{name:"Shesh Shaiya, Bandhavgarh",km:11},{name:"Three Cave Point",km:12}],

  /* ── Daman & Diu ── */
  jampore:[{name:"Jampore Beach",km:2},{name:"Moti Daman Fort",km:5},{name:"Nani Daman Fort",km:5},{name:"Church of Bom Jesus, Daman",km:5},{name:"Devka Beach",km:8}],
  lighthouse:[{name:"Moti Daman Fort & Lighthouse",km:2},{name:"Nani Daman Fort",km:2},{name:"Cathedral of Bom Jesus, Daman",km:2},{name:"Jampore Beach",km:4},{name:"Devka Beach",km:7}],
  chakratirth:[{name:"Chakratirth Beach, Diu",km:2},{name:"St. Paul's Church, Diu",km:4},{name:"Diu Fort",km:5},{name:"Naida Caves, Diu",km:5},{name:"Gangeshwar Temple, Diu",km:6},{name:"Nagoa Beach, Diu",km:7}],
  nagoa:[{name:"Nagoa Beach, Diu",km:1},{name:"Gangeshwar Temple, Diu",km:3},{name:"INS Khukri Memorial, Diu",km:6},{name:"Diu Fort",km:8},{name:"Naida Caves, Diu",km:8},{name:"St. Paul's Church, Diu",km:8}],

  /* ── Himachal Pradesh ── */
  dharamshala:[{name:"McLeod Ganj",km:9},{name:"Dalai Lama Temple, McLeod Ganj",km:9},{name:"Bhagsunag Waterfall",km:11},{name:"Dal Lake, Dharamshala",km:11},{name:"Triund",km:13},{name:"Kangra Fort",km:20},{name:"Masroor Rock Cut Temples",km:40}],
  kandaghat:[{name:"Karol Tibba, Kandaghat",km:8},{name:"Kali Ka Tibba, Chail",km:12},{name:"Chail",km:18},{name:"Shimla",km:26},{name:"Kufri",km:35}],
  whitemeadows:[{name:"Mall Road, Manali",km:3},{name:"Hadimba Temple, Manali",km:4},{name:"Old Manali",km:4},{name:"Vashisht Hot Springs",km:5},{name:"Jogini Falls",km:6},{name:"Solang Valley",km:12},{name:"Rohtang Pass",km:50}],
  snowpeaks:[{name:"Mall Road, Manali",km:3},{name:"Hadimba Temple, Manali",km:4},{name:"Old Manali",km:4},{name:"Vashisht Hot Springs",km:5},{name:"Jogini Falls",km:6},{name:"Solang Valley",km:12},{name:"Rohtang Pass",km:50}],
  naldehra:[{name:"Naldehra Golf Course",km:2},{name:"Mashobra",km:10},{name:"Shimla",km:22},{name:"Tattapani",km:25},{name:"Chadwick Falls",km:25},{name:"Kufri",km:28}],
  janjehli:[{name:"Janjehli Valley",km:2},{name:"Shikari Devi Temple",km:18},{name:"Chindi",km:30},{name:"Karsog Valley",km:35}],

  /* ── Uttarakhand ── */
  mussoorie:[{name:"Mall Road, Mussoorie",km:1},{name:"Gun Hill, Mussoorie",km:2},{name:"Company Garden, Mussoorie",km:3},{name:"Landour",km:4},{name:"Lal Tibba",km:6},{name:"Cloud's End, Mussoorie",km:7},{name:"Kempty Falls",km:15},{name:"Dhanaulti",km:28}],
  binsarvalley:[{name:"Binsar Wildlife Sanctuary",km:10},{name:"Zero Point, Binsar",km:12},{name:"Kasar Devi Temple",km:20},{name:"Almora",km:25},{name:"Katarmal Sun Temple",km:30},{name:"Jageshwar Temples",km:35}],
  binsarvilla:[{name:"Binsar Wildlife Sanctuary",km:10},{name:"Zero Point, Binsar",km:12},{name:"Kasar Devi Temple",km:20},{name:"Almora",km:25},{name:"Katarmal Sun Temple",km:30},{name:"Jageshwar Temples",km:35}],
  kanatal:[{name:"Kodia Jungle, Kanatal",km:3},{name:"Kaudia Forest",km:4},{name:"Surkanda Devi Temple",km:8},{name:"Dhanaulti Eco Park",km:10},{name:"Chamba, Uttarakhand",km:25},{name:"Tehri Lake",km:35}],
  patkote:[{name:"Kosi River, Corbett",km:12},{name:"Jim Corbett National Park",km:15},{name:"Garjia Devi Temple",km:18},{name:"Corbett Falls",km:20},{name:"Corbett Museum",km:25}],

  /* ── Jammu & Kashmir ── */
  houseboats:[{name:"Dal Lake, Srinagar",km:2},{name:"Mughal Gardens, Srinagar",km:5},{name:"Shankaracharya Temple",km:6},{name:"Hazratbal Shrine",km:7},{name:"Nishat Bagh",km:8},{name:"Pari Mahal",km:8},{name:"Shalimar Bagh",km:10},{name:"Gulmarg",km:50}],
  zaznar:[{name:"Ganderbal",km:12},{name:"Manasbal Lake",km:15},{name:"Naranag",km:25},{name:"Srinagar",km:30},{name:"Wular Lake",km:30},{name:"Sonamarg",km:55}],

  /* ── Uttar Pradesh ── */
  saura:[{name:"Agra Fort",km:4},{name:"Taj Mahal",km:5},{name:"Itmad-ud-Daulah (Baby Taj)",km:5},{name:"Mehtab Bagh",km:6},{name:"Akbar's Tomb, Sikandra",km:12},{name:"Fatehpur Sikri",km:38}],
  ayodhya:[{name:"Ram Mandir, Ayodhya",km:2},{name:"Kanak Bhawan, Ayodhya",km:2},{name:"Saryu Ghat, Ayodhya",km:2},{name:"Hanuman Garhi, Ayodhya",km:3},{name:"Nageshwarnath Temple, Ayodhya",km:3},{name:"Guptar Ghat",km:5}],

  /* ── Punjab ── */
  ranjitvihar:[{name:"Golden Temple, Amritsar",km:5},{name:"Jallianwala Bagh",km:5},{name:"Partition Museum, Amritsar",km:5},{name:"Durgiana Temple",km:5},{name:"Gobindgarh Fort, Amritsar",km:6},{name:"Wagah Border",km:30}],

  /* ── Sikkim ── */
  gangtok:[{name:"MG Marg, Gangtok",km:2},{name:"Ganesh Tok",km:7},{name:"Banjhakri Falls",km:8},{name:"Hanuman Tok",km:9},{name:"Rumtek Monastery",km:24},{name:"Tsomgo Lake",km:38},{name:"Baba Mandir",km:50}],
  levintuna:[{name:"MG Marg, Gangtok",km:2},{name:"Ganesh Tok",km:7},{name:"Banjhakri Falls",km:8},{name:"Hanuman Tok",km:9},{name:"Rumtek Monastery",km:24},{name:"Tsomgo Lake",km:38}],
  chumbi:[{name:"Rabdentse Ruins",km:3},{name:"Pemayangtse Monastery",km:3},{name:"Sanga Choeling Monastery",km:4},{name:"Sky Walk (Chenrezig Statue), Pelling",km:5},{name:"Khecheopalri Lake",km:25},{name:"Kanchenjunga Falls",km:28}],

  /* ── Assam ── */
  kaziranga:[{name:"Kaziranga National Park",km:5},{name:"Tea Gardens, Kaziranga",km:5},{name:"Kaziranga Orchid Park",km:8},{name:"Kakochang Waterfall",km:25},{name:"Hoollongapar Gibbon Sanctuary",km:40}],

  /* ── Bihar ── */
  bodhgaya:[{name:"Mahabodhi Temple, Bodh Gaya",km:2},{name:"Great Buddha Statue, Bodh Gaya",km:2},{name:"Bodhi Tree, Bodh Gaya",km:2},{name:"Dungeshwari Caves",km:12},{name:"Vishnupad Temple, Gaya",km:16},{name:"Barabar Caves",km:45}],

  /* ── International ── */
  dubai:[{name:"Burj Khalifa & Dubai Mall",km:15},{name:"Palm Jumeirah",km:20},{name:"Dubai Marina",km:25},{name:"Miracle Garden, Dubai",km:28},{name:"Global Village, Dubai",km:30},{name:"Desert Safari, Dubai",km:40}],
  kathmandu:[{name:"Kathmandu Durbar Square",km:4},{name:"Swayambhunath (Monkey Temple)",km:5},{name:"Pashupatinath Temple",km:6},{name:"Boudhanath Stupa",km:7},{name:"Patan Durbar Square",km:8},{name:"Bhaktapur Durbar Square",km:15},{name:"Nagarkot",km:30}],
  phuket:[{name:"Old Phuket Town",km:10},{name:"Karon Beach",km:12},{name:"Patong Beach",km:15},{name:"Bangla Road, Patong",km:15},{name:"Big Buddha, Phuket",km:18},{name:"Promthep Cape",km:25}],
  tbilisi:[{name:"Old Town Tbilisi",km:2},{name:"Bridge of Peace, Tbilisi",km:2},{name:"Narikala Fortress",km:3},{name:"Holy Trinity Cathedral (Sameba)",km:3},{name:"Mtatsminda Park",km:5},{name:"Mtskheta",km:22},{name:"Jvari Monastery",km:25}],
  caribia:[{name:"Turku Cathedral",km:2},{name:"Aura River, Turku",km:2},{name:"Luostarinmaki Handicrafts Museum",km:3},{name:"Turku Castle",km:5},{name:"Naantali Old Town",km:17},{name:"Moominworld, Naantali",km:17}],
  katinkulta:[{name:"Vuokatti Ski Resort",km:3},{name:"Sotkamo",km:10},{name:"Kajaani",km:35}],
  kuusamon:[{name:"Kuusamo",km:2},{name:"Ruka Ski Resort",km:28},{name:"Oulanka National Park",km:55},{name:"Riisitunturi National Park",km:60}],
  saariselka:[{name:"Saariselka Ski Resort",km:2},{name:"Kaunispaa Hill",km:3},{name:"Urho Kekkonen National Park",km:5},{name:"Tankavaara Gold Village",km:30},{name:"Inari",km:40}],
  saimaa:[{name:"Lake Saimaa",km:1},{name:"Imatra",km:30},{name:"Lappeenranta",km:30},{name:"Imatrankoski Rapids",km:32}],
  tampere:[{name:"Tampere Cathedral",km:1},{name:"Moomin Museum, Tampere",km:1},{name:"Sarkanniemi Amusement Park",km:3},{name:"Nasinneula Observation Tower",km:3},{name:"Pyynikki Observation Tower",km:3}],
  vierumaki:[{name:"Vierumaki Sports Institute",km:1},{name:"Heinola",km:18},{name:"Messila Ski Resort",km:30},{name:"Lahti",km:35}],
  are:[{name:"Are Ski Resort",km:2},{name:"Areskutan Mountain",km:3},{name:"Duved",km:8},{name:"Tannforsen Waterfall",km:25}],
  vista:[{name:"Amadores Beach",km:2},{name:"Puerto Rico Beach, Gran Canaria",km:3},{name:"Anfi Beach",km:5},{name:"Puerto de Mogan",km:8},{name:"Maspalomas Dunes",km:30}],
  jardin:[{name:"Amadores Beach",km:2},{name:"Puerto Rico Beach, Gran Canaria",km:3},{name:"Anfi Beach",km:5},{name:"Puerto de Mogan",km:8},{name:"Maspalomas Dunes",km:30}],
  puertocalma:[{name:"Amadores Beach",km:2},{name:"Puerto Rico Beach, Gran Canaria",km:3},{name:"Anfi Beach",km:5},{name:"Puerto de Mogan",km:8},{name:"Maspalomas Dunes",km:30}],
  solamadores:[{name:"Amadores Beach",km:2},{name:"Puerto Rico Beach, Gran Canaria",km:3},{name:"Anfi Beach",km:5},{name:"Puerto de Mogan",km:8},{name:"Maspalomas Dunes",km:30}]
};
