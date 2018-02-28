import removeShow from './modules/removeShow';
import acceptFriendRequest from './modules/acceptFriendRequest';
import denyFriendRequest from './modules/denyFriendRequest';
import searchFriends from './modules/searchFriends';
import posterBGImage from './modules/posterBG';
import chooseThisShow from './modules/chooseThisShow';
import typeSearch from './modules/typeSearch';
import backdropBGImage from './modules/backDropBG';
import showOwnerComment from './modules/showOwnerComment';
import exitComment from './modules/exitComment';


import $ from 'jquery';
import 'slick-carousel';

const removeForms = document.querySelectorAll('form.remove');
const addFriends = document.querySelectorAll('form.friends');
const acceptRequest = document.querySelectorAll('form.acceptFriend');
const denyRequest = document.querySelectorAll('form.denyRequest');
const chooseShow = document.querySelectorAll('form.chooseShow');
const friendShowPoster = document.querySelectorAll('.friendShowPoster');
const showPoster = document.querySelectorAll('.show');
const searchBar = document.querySelector('.search');
const menuButton = document.querySelector('.menuLinkButton');
const responsiveMenuButton = document.querySelector('.responsiveMenuButton');
const menuButtonNormal = document.querySelector('.menuLinkButton');
const navResponsive = document.querySelector('.navResponsive');
const responsiveMenu = document.querySelector('.responsiveMenu');
const backdrop = document.querySelectorAll('.showBackdropContainer');
const carousel = document.querySelectorAll('.carousel');
const carouselContainer = document.querySelector('.recOptions');
const nightModeButton = document.querySelector('#nightMode');
const showPosterInCollection = document.querySelectorAll('.friendShowPosterPrivate');
const exitCommentButton = document.querySelectorAll('#exitComment');


$('.carousel').slick({
    dots: false,
    infinite: false,
    speed: 300,
    arrows: false,
    zIndex: 10,
    slidesToShow: 7,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 815,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
});



function addEventListener(element, func) {
    // Don't run if there is no corresponding element on page
    if (element.length == 0) return;
    console.log('running add event listener func');
    Array.prototype.forEach.call(element, function (html) {
        console.log(element);
        html.addEventListener('submit', func)
    });
}

function addEventListenerClick(element, func) {
    // Don't run if there is no corresponding element on page
    if (element.length == 0) return;
    console.log('running add event listener func');
    Array.prototype.forEach.call(element, function (html) {
        html.addEventListener('click', func)
    });
}

function nightMode(element) {
    element.addEventListener('click', () => {
        // Little ugly with multiple removes and adds but
        // trying to prevent issues with second arguments in older browsers
        if (element.classList.contains("nightModeActive")){
            element.classList.remove("nightModeActive");
            element.classList.add("nightModeDeactivate");
        } else {
            element.classList.remove("nightModeDeactivate");
            element.classList.add("nightModeActive");
        }
    })
}

nightMode(nightModeButton);

function checkIfResponsive() {
    if (navResponsive.style.display === "none") return;
    menuButton.addEventListener("click", function () {
        responsiveMenu.style.display = "flex";
        carouselContainer.style.display = "none";
        menuButtonNormal.style.display = "none";
        responsiveMenuClose();
    })
};

function responsiveMenuClose() {
    if (responsiveMenu.style.display === "flex") {
        responsiveMenuButton.addEventListener("click", function () {
            responsiveMenu.style.display = "none";
            carouselContainer.style.display = "flex";
            menuButtonNormal.style.display = "initial";
        })
    } else {
        return;
    }
}

checkIfResponsive();

addEventListenerClick(exitCommentButton, exitComment);
addEventListenerClick(showPosterInCollection, showOwnerComment);
addEventListener(chooseShow, chooseThisShow);
addEventListener(addFriends, searchFriends);
addEventListener(acceptRequest, acceptFriendRequest);
addEventListener(removeForms, removeShow);
addEventListener(denyRequest, denyFriendRequest);
posterBGImage(friendShowPoster);
posterBGImage(showPoster);
posterBGImage(showPosterInCollection);
backdropBGImage(backdrop);
typeSearch(searchBar);





export default {
    exitComment,
    showOwnerComment,
    backdropBGImage,
    typeSearch,
    chooseShow,
    posterBGImage,
    removeShow,
    searchFriends,
    acceptFriendRequest,
    denyFriendRequest,
};
