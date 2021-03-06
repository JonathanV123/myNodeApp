import posterBGImage from './modules/posterBG';
import typeSearch from './modules/typeSearch';
import backdropBGImage from './modules/backDropBG';
import showOwnerComment from './modules/showOwnerComment';
import exitComment from './modules/exitComment';
import darken from './modules/darken';


import $ from 'jquery';
import 'slick-carousel';

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
const showPosterInCollection = document.querySelectorAll('.friendShowPosterPrivate');
const exitCommentButton = document.querySelectorAll('#exitComment');
const nightModeSwitch = document.querySelectorAll(".nightMode");

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
    Array.prototype.forEach.call(element, function (html) {
        html.addEventListener('submit', func)
    });
}

function addEventListenerClick(element, func) {
    // Don't run if there is no corresponding element on page
    if (element.length == 0) return;
    Array.prototype.forEach.call(element, function (html) {
        html.addEventListener('click', func)
    });
}

function checkIfResponsive() {
    if(!navResponsive) return;
    if (navResponsive.style.display === "none") return;
    menuButton.addEventListener("click", function () {
        responsiveMenu.style.display = "flex";
        if(carouselContainer != null){
            carouselContainer.style.display = "none";
        }
        menuButtonNormal.style.display = "none";
        responsiveMenuClose();
    })
};

function responsiveMenuClose() {
    if (responsiveMenu.style.display === "flex") {
        responsiveMenuButton.addEventListener("click", function () {
            responsiveMenu.style.display = "none";
            if(carouselContainer != null){
                carouselContainer.style.display = "none";
            }
            menuButtonNormal.style.display = "initial";
        })
    } else {
        return;
    }
}

checkIfResponsive();
// Add event listener to night mode button
addEventListenerClick(nightModeSwitch, darken);
// Show the user comment 
addEventListenerClick(showPosterInCollection, showOwnerComment);
// Exit user comment button
addEventListenerClick(exitCommentButton, exitComment);
// Refactor Flag Start ********************************
// Get background posters for /userHome posters
posterBGImage(friendShowPoster);
// Get background posters for selectShow poster (Choosing show to save)
// and user collection page
posterBGImage(showPoster);
// Get background posters for friends collection posters
posterBGImage(showPosterInCollection);
// Refactor Flag End ********************************
backdropBGImage(backdrop);
// Allow for searching for shows on the fly
typeSearch(searchBar);


export default {
    darken,
    exitComment,
    showOwnerComment,
    backdropBGImage,
    typeSearch,
    posterBGImage,
};
