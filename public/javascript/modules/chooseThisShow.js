import axios from 'axios';

function chooseThisShow(e) {
    e.preventDefault();
    const show = this.id;
    axios
        .post(this.action, {showId: show})
        .then(res => { 
            console.log(res.data);
        }).catch(err =>{
            console.log(error);
        });
}


export default chooseThisShow
