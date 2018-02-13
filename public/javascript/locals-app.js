import removeWatchingNow from './modules/removeWatchingNow';

// typeSearch(searchBar);

// const removeForms = document.querySelectorAll('form.remove')
// console.log(removeForms);
// removeForms.addEventListener('submit', removeWatchingNow)
Array.prototype.forEach.call(document.querySelectorAll('form.remove'), function(element) {
     element.addEventListener('submit' , removeWatchingNow) 
});

export default removeWatchingNow;