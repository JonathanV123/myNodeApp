import autocomplete from './modules/autocomplete';

const lat = document.querySelector("#lat");
const lng = document.querySelector("#lng");
const address = document.querySelector("#address");

autocomplete(address, lat, lng);