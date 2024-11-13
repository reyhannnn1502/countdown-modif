// app.js

// Elements for displaying the countdown
const daysElement = document.querySelector('.days');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const items = [daysElement, hoursElement, minutesElement, secondsElement]; // Array for animation

// Initialize countdown deadline
let countdownDate = new Date(2020, 3, 24, 8, 0, 0).getTime(); // Default date
let countdown; // Store interval for countdown

// Function to toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Function to animate countdown
function animateCountdown() {
  items.forEach((item) => {
    item.classList.add('animate');
    setTimeout(() => item.classList.remove('animate'), 300);
  });
}

// Function to set dynamic background color
function setDynamicBackground() {
  const remaining = countdownDate - new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  document.body.classList.toggle('bg-dynamic', remaining < oneDay * 3);
}

// Function to reset countdown to default date
function resetCountdown() {
  countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 10);
  countdownDate.setHours(8, 0, 0, 0);
  clearInterval(countdown);
  startCountdown();
}

// Function to play sound when countdown ends
function playEndSound() {
  const audio = new Audio('https://www.soundjay.com/button/sounds/button-10.mp3');
  audio.play();
}

// Function to show notification on countdown end
function showNotification() {
  if (Notification.permission === "granted") {
    new Notification("The countdown has ended!");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("The countdown has ended!");
      }
    });
  }
}

// Function to update countdown date based on user input
function updateCountdown() {
  const inputDate = document.getElementById('countdown-date').value;
  const now = new Date();
  
  // Validate input date
  if (inputDate && new Date(inputDate) > now) {
    countdownDate = new Date(inputDate).getTime();
    clearInterval(countdown);
    startCountdown();
  } else {
    alert("Please enter a valid future date and time.");
  }
}

// Function to start the countdown
function startCountdown() {
  countdown = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = countdownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the results in the corresponding elements
    daysElement.textContent = days >= 0 ? days : 0;
    hoursElement.textContent = hours >= 0 ? hours : 0;
    minutesElement.textContent = minutes >= 0 ? minutes : 0;
    secondsElement.textContent = seconds >= 0 ? seconds : 0;

    // If countdown is over, stop the interval
    if (timeLeft <= 0) {
      clearInterval(countdown);
      daysElement.textContent = 0;
      hoursElement.textContent = 0;
      minutesElement.textContent = 0;
      secondsElement.textContent = 0;
      document.querySelector('.giveaway').textContent = "The giveaway has ended!";
      
      // Trigger end sound and notification
      playEndSound();
      showNotification();
    } else {
      // Apply animations and dynamic background during countdown
      animateCountdown();
      setDynamicBackground();
    }
  }, 1000); // Update every second
}

// Initialize notification permission
if (Notification.permission !== "granted" && Notification.permission !== "denied") {
  Notification.requestPermission();
}

// Start the initial countdown with the default date
startCountdown();
