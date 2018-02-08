import axios from 'axios';

const mapOptions = {
    center: { lat:34.0, lng: -118.2},
    zoom: 9
};

function loadGatherings(map, lat = 34.0, lng = -118.2){
    axios.get(`/api/gatherings/near?lat=${lat}&lng=${lng}`)
    .then(res => {
        const gatherings = res.data;
        /// Notify if no places are found TO DO
        const mapMarkers = gatherings.map(gathering => {
            console.log(gathering);
            // Array Destructuring
            const [gatheringLng, gatheringLat] = gathering.location.coordinates;
            const position = { lat: placeLat, lng: placeLng};
            const marker = new google.maps.Marker({
                position,
                map,
            });
            marker.gathering = gathering;
            return marker;
        });
        console.log(markers);
    });
};

function createMap(mapDiv){
    if(!mapDiv) return;
    // Make the map
    const map = new google.maps.Map(mapDiv, mapOptions);
    loadGatherings(map);
    const mapInput = document.querySelector('[name="geolocate"]');
    const autoComplete = new google.maps.places.Autocomplete(mapInput);
};

export default createMap;