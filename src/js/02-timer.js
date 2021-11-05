import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let selectedTime = null;
let currentTime = null;
let timerId = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  valueDays: document.querySelector('span[data-days]'),
  valueHours: document.querySelector('span[data-hours]'),
  valueMinutes: document.querySelector('span[data-minutes]'),
  valueSeconds: document.querySelector('span[data-seconds]'),
}

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedTime = selectedDates[0];
      currentTime = new Date();

      if (selectedTime.getTime() < currentTime.getTime()) {
        refs.startBtn.setAttribute('disabled', 'disabled');
        alert("Please choose a date in the future");
        return;
      }


      refs.startBtn.removeAttribute('disabled');
      const { days, hours, minutes, seconds } = convertMs(selectedTime - currentTime);
      refs.valueDays.textContent = addLeadingZero(days);
      refs.valueHours.textContent = addLeadingZero(hours);
      refs.valueMinutes.textContent = addLeadingZero(minutes);
      refs.valueSeconds.textContent = addLeadingZero(seconds);
      clearInterval(timerId);
    },
  };
  
flatpickr('#datetime-picker', options);

refs.startBtn.setAttribute('disabled', 'disabled');
refs.startBtn.addEventListener('click', onStartClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


function onStartClick() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    if (selectedTime <= new Date()) {
      clearInterval(timerId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(selectedTime - new Date().getTime());
    refs.valueDays.textContent = addLeadingZero(days);
    refs.valueHours.textContent = addLeadingZero(hours);
    refs.valueMinutes.textContent = addLeadingZero(minutes);
    refs.valueSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
};

function addLeadingZero(number) {
  return String(number).padStart(2, '0')
};
