import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

startBtn.addEventListener("click", handleClick);
document.addEventListener("DOMContentLoaded", () => {
    startBtn.disabled = true;
});

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        console.log(userSelectedDate);
        const currentTime = new Date();
        if (userSelectedDate < currentTime) {
            startBtn.disabled = true;

            iziToast.error({
                title: '',
                message: 'Please choose a date in the future',
                position: 'topRight'
            });

        } else {
            startBtn.disabled = false;
        }
    },
};

flatpickr(datetimePicker, options);

let timerInterval;

function handleClick() {
    startBtn.disabled = true;
    datetimePicker.disabled = true;
    clearInterval(timerInterval);
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = new Date().getTime();
    const selectedDate = userSelectedDate.getTime();
    const timeDifference = selectedDate - now;
    if (timeDifference <= 0) {
        clearInterval(timerInterval);
        startBtn.disabled = false;
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}