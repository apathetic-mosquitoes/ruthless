// scroll to contact form on click

let contactForm = document.querySelector('#contactForm');
let apptForm = document.querySelector('#apptForm');
let contactLink = document.querySelector('#contact-us');
let scheduleLink = document.querySelector('#schedule');

function handleScroll(event) {
  event.preventDefault();
  if (event.target.id === 'contact-us') {
    contactForm.scrollIntoView({ behavior: "smooth" })
  }
  else if (event.target.id === 'schedule') {
    apptForm.scrollIntoView({ behavior: "smooth" })
  }

}

contactLink.addEventListener('click', handleScroll);
scheduleLink.addEventListener('click', handleScroll);


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
  // console log new contact object
  console.log(addNewContact);
  // invoke function to check local storage
  checkStorage();
  // add new contact to contact array
  CONTACT_ARRAY.push(addNewContact);
  // convert contact array to string for local storage
  let stringifyContacts = JSON.stringify(CONTACT_ARRAY);
  localStorage.setItem('contactStorage', stringifyContacts);
}

// event listener for contact form input
contactFormDom.addEventListener('submit', handleContactSubmit);

// function to check local storage for existing contact info
function checkStorage() {
  let checkLocalStorage = localStorage.getItem('contactStorage');
  // if it exists, redefine the contact array with local storage contents
  if (checkLocalStorage) {
    console.log(checkLocalStorage);
    CONTACT_ARRAY = JSON.parse(checkLocalStorage);
    console.log(CONTACT_ARRAY);
    return CONTACT_ARRAY;
  // if not, return empty array
  } else {
    console.log('nothing in local storage');
    return CONTACT_ARRAY;
  }
}
