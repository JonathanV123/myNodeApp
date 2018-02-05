function autocomplete(input, latInput, lngInput){
    if(!input) return // skip from running if no input on page
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        // get lat and long from place geometry
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    }) 
    // if someone hits enter on address field, don't submit form
    const node = document.getElementById('formSubmit');
    node.addEventListener('keydown', function onEvent(event) {
        if (event.key === "Enter") {
            return false;
        }
    });
};

export default autocomplete;