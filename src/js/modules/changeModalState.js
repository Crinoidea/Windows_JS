import checkNumInputs from "./checkNumInputs";

const windowWidth = document.querySelectorAll('#width'),
      windowHeight = document.querySelectorAll('#height'),
      windowForm = document.querySelectorAll('.balcon_icons_img'),
      windowType = document.querySelectorAll('#view_type'),
      windowProfile = document.querySelectorAll('.checkbox');

const changeModalState = (state) => {
    
    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems (event, elem, prop) {    
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' :
                        state[prop] = i;
                        break;
                    case 'INPUT' :
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодне" : state[prop] = "Тепле";
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }

                console.log(state);

            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;
export {windowWidth};
export {windowHeight};
export {windowProfile};
