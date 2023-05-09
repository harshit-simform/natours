/* eslint-disable*/

const locations = JSON.parse(document.getElementById('map').dataset.location);
console.log(locations);
mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFyc2hpdC1zaW1mb3JtIiwiYSI6ImNsaGdiYThxeTAybWszZXFqa2pobW9nZDcifQ.YCr6dyonilEMquYxb2sVAA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-118.1152, 34.1174],
  zoom: 7,
});
