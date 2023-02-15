'use strict';
// scroll to contact form on click

let contactForm = document.querySelector('#contactForm');
let apptForm = document.querySelector('#apptForm');
let cancelForm = document.querySelector('#cancelForm');
let contactLink = document.querySelector('#contact-us');
let scheduleLink = document.querySelector('#schedule');
let bookAppt = document.querySelector('.bookAppt');
let contactRuth = document.querySelector('.contactRuth');

// constructor for appointments
function Appointment(name, email, type, sessionStart, sessionEnd, message, date) {
  this.name = name,
  this.email = email,
  this.type = type,
  this.sessionStart = sessionStart,
  this.sessionEnd = sessionEnd,
  this.message = message,
  this.date = date;
}

let appointment_array = [];

function checkExistAppt() {
let existingAppts = localStorage.getItem('appointment_array');
if (existingAppts) {
  appointment_array = JSON.parse(localStorage.getItem('appointment_array'));
}
}

checkExistAppt();

function handleScroll(event) {
  event.preventDefault();

  if (event.target.id === 'contact-us') {
    contactRuth.classList.remove('noShow');
    bookAppt.classList.add('noShow');
    contactForm.scrollIntoView({ behavior: 'smooth' });
  }
  else if (event.target.id === 'schedule') {
    bookAppt.classList.remove('noShow');
    contactRuth.classList.add('noShow');
    apptForm.scrollIntoView({ behavior: 'smooth' });
  }

}

//
function apptHandler(event) {
  event.preventDefault();

  let newAppointment = new Appointment(
    event.target.name.value,
    event.target.email.value,
    event.target.typeOfSession.value,
    event.target.startTime.value,
    event.target.endTime.value,
    event.target.apptMessage.value,
    event.target.date.value);
  // DONE: get local storage if exists, parse, and append new appointment
  let appointment_array = getLocalStorage('appointment_array');

  appointment_array.push(newAppointment);

  // stringify the appointment array
  let stringified_array = JSON.stringify(appointment_array);

  // put back into local storage
  localStorage.setItem('appointment_array', stringified_array);

  // TODO: clear form inputs after submit
  // apptForm.reset();


  // TODO: display form submitted message
  let successMessage = document.getElementById('successMessage');

  console.log(successMessage);
  successMessage.textContent = 'Thanks, your appointment request has been scheduled!';

  successMessage.style.display = 'block';
  successMessage.style.color = 'green';
  setTimeout(function () {
    successMessage.style.display = 'none';
  }, 2000);
}

function saveToLocalStorage(appointment_array) {
  localStorage.setItem('appointment_array', JSON.stringify(appointment_array));
}

function handleCancel(event) {
  event.preventDefault();
  checkExistAppt();
  let inArray = false;
  for (let i in appointment_array) {
    if (event.target.cancel.value === appointment_array[i].email) {
      appointment_array.splice(i, 1);
      let FILTERED_ARRAY = appointment_array.filter(value => JSON.stringify(value) !== '[]');
      localStorage.clear();
      saveToLocalStorage(FILTERED_ARRAY);
      inArray = true;
    }
  }
  if (inArray === true) {
    let message = document.createElement('span');
    message.textContent = 'We have found your appointment and canceled it';
    message.style.display = 'block';
    message.style.color = 'green';
    setTimeout(function () {
      message.style.display = 'none';
    }, 2000);
    cancelForm.appendChild(message);
  }
  else {
    let message = document.createElement('span');
    message.textContent = 'No appointment found with this email address';
    message.style.display = 'block';
    message.style.color = 'green';
    setTimeout(function () {
      message.style.display = 'none';
    }, 2000);
    cancelForm.appendChild(message);
  }
}

contactLink.addEventListener('click', handleScroll);
scheduleLink.addEventListener('click', handleScroll);
cancelForm.addEventListener('submit', handleCancel);
apptForm.addEventListener('submit', apptHandler);

// returns data from local storage, if any
// takes in a "key" argument
function getLocalStorage(key) {
  // check local storage for specified key
  let dataFromStorage = localStorage.getItem(key);

  let arr = [];
  // if that key exists in local storage, parse data and update it
  if (dataFromStorage) {
    let parsedData = JSON.parse(dataFromStorage);

    arr.push(parsedData);
    return arr;
  }
  return arr;
}


// contact form JS functionality starts here

// empty array for contacts
// use 'let' to allow redeclaration if local storage contains previous contact messages
let CONTACT_ARRAY = [];

// grab form DOM element
let contactFormDom = document.getElementById('contactForm');

// constructor function to create Contact objects
function Contact(name, email, message) {
  this.name = name;
  this.email = email;
  this.message = message;
}

// event handler for contact form input
function handleContactSubmit(event) {
  event.preventDefault();
  // collect form data into variables to pass to constructor function
  let newContactName = event.target.contactName.value;
  let newContactEmail = event.target.contactEmail.value;
  let newContactMessage = event.target.contactMessage.value;
  // instantiate new object from constructor function
  let addNewContact = new Contact(newContactName, newContactEmail, newContactMessage);
  // invoke function to check local storage
  checkStorage();
  // add new contact to contact array
  CONTACT_ARRAY.push(addNewContact);
  // convert contact array to string for local storage
  let stringifyContacts = JSON.stringify(CONTACT_ARRAY);
  localStorage.setItem('contactStorage', stringifyContacts);
  let message = document.createElement('span');
  message.textContent = 'Thank you for inquiring. We will get back to you soon.';
  message.style.display = 'block';
  message.style.color = 'green';
  setTimeout(function () {
    message.style.display = 'none';
  }, 2000);
  contactForm.appendChild(message);
}

// event listener for contact form input
contactFormDom.addEventListener('submit', handleContactSubmit);

// function to check local storage for existing contact info
function checkStorage() {
  let checkLocalStorage = localStorage.getItem('contactStorage');
  // if it exists, redefine the contact array with local storage contents
  if (checkLocalStorage) {
    CONTACT_ARRAY = JSON.parse(checkLocalStorage);
    return CONTACT_ARRAY;
    // if not, return empty array
  } else {
    return CONTACT_ARRAY;
  }
}
