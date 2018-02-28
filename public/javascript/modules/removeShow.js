import axios from 'axios';

function removeShow(e) {
    e.preventDefault();
    const id = this.dataset.identity
    const show = document.getElementById(id);
    const showCategory = this.dataset.category;
    axios
        .post(this.action, {category: showCategory})
        .then(res => { 
            // Remove from DOM
            show.remove();
        }).catch(err =>{
            console.log(error);
        });
}


export default removeShow
