import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]');

    checkNumInputs('input[name="user_phone"]')

    const message = {
        loading: 'Завантаження...',
        success: "Дякуємо! Скоро ми з вами зв'яжемося",
        failure: 'Виникла помилка'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        })
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                   statusMessage.textContent = message.success; 
                })
                .catch(() => {
                    statusMessage.textContent = message.failure; 
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 1000);
                    setTimeout(() => {
                        windows.forEach(item => {
                            item.style.display = 'none';
                        });
                    }, 1000);
                    for (let key in state) {
                        delete state[key];
                    }
                });
        })
    })
}

export default forms;