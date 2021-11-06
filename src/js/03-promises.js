import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', checkForm);


function checkForm (event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  const firstDelay = Number(delay.value);
  const stepForm = Number(step.value);
  const amountForm = Number(amount.value);
  createPromise(firstDelay, stepForm, amountForm)
};


function createPromise(firstDelay, stepForm, amountForm ) {
  let delay = firstDelay;

  for (let position = 1; position <= amountForm; position += 1) {

      const shouldResolve = Math.random() > 0.3;
      const promise =  new Promise ((resolve, reject) => {

        if (shouldResolve) {
          resolve({ position, delay });
          // Fulfill
        } else {
          reject({ position, delay });
          // Reject
        }
    });
    promise
    .then(({ position, delay }) => {
      setTimeout(()=> {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }, delay);
    })
    .catch(({ position, delay }) => {
      setTimeout(()=> {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }, delay);
    });
    delay += stepForm;
  }
};



// const refs = {
//   createBtn: document.querySelector('button'),
//   inputDelay: document.querySelector('input[name="delay"]'),
//   inputStep: document.querySelector('input[name="step"]'),
//   inputAmount: document.querySelector('input[name="amount"]'),
// };
