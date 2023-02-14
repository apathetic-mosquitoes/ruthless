// scroll to contact form on click

let contactForm = document.querySelector('#contactForm');
let apptForm = document.querySelector('#apptForm');
let contactLink = document.querySelector('#contact-us');
let scheduleLink = document.querySelector('#schedule');
let submitApptButton = document.querySelector("#submit-appt")
let APPOINTMENT_ARRAY = []
// constructor for appointments
function Appointment (name, email, type, sessionStart, sessionEnd, message, date) {
    this.name = name,
    this.email = email,
    this.type = type,
    this.sessionStart = sessionStart,
    this.sessionEnd = sessionEnd, 
    this.message = message,
    this.date = date
}


function handleScroll(event){
    event.preventDefault();
    if (event.target.id === 'contact-us') {
        contactForm.scrollIntoView({behavior: "smooth"})
    }
    else if (event.target.id === 'schedule'){
        apptForm.scrollIntoView({behavior: "smooth"})
    }

}

// 
function apptHandler(event){
    event.preventDefault()

    let newAppointment = new Appointment(
        event.target.name.value,
        event.target.email.value,
        event.target.typeOfSession.value,
        event.target.startTime.value,
        event.target.endTime.value,
        event.target.apptMessage.value,
        event.target.date.value,
    )
    // DONE: get local storage if exists, parse, and append new appointment
    let appointment_array = getLocalStorage('appointment_array')
    
    appointment_array.push(newAppointment)
    
    // stringify the appointment array
    let strinfied_array = JSON.stringify(appointment_array)

    // put back into local storage
    localStorage.setItem("appointment_array", strinfied_array)

    // TODO: clear form inputs after submit
    apptForm.reset()


    // TODO: display form submitted message
    let successMessage = document.getElementById('successMessage')

    console.log(successMessage)
    successMessage.textContent = "Thanks, your appointment request has been scheduled!"

    successMessage.style.display = 'block';
    successMessage.style.color = 'green';
    setTimeout(function(){
        successMessage.style.display = 'none';
    }, 2000)

}

contactLink.addEventListener('click', handleScroll);
scheduleLink.addEventListener('click', handleScroll);
apptForm.addEventListener('submit', apptHandler);

// returns data from local storage, if any
// takes in a "key" argument
function getLocalStorage(key) {
    // check local storage for specified key
    let dataFromStorage = localStorage.getItem(key)

    let arr = []
    // if that key exists in local storage, parse data and update it
    if (dataFromStorage) {
        let parsedData = JSON.parse(dataFromStorage)

        arr.push(parsedData)
        return arr
    }
    return arr
}





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