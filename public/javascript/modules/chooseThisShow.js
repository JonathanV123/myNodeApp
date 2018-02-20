import axios from 'axios';

function chooseThisShow(e) {
    e.preventDefault();
    console.log('running!');
    const showChoice = document.querySelectorAll('.chooseShow');
    const name = showChoice[0].parentElement;
    console.log(showChoice);
    console.log(name);
    axios
        .post(this.action)
        .then(res => { 
            console.log('hi!');
        }).catch(err =>{
            console.log(error);
        });
}


export default chooseThisShow
