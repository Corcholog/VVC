let lat = -37.32100277545416;
let long = -59.1348577718957;
mapboxgl.accessToken = 'pk.eyJ1IjoiY29ya2xvZyIsImEiOiJjbHhxY2hrYTYwenRtMmtvZThlZXQ5anpiIn0.kHrU6lbo-ik_Tx7F4WAv-Q';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [long, lat], // starting position [lng, lat], 
    zoom: 13, // starting zoom
});
// Create a new marker.
const marker = new mapboxgl.Marker()
    .setLngLat([long, lat])
    .addTo(map);
