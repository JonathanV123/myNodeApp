function backdropBGImage(element) {
    if (element.length == 0) return;
    const htmlElement = element[0];
    const backdropURL = `url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2/${htmlElement.dataset.backdrop}`;
    checkURL(backdropURL, htmlElement)
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
export default backdropBGImage;