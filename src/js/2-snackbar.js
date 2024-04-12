import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');
const delayInp = document.querySelector('input[name="delay"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const state = event.currentTarget.elements.state.value;

    const delay = parseInt(delayInp.value);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'rejected') {
                reject(delay);
            } else {
                resolve(delay);
            }
        }, delay);
    });

    promise
        .then(() => iziToast.success({
            title: '',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight'
        }))
        .catch(() => iziToast.error({
            title: '',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight'
        }));
    
    form.reset();
}

