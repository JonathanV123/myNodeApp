import axios from 'axios';
import dompurify from 'dompurify';

function searchResultsToHTML(shows){
    console.log(shows);
    return shows.map(show => {
        return `<a href="/createShow/${show.id}" class="searchResult">
            <span><strong>${show.name}</strong><span>
            (${show.first_air_date.slice(0, 4)})
        `;
    }).join('');
};
function typeSearch(search) {
    if(!search) return;
    const searchInput = search.querySelector('input[name="name"]');
    const searchResults = document.querySelector('.searchResults');
    searchInput.addEventListener('input', function(){
        if(!this.value){
            searchResults.style.display = "none";
            return; //stop
        }
        searchResults.style.display = 'block';
        searchResults.innerHTML = '';
        // Find alternative to API key. Exposing client side is not a good idea. Possible AJAX call or Webpack Fix
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=a0bab1433b22d4b59bf466484c131da6&query=${this.value}`)
        .then(res => {
        // Check if there is data to show
        if(res.data.results.length >= 1){
            searchResults.innerHTML = dompurify.sanitize(
                searchResultsToHTML(res.data.results));
        } else {
         // Notify nothing came back
        searchResults.innerHTML = dompurify.sanitize(`<div class="searchResult">
        No results for ${this.value} found! </div>`);
        }

        }).catch(err => {
            console.log(err);
        });
    });
}

export default typeSearch;