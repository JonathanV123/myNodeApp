function exitComment(e) {
    e.stopPropagation();
    console.log("Exit comment is firing");
    const ownderDescription = this.parentElement;
    ownderDescription.classList.add("hidden");
}



export default exitComment;