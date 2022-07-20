
function addRequiredStyle(inputElem) {
    inputElem.classList.add('input_border_required');
}

function removeRequiredStyle(inputElem) {
    inputElem.classList.remove('input_border_required');
}

export {addRequiredStyle};
export {removeRequiredStyle};