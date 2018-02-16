import axios from 'axios';

function removeShow(e) {
    e.preventDefault();
    const showId = this.id;
    const showBeingRemoved = document.getElementsByClassName(showId);
    const name = showBeingRemoved[0].parentElement.className;
    axios
        .post(this.action, {category: name})
        .then(res => { 
            // Remove from DOM
            showBeingRemoved[0].remove();
        }).catch(err =>{
            console.log(error);
        });
}


export default removeShow
