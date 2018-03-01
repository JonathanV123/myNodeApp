// import axios from 'axios';

// function chooseThisShow(e) {
//     e.preventDefault();
//     const radioCategory =  document.querySelector('input[name=showCategory]:checked').value
//     const comment =  document.querySelector('#userComment').value
//     const show = this.id;
//     axios
//         .post(this.action, {
//             showId: show, 
//             radioValCategory: radioCategory,
//             userComment: comment
//         })
//         .then(res => { 
//             console.log(res.data);
//             if(res.data === "Watching Now"){
//                 window.location.pathname = "/manageWatchingNow"
//             }
//             if(res.data === "Recommendations"){
//                 window.location.pathname = "/manageRecommendations"
//             }
//             if(res.data === "Must Watch"){
//                 window.location.pathname = "/manageMustWatch"
//             }
//         }).catch(err =>{
//             console.log(error);
//         });
// }


// export default chooseThisShow
