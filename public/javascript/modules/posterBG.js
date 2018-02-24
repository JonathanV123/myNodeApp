
function posterBGImage (element){
    if(element.length == 0) return;
    element.forEach((show) => {
    const imageURL = `url(http://image.tmdb.org/t/p/w185//${show.id}`;
    let checkURL = function (url) {
        // Check if url ends with jpg, jpeg, gif, png
        if((url.match(/\.(jpeg|jpg|gif|png)$/) != null)){
            show.style.backgroundImage = `url(http://image.tmdb.org/t/p/w185//${show.id})`
        // If it doesn't there is no poster image
        } else {
            show.style.backgroundImage = "url(../assets/images/noPosterAvailable.jpg)"
        }
    }      
    checkURL(imageURL);  
    });
};

export default posterBGImage;