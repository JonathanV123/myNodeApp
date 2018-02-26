import removeShow from './modules/removeShow';
import acceptFriendRequest from './modules/acceptFriendRequest';
import denyFriendRequest from './modules/denyFriendRequest';
import searchFriends from './modules/searchFriends';
import posterBGImage from './modules/posterBG';
import chooseThisShow from './modules/chooseThisShow';
import typeSearch from './modules/typeSearch';
import backdropBGImage from './modules/backDropBG';
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

$('.carousel').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});

function addEventListener(element, func) {
    // Don't run if there is no corresponding element on page
    if (element.length == 0) return;
    console.log('running add event listener func');
    Array.prototype.forEach.call(element, function (html) {
        html.addEventListener('submit', func)
    });
}

function checkIfResponsive() {
    if (navResponsive.style.display === "none") return;
    menuButton.addEventListener("click", function () {
        responsiveMenu.style.display = "flex";
        menuButtonNormal.style.display = "none";
        responsiveMenuClose();
    })
};

function responsiveMenuClose() {
    if (responsiveMenu.style.display === "flex") {
        responsiveMenuButton.addEventListener("click", function () {
            responsiveMenu.style.display = "none";
            menuButtonNormal.style.display = "initial";
        })
    } else {
        return;
    }
}

checkIfResponsive();

addEventListener(chooseShow, chooseThisShow);
addEventListener(addFriends, searchFriends);
addEventListener(acceptRequest, acceptFriendRequest);
addEventListener(removeForms, removeShow);
addEventListener(denyRequest, denyFriendRequest);
posterBGImage(friendShowPoster);
posterBGImage(showPoster);
backdropBGImage(backdrop);
typeSearch(searchBar);

export default {
    backdropBGImage,
    typeSearch,
    chooseShow,
    posterBGImage,
    removeShow,
    searchFriends,
    acceptFriendRequest,
    denyFriendRequest,
};