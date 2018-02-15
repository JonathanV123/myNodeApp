import axios from 'axios';
function acceptFriendRequest(e) {
    e.preventDefault();
    axios
        .post(this.action)
        .then(res => { 
           console.log(res.data);
        }).catch(err =>{
            console.log(error);
        });
}



export default acceptFriendRequest