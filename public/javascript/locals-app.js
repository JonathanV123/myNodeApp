import removeWatchingNow from './modules/removeWatchingNow';
// typeSearch(searchBar);

const removeForms = document.querySelectorAll('form.remove');

Array.prototype.forEach.call( removeForms, function(element) {
     element.addEventListener('submit' , removeWatchingNow) 
});


export default removeWatchingNow;