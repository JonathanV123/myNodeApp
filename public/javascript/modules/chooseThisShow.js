import axios from 'axios';

function chooseThisShow(e) {
    e.preventDefault();
    const radioReview = document.querySelector('input[name=tags]:checked').value
    const radioCategory =  document.querySelector('input[name=showCategory]:checked').value
    const show = this.id;
    console.log(this)
    axios
        .post(this.action, {showId: show, radioValReview: radioReview, radioValCategory: radioCategory})
        .then(res => { 
            console.log(res.data);
            // window.location.pathname = "/manageShows"
        }).catch(err =>{
            console.log(error);
        });
}


export default chooseThisShow
