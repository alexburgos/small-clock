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
let now, seconds, mins, hour, meridiem;

/**
  * @desc Populates a Clock element with the current time
  * current time is calculated and formatted based on a 12 hour clock (AM/PM)
  * @return null
*/

function setDate() {
  //Use local storage to get alarm time in case the user leaves the site
  let alarmTime = JSON.parse(localStorage.getItem('alarmTime'));

  //Get time
  now = new Date();
  seconds = now.getSeconds();
  mins = now.getMinutes();
  hour = now.getHours() % 12 || 12;
  meridiem = `${now.getHours() >= 12 ? 'PM' : 'AM'}`;

  //Add time to DOM elements
  secondsBlock.textContent = `${seconds < 10 ? `0${seconds}` : `${seconds}` }`;
  minsBlock.textContent = `${mins < 10 ? `0${mins}` : `${mins}`}:`;
  hourBlock.textContent = `${hour}:`;
  meridiemBlock.textContent = meridiem;

  //Compare alarm time to the current time
  if (alarmTime !== null) {
    //if the current time and the alarm time are a match, play alarm sound
    if (  hour === parseInt(alarmTime[0])
          && mins === parseInt(alarmTime[1])
          && meridiem === alarmTime[2] ) {
      clock.classList.add('Clock--alarm-active');
      alarmSound.play();
    }
  }
}

function setAlarm() {
  //spread the select option nodes into an array of time inputs we can store in browser
  let time = [...document.querySelectorAll('.Clock__field')].map( input => input.value );
  localStorage.setItem('alarmTime', JSON.stringify(time));
}

//Main

document.addEventListener('DOMContentLoaded', () => {
  setInterval( setDate , 1000);
  setDate();

  //Add event listeners and enable night shift
  alarmBtn.addEventListener('click', setAlarm);
  if (hour >= 18 || hour <= 6) document.body.classList.add('night');
});
