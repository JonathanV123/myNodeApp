import axios from 'axios';
function removeFromWatchingNow(e) {
    e.preventDefault();
    const showId = this.id;
    var showBeingRemoved = document.getElementsByClassName(showId);
    console.log(showBeingRemoved.parentElement.nodeName);
    axios
        .post(this.action)
        .then(res => { 
            // Remove from DOM
            // showBeingRemoved[0].remove();
        }).catch(err =>{
            console.log(error);
        });
}



export default removeFromWatchingNow