window.onload=function(){
  var d = new Date();
  var n = d.getFullYear();
  var center = [13.0933418, 121.4767572];
  var bbox = [116.22307468566594,4.27103012208686,127.09228398538997,21.2510169394873];
  var bounds = [
  [bbox[1], bbox[0]],
  [bbox[3], bbox[2]]
  ];
  var map = L.map('map', {center: center, zoom: 6,minZoom: 6, maxZoom: 18, maxBounds: bounds, maxBoundsViscosity: 1}).setView(center, 6);
  map.fitBounds(bounds);

  tile_layer = L.tileLayer.wms('https://lipad-geoserver.dream.upd.edu.ph/geoserver/wms', {
    ptype: "gxp_wmsgetfeatureinfo",
    layers: 'lipad:philgrid',
    format: 'image/png',
    transparent: true,
    'opacity':1,
    tiled:true,
    visibility:true,
    continuousWorld: true,
  }).addTo(map).bringToFront();

  // apply local osm group as overlay
  osm_map = L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data ©'+ n +' <a href="http://osm.org/copyright">OpenStreetMap</a> and contributors',
      maxZoom: 18
    }).addTo(map).bringToBack();

  var fhms_5yr = L.tileLayer.wms('https://lipad-fmc.dream.upd.edu.ph/geoserver/ows?', {
    ptype: 'gxp_wmsgetfeatureinfo',
    layers: 'geonode:fhms_5yr',
    format: 'image/png',
    transparent: true,
    'opacity': 1,
    tiled: true,
    visibility: true,
    continuousWorld: true
  });

  var fhms_25yr = L.tileLayer.wms('https://lipad-fmc.dream.upd.edu.ph/geoserver/ows?', {
    ptype: 'gxp_wmsgetfeatureinfo',
    layers: 'geonode:fhms_25yr',
    format: 'image/png',
    transparent: true,
    'opacity': 1,
    tiled: true,
    visibility: true,
    continuousWorld: true
  });

  var fhms_100yr = L.tileLayer.wms('https://lipad-fmc.dream.upd.edu.ph/geoserver/ows?', {
    ptype: 'gxp_wmsgetfeatureinfo',
    layers: 'geonode:fhms_100yr',
    format: 'image/png',
    transparent: true,
    'opacity': 1,
    visibility: true,
    continuousWorld: true
  });

  var baseMaps = {
    'OpenStreetMap' : osm_map
  };

  var overlays = {
    'Data Coverage': tile_layer,
    'Flood Hazard Maps 5yr': fhms_5yr,
    'Flood Hazard Maps 25yr': fhms_25yr,
    'Flood Hazard Maps 100yr': fhms_100yr
  };
  // L.control.layers(overlays, null, {collapsed: false}).addTo(map);
  //map.layerscontrol.removeFrom(map);

  var legend = L.control({position:'bottomleft'});
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<div class="w3-white"><p class="w3-medium"> Legend: </p><p><img id="legend_icon" src="static/philgrid_legend.png"></p></div>';
    return div;
  };

  legend.addTo(map);

  L.control.layers(baseMaps, overlays, {collapsed: false}).addTo(map);
  L.control.scale({position: 'bottomright'}).addTo(map);

var geocoder = L.Control.geocoder({
  geocoder: L.Control.Geocoder.nominatim({
        geocodingQueryParams: {countrycodes: 'ph'}
    }),
  defaultMarkGeocode: false,
  position: "topleft"
})
  .on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    map.fitBounds(bbox);
  })
  .addTo(map);


  var loc_map = L.map('map-canvas').setView([14.65658, 121.07006], 18);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy;' + n + ' <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(loc_map);
  // add marker to the maps
  marker = L.marker([14.6565835575189, 121.07006946741454]).addTo(loc_map);
  // add popup to the marker
  marker.bindPopup("<b>DGE & UP TCAGP").openPopup()

}