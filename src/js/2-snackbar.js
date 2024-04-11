import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');
const delayInp = document.querySelector('input[name="delay"]');
const fulfilled = document.querySelector('input[value="fulfilled"]');
const rejected = document.querySelector('input[value="rejected"]');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', handleClick);

function handleClick(event) {
    event.preventDefault();

    const delay = parseInt(delayInp.value);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (rejected.checked) {
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

