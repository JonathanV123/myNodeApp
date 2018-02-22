import axios from 'axios';

function removeShow(e) {
    e.preventDefault();
    // This is very brittle. Look at other avenues for refactor
    const id = this.parentElement.parentElement.id;
    const show = document.getElementById(id);
    const showCategory = this.parentElement.parentElement.parentElement.className;
    console.log(showCategory);
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
