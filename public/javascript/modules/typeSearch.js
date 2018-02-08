import axios from 'axios';
import dompurify from 'dompurify';

function searchResultsToHTML(gatherings){
    return gatherings.map(gathering => {
        return `<a href="/gathering/${gathering.slug}" class="searchResult">
            <strong>${gathering.name}</strong>
        `;
    }).join('');
};
function typeSearch(search) {
    if(!search) return;
    const searchInput = search.querySelector('input[name="search"]');
    const searchResults = document.querySelector('.searchResults');
    searchInput.addEventListener('input', function(){
        if(!this.value){
            searchResults.style.display = "none";
            return; //stop
        }
        searchResults.style.display = 'block';
        searchResults.innerHTML = '';
      
        axios.get(`/api/search?q=${this.value}`)
        .then(res => {
        searchResultsToHTML(res.data);
        // Check if there is data to show
        if(res.data.length){
            searchResults.innerHTML = dompurify.santaize(
                searchResultsToHTML(res.data));
        }
        // Notify nothing came back
        searchResults.innerHTML = dompurify.sanitize(`<div class="searchResult">
        No results for ${this.value} found! </div>`);
        }).catch(err => {
            console.log(err);
        });
    });
}

export default typeSearch;