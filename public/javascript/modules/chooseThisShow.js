import axios from 'axios';

function chooseThisShow(e) {
    e.preventDefault();
    const radioCategory =  document.querySelector('input[name=showCategory]:checked').value
    const comment =  document.querySelector('#userComment').value
    const show = this.id;
    axios
        .post(this.action, {
            showId: show, 
            radioValCategory: radioCategory,
            userComment: comment
        })
        .then(res => { 
            console.log(res.data);
            // window.location.pathname = "/manageShows"
        }).catch(err =>{
            console.log(error);
        });
}


export default chooseThisShow
