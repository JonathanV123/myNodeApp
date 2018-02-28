import axios from 'axios';

function darken(e) {
    e.preventDefault();
    // If night mode is activated and button is clicked again deactivate night mode
    if (this.classList.contains("nightModeActivated")) {
        this.classList.remove("nightModeActivated");
        this.classList.add("nightModeDeactivate");
        document.body.classList.remove("darken");
    } else { // Otherwise we activate night mode 
        this.classList.add("nightModeActivated");
        document.body.classList.add("darken");
    }

    axios
        .post("/nightMode")
        .then(res => {
            console.log(res.data);
            // window.location.pathname = "/manageShows"
        }).catch(err => {
            console.log(error);
        });
}

export default darken