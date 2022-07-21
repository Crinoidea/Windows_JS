const images = () => {
    const worksSection = document.querySelector('.works'),
          imgPopup = document.createElement('div'),
          bigImage = document.createElement('img');
        
    imgPopup.classList.add('popup_img');
    imgPopup.classList.add('faded');

    worksSection.appendChild(imgPopup).appendChild(bigImage);

    worksSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
        }

        if (target && target.matches('div.popup_img')) {
            imgPopup.style.display = 'none';
        }

    });

};

export default images;