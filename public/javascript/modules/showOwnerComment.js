function showOwnerComment(e) {
    e.preventDefault();
    const ownerDescriptionElement = this.nextElementSibling;
    ownerDescriptionElement.classList.remove('hidden');
}



export default showOwnerComment;