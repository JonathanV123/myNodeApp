import removeShow from './modules/removeShow';
import searchFriends from './modules/searchFriends';

// typeSearch(searchBar);

const removeForms = document.querySelectorAll('form.remove');
const addFriends = document.querySelectorAll('form.friends');

// Array.prototype.forEach.call( removeForms, function(element) {
//      element.addEventListener('submit' , removeShow) 
// });

function addEventListener(element, func){
    Array.prototype.forEach.call(element, function(html) {
        html.addEventListener('submit' , func) 
   });
}

addEventListener(removeForms, removeShow);
addEventListener(addFriends, searchFriends);

console.log(addFriends.action);
console.log(removeForms);
console.log(addFriends);
export default {removeShow, searchFriends}; 
