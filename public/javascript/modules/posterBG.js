function posterBGImage(element) {
    if (element.length == 0) return;
    element.forEach((show) => {
        const imageURL = `url(http://image.tmdb.org/t/p/w342//${show.dataset.poster}`;
        checkURL(imageURL, show);
    });

};
let checkURL = function (url, show) {
    // Check if url ends with jpg, jpeg, gif, png
    if ((url.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
        show.style.backgroundImage = url;
        // If it doesn't there is no poster image
    } else {
        show.style.backgroundImage = "url(../assets/images/noPosterAvailable.jpg)"
    }
}
export default posterBGImage;