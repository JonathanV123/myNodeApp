function showOwnerComment(e) {
    e.preventDefault();
    const ownerDescriptionElement = this.childNodes[1];
    const ownerDescription = this.childNodes[1].classList;
    console.log("Owner Comment Is Firing");
    ownerDescription.remove('hidden');
}



export default showOwnerComment;