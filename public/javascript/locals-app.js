import removeShow from './modules/removeShow';
import acceptFriendRequest from './modules/acceptFriendRequest';
import denyFriendRequest from './modules/denyFriendRequest';
import searchFriends from './modules/searchFriends';
// import getShowInfo from './modules/getShowInfo';
// typeSearch(searchBar);

const removeForms = document.querySelectorAll('form.remove');
const addFriends = document.querySelectorAll('form.friends');
const acceptRequest = document.querySelectorAll('form.acceptFriend');
const denyRequest = document.querySelectorAll('form.denyRequest');
// const getShowInformation = document.querySelectorAll('form.getShowInformation');


function addEventListener(element, func){
    // Don't run if there is no corresponding element on page
    if(element.length == 0) return;
    console.log('running add event listener func');
    Array.prototype.forEach.call(element, function(html) {
        html.addEventListener('submit' , func) 
   });
}


// addEventListener(removeForms, removeShow);
addEventListener(addFriends, searchFriends);
addEventListener(acceptRequest, acceptFriendRequest);
addEventListener(removeForms, removeShow);
addEventListener(denyRequest, denyFriendRequest);
// addEventListener(getShowInformation, getShowInfo);


 

export default {
    removeShow, 
    searchFriends, 
    acceptFriendRequest, 
    denyFriendRequest,
    // getShowInfo
}; 
