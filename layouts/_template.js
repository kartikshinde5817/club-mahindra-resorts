/* ═══════════════════════════════════════════════════════════════
   LAYOUT TEMPLATE — copy this file to <resortid>.js to add a
   fully drawn map for another resort (resortid = id used in
   resorts-data.js). Fill it by tracing the resort's official
   layout plan, exactly like layouts/tungi.js (open that file
   as a full working example).

   What each part means:
   - RESORT_META : names shown in the sidebar. has3d:false hides
                   the 3D button (2D only).
   - CONFIG      : metersPerUnit (real meters per map unit),
                   walking speed, and 2 GPS reference points.
   - NODES       : road junction points {ID:[x,y], ...}
   - CHAINS      : roads, as lists of node IDs (drawn smooth)
   - CLOSED      : optional closed-road line (drawn hazy)
   - POIS        : every place: rooms, dining, activities...
                   spur = which node its walking path starts from
                   bld  = [cx,cy,width,depth,rotation] building
   - GROUPS      : dropdown groups (Room blocks / Dining / ...)
   - LANDMARK    : node → name used in "Walk past X" steps
   - BOUNDARY    : resort outline polygon
   - PUBLIC_ROAD : the outside road near the gate

   Coordinates are in a 1256 × 876 canvas (x right, y down).
   ═══════════════════════════════════════════════════════════════ */
