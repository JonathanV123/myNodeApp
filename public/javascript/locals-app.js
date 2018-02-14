import removeShow from './modules/removeShow';
// typeSearch(searchBar);

const removeForms = document.querySelectorAll('form.remove');

Array.prototype.forEach.call( removeForms, function(element) {
     element.addEventListener('submit' , removeShow) 
});


export default removeShow;