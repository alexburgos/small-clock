'use strict';

//import styles
import '../styles/base.css';
import '../styles/clock.css';

const clock = document.querySelector('.Clock');
const secondsBlock = document.querySelector('.Clock__seconds');
const minsBlock = document.querySelector('.Clock__mins');
const hourBlock = document.querySelector('.Clock__hour');
const meridiemBlock = document.querySelector('.Clock__meridiem');
const alarmSound = document.querySelector('#alarm-sound');
const alarmBtn = document.querySelector('.Clock__button');
let now, seconds, mins, hour;

/*

*/

function setDate() {
  //Use local storage to get alarm time in case the user leaves the site
  let alarmTime = JSON.parse(localStorage.getItem('alarmTime'));
  now = new Date();
  seconds = now.getSeconds();
  mins = now.getMinutes();
  hour = now.getHours();


  secondsBlock.textContent = `${seconds < 10 ? `0${seconds}` : `${seconds}` }`;
  minsBlock.textContent = `${mins < 10 ? `0${mins}` : `${mins}`}:`;
  hourBlock.textContent = `${hour > 12 ? hour - 12 : hour}:`;
  meridiemBlock.textContent = `${hour > 12 ? 'PM' : 'AM'}`;

  if (alarmTime !== null) {
    if ( (hour - 12 ) === parseInt(alarmTime[0]) && mins === parseInt(alarmTime[1]) ) {
      clock.classList.add('Clock--alarm-active');
      alarmSound.play();
    }
  }
}

function enableNightShift() {
  document.body.classList.add('night');
  clock.classList.add('Clock--night');
}

function setAlarm() {
  let time = [...document.querySelectorAll('.Clock__field')].map( input => input.value );
  localStorage.setItem('alarmTime', JSON.stringify(time));
}

setInterval( setDate , 1000);
setDate();

//Add event listeners and enable night shift
alarmBtn.addEventListener('click', setAlarm);
if (hour >= 18) enableNightShift();
