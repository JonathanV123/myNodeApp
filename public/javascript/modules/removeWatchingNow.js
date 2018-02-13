import axios from 'axios';

function removeFromWatchingNow(e) {
    e.preventDefault();
    axios
        .post(this.action)
        .then(res => {
            console.log(this);
            console.log(this.className)
        }).catch(err =>{
            console.log(error);
        });
}

export default removeFromWatchingNow