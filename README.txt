════════════════════════════════════════════════════
 CLUB MAHINDRA RESORTS — guest dashboard
 One app · every resort
════════════════════════════════════════════════════

WHAT IS IN THIS FOLDER
  index.html          HOME — pick state → pick resort
  resorts-data.js     the resort list (edit resorts here)
  map.html            OUR map engine — one page draws every
                      resort's map (routes, GPS, day/time)
  layouts/tungi.js    Tungi, Lonavala — fully traced layout
  layouts/_template.js  how to add the next resort's layout
  three.min.js        3D engine (used by Tungi's map)
  server.py           small web server (needs only Python 3)
  start-windows.bat   double-click on Windows to start
  start-mac-linux.sh  run on Mac/Linux to start
  README.txt          this file

────────────────────────────────────────────────────
0) PUT IT ON THE INTERNET (Hostinger etc.)
────────────────────────────────────────────────────
  Upload ALL files of this folder into public_html
  using the host's File Manager. Turn on the free SSL
  (https). Done — GPS on the Tungi map will work live
  for guests, and every resort page will load its
  Google satellite layout.

────────────────────────────────────────────────────
0b) HOW EVERY RESORT GETS ITS FULL MAP
────────────────────────────────────────────────────
  Every resort opens OUR map page. Tungi is fully drawn
  today. A resort without a traced layout shows a clean
  "Detailed map being prepared" page in the same design.

  To get a resort fully drawn like Tungi, collect for it:
    1. The resort's layout / master plan (PDF, photo of
       the map board at reception also works), with block
       names marked.
    2. A Google Maps satellite screenshot of the resort.
  Send these and the layout file (layouts/<id>.js) gets
  traced from them — same quality as Tungi. The engine
  needs no changes; drop the file in /layouts and that
  resort's map turns on automatically.

  To add/rename resorts in the dropdowns: edit
  resorts-data.js (one line per resort).

────────────────────────────────────────────────────
1) RUN IT ON AN IP ADDRESS (for guest phones)
────────────────────────────────────────────────────
  a. Install Python 3 if not there:  https://python.org
     (on Windows, tick "Add Python to PATH" while installing)
  b. Double-click  start-windows.bat  (or run start-mac-linux.sh)
  c. It prints a link like  http://192.168.1.5:5000
  d. Open that link on any phone connected to the SAME WiFi.
     Tip: print a QR code of that link at Reception.

  Keep the window open — closing it stops the server.
  If Windows Firewall asks, click "Allow access".

  No Python? You can still just double-click index.html —
  it works fully as a normal file too.

────────────────────────────────────────────────────
2) 2D / 3D MAP
────────────────────────────────────────────────────
  Top-left of the map has 2D and 3D buttons.
  In 3D: drag to look around, scroll or pinch to zoom,
  drag with two fingers (or right mouse button) to move.
  Tap any building or pin to set "I'm here" / "Take me here".
  Routes, the blue you-are-here dot and both ways show in
  3D too. It works offline — the 3D engine file is included.
  (If a phone is very old and 3D feels slow, just use 2D.)

────────────────────────────────────────────────────
3) TWO ROUTES
────────────────────────────────────────────────────
  When the resort roads give two sensible ways to a place,
  the dashboard shows Route 1 (shortest, orange) and
  Route 2 (other way, blue). Tap the buttons to switch.
  If only one way exists, it shows only that one.

────────────────────────────────────────────────────
4) LIVE GPS — already turned on
────────────────────────────────────────────────────
  GPS is already calibrated using real Reception and
  Swimming Pool coordinates pulled from Google Maps, so
  it works immediately — nothing to copy or paste.

  Important: phone browsers allow GPS only on https:// or
  localhost. On a plain http://192.168… link, guests should
  use "Near a landmark" or "Tap the map" instead (both work
  fully). Want live GPS for guests too? Run a free https
  tunnel:
      cloudflared tunnel --url http://localhost:5000
  and share the https link it prints.

  If, once guests are actually walking the resort, the blue
  dot ever looks a little off, you can fine-tune it: open
  index.html in Notepad, find CONFIG.gps near the top, and
  replace the two lat/lng numbers with fresh ones copied
  from Google Maps (right-click Reception → copy the
  coordinates; same for the pool).

────────────────────────────────────────────────────
5) SMALL EDITS
────────────────────────────────────────────────────
  Open index.html in Notepad:
  - Rename / move a place  → edit the POIS list.
  - Distances feel off?    → nudge metersPerUnit in CONFIG.
  Everything is labelled with comments.
