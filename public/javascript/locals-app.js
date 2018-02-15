import removeShow from './modules/removeShow';
import searchFriends from './modules/searchFriends';

// typeSearch(searchBar);

const removeForms = document.querySelectorAll('form.remove');
const addFriends = document.querySelectorAll('form.friends');


function addEventListener(element, func){
    // Don't run if there is no corresponding element on page
    if(element.length == 0) return;
    console.log('running add event listener func');
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
