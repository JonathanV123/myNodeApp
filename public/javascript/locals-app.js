import autocomplete from './modules/autocomplete';
import typeSearch from './modules/typeSearch';
import createMap from './modules/map';

const lat = document.querySelector("#lat");
const lng = document.querySelector("#lng");
const address = document.querySelector("#address");
const map = document.querySelector("#map");

autocomplete(address, lat, lng);

const searchBar = document.querySelector('.search');
typeSearch(searchBar);

createMap(map);