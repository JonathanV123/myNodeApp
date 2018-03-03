function exitComment(e) {
    e.stopPropagation();
    const ownerDescription = this.parentElement;
    ownerDescription.classList.add("hidden");
}



export default exitComment;