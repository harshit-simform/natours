export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaGFyc2hpdC1zaW1mb3JtIiwiYSI6ImNsaGdiYThxeTAybWszZXFqa2pobW9nZDcifQ.YCr6dyonilEMquYxb2sVAA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    scrollZoom: false,
    // center: [-118.1152, 34.1174],
    // zoom: 7,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // extends map bound to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
