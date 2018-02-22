import removeShow from './modules/removeShow';
import acceptFriendRequest from './modules/acceptFriendRequest';
import denyFriendRequest from './modules/denyFriendRequest';
import searchFriends from './modules/searchFriends';
import posterBGImage from './modules/posterBG';
import chooseThisShow from './modules/chooseThisShow';
import typeSearch from './modules/typeSearch';

const removeForms = document.querySelectorAll('form.remove');
const addFriends = document.querySelectorAll('form.friends');
const acceptRequest = document.querySelectorAll('form.acceptFriend');
const denyRequest = document.querySelectorAll('form.denyRequest');
const showPoster = document.querySelectorAll('.showPoster');
const chooseShow = document.querySelectorAll('form.chooseShow');
const showPosterManageShows = document.querySelectorAll('.show');
const searchBar = document.querySelector('.search');


function addEventListener(element, func){
    // Don't run if there is no corresponding element on page
    if(element.length == 0) return;
    console.log('running add event listener func');
    Array.prototype.forEach.call(element, function(html) {
        html.addEventListener('submit' , func) 
   });
}

addEventListener(chooseShow, chooseThisShow);
addEventListener(addFriends, searchFriends);
addEventListener(acceptRequest, acceptFriendRequest);
addEventListener(removeForms, removeShow);
addEventListener(denyRequest, denyFriendRequest);
posterBGImage(showPosterManageShows);
posterBGImage(showPoster);
typeSearch(searchBar);

export default {
    typeSearch,
    chooseShow,
    posterBGImage,
    removeShow, 
    searchFriends, 
    acceptFriendRequest, 
    denyFriendRequest,
    // getShowInfo
}; 
