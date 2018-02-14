import removeWatchingNow from './modules/removeWatchingNow';

// typeSearch(searchBar);

const removeForms = document.querySelectorAll('form.remove')
const shows = document.querySelectorAll('.show');
// console.log(removeForms);
// removeForms.addEventListener('submit', removeWatchingNow)
Array.prototype.forEach.call( removeForms, function(element) {
     element.addEventListener('submit' , removeWatchingNow) 
});


export default removeWatchingNow;