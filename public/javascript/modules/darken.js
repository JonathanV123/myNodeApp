import axios from 'axios';

function darken(e) {
    e.preventDefault();
    // If night mode is activated and button is clicked again deactivate night mode
    if (this.classList.contains("sunOut")) {
        this.classList.remove("nightModeActivated");
        this.classList.add("nightModeDeactivate");
        this.classList.remove("sunOut");
        document.body.classList.remove("darken");
    } else { // Otherwise we activate night mode 
        this.classList.add("nightModeActivated");
        document.body.classList.add("darken");
        this.classList.add("sunOut");
    }

    axios
        .post("/nightMode")
        .then(res => {
        }).catch(err => {
            console.log("Night Mode Failed");
        });
}

export default darken