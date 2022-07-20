import { windowWidth } from "./changeModalState";
import { windowHeight } from "./changeModalState";
import { windowProfile } from "./changeModalState";

import {addRequiredStyle} from './requiredInputStyle';
import {removeRequiredStyle} from './requiredInputStyle';

console.log(windowProfile[0].nextElementSibling);
const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              inputsCalcEnd = document.querySelectorAll('form[data-calc="end"] input');
        
        function showModal(modalSelector, displayStyle) {
            modalSelector.style.display = displayStyle;
            document.body.style.overflow = 'hidden';
        }

        function hideModal() {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target
                if (target) {
                    e.preventDefault();
                } 

                if (target.classList.contains('popup_calc_button')) {
                    if (windowWidth[0].value && windowHeight[0].value) {
                        hideModal();
                        showModal(modal, 'block');
                    } 

                    if (windowWidth[0].value) {
                        removeRequiredStyle(windowWidth[0]);
                    } else {
                        addRequiredStyle(windowWidth[0]);
                    }

                    if (windowHeight[0].value){
                        removeRequiredStyle(windowHeight[0]);
                    } else {
                        addRequiredStyle(windowHeight[0]);
                    }
                    
                } else if (target.classList.contains('popup_calc_profile_button')) {
                    if (windowProfile[0].checked || windowProfile[1].checked) {
                        hideModal();
                        showModal(modal, 'block');
                    } 

                    if (windowProfile[0].checked || windowProfile[1].checked){
                        windowProfile.forEach(item => {
                            removeRequiredStyle(item.nextElementSibling);
                        }); 
                    } else {
                        windowProfile.forEach(item => {
                            addRequiredStyle(item.nextElementSibling);
                        });
                    }                    
                } else if (target.classList.contains('popup_calc_end_btn')) {
                    if (inputsCalcEnd[0] || inputsCalcEnd[1]) {
                        hideModal();
                        showModal(modal, 'block');
                    } 

                    if (inputsCalcEnd[0] || inputsCalcEnd[1]){
                        inputsCalcEnd.forEach(item => {
                            removeRequiredStyle(item);
                        }); 
                    } else {
                        inputsCalcEnd.forEach(item => {
                            addRequiredStyle(item);
                        });
                    }   

                } else {
                    hideModal();
                    showModal(modal, 'block');
                }
            });
        });



        close.addEventListener('click', () => {     
            hideModal();
        })
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                hideModal();
            }
        })
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            showModal(document.querySelector(selector), 'block');
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    /* showModalByTime('.popup', 60000); */
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false),
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
}

export default modals;