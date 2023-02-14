'use strict';
// scroll to contact form on click

let contactForm = document.querySelector('#contactForm');
let apptForm = document.querySelector('#apptForm');
let cancelForm = document.querySelector('#cancelForm');
let contactLink = document.querySelector('#contact-us');
let scheduleLink = document.querySelector('#schedule');

//let contacts = [];
let appts = [];

function handleScroll(event){
  event.preventDefault();
  if (event.target.id === 'contact-us') {
    contactForm.scrollIntoView({behavior: "smooth"});
  }
  else if (event.target.id === 'schedule'){
    apptForm.scrollIntoView({behavior: "smooth"});
  }

}

function saveToLocalStorage(arr){
  localStorage.setItem('appts', JSON.stringify(arr));
}

function handleCancel(event){
  event.preventDefault();
  let inArray = false;
  for(let i in appts){
    if(event.target.cancel.value === appts[i].email){
      appts.splice(i, 1);
      localStorage.clear();
      saveToLocalStorage(appts);
      inArray = true;
    }
  }
  if(inArray===true){
    let message = document.createElement('span');
    message.textContent = 'We have found your appointment and canceled it';
    cancelForm.appendChild(message);
  }
  else{
    let message = document.createElement('span');
    message.textContent = 'No appointment found with this email address';
    cancelForm.appendChild(message);
  }
}

contactLink.addEventListener('click', handleScroll);
scheduleLink.addEventListener('click', handleScroll);
cancelForm.addEventListener('submit', handleCancel);
