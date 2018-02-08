import autocomplete from './modules/autocomplete';
import typeSearch from './modules/typeSearch';

const lat = document.querySelector("#lat");
const lng = document.querySelector("#lng");
const address = document.querySelector("#address");

autocomplete(address, lat, lng);

const searchBar = document.querySelector('.search');
typeSearch(searchBar)