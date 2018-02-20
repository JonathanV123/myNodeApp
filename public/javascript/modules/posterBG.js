
function posterBGImage (element){
    if(element.length == 0) return;
    console.log('running show poster func');
    element.forEach((show) => { 
        show.style.backgroundImage = `url(http://image.tmdb.org/t/p/w185//${show.id}`
    });

};

export default posterBGImage;