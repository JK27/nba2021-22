const venue = JSON.parse(document.getElementById("map").dataset.venue);

mapboxgl.accessToken = 'pk.eyJ1IjoiamsyNyIsImEiOiJjbDM4bXRxYXowMWc1M2lxZjN0dWl3cHZnIn0.pagSzy_FQ6Q090bac7p6Gw';

const center = venue.coordinates;
const el = document.createElement('div')
el.className = 'marker';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jk27/cl45b4zot000g15pe9fzyrrpm',
  scrollZoom: false,
  center: center,
  zoom: 14,
  interactive: false,



});

const marker = new mapboxgl.Marker({
  element: el,
  anchor: 'bottom'
}).setLngLat(venue.coordinates).addTo(map)








// map.on('load', () => {
//   map.addSource('venue', {
//     'type': 'geojson',
//     'data': {},
//     'properties': {
//       'description':
//         '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
//       'icon': `${team.logo}`,
//     },
//     'geometry': {
//       'type': 'Point',
//       'coordinates': [-77.038659, 38.931567],
//       'zoom': 15
//     }
//   });

//   // Add a layer showing the venue.
//   map.addLayer({
//     'id': 'places',
//     'type': 'symbol',
//     'source': 'venue',
//     'layout': {
//       'icon-image': '{icon}',
//       'icon-allow-overlap': true
//     }
//   });
//   // When a click event occurs on a feature in the places layer, open a popup at the
//   // location of the feature, with description HTML from its properties.
//   map.on('click', 'places', (e) => {
//     // Copy coordinates array.
//     const coordinates = e.features[0].geometry.coordinates.slice();
//     const description = e.features[0].properties.description;
//     new mapboxgl.Popup()
//       .setLngLat(coordinates)
//       .setHTML(description)
//       .addTo(map);
//   });

//   // Change the cursor to a pointer when the mouse is over the venue layer.
//   map.on('mouseenter', 'venue', () => {
//     map.getCanvas().style.cursor = 'pointer';
//   });

//   // Change it back to a pointer when it leaves.
//   map.on('mouseleave', 'places', () => {
//     map.getCanvas().style.cursor = '';
//   });

// });
