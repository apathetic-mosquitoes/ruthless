// scroll to contact form on click

let contactForm = document.querySelector('#contactForm');
let apptForm = document.querySelector('#apptForm');
let contactLink = document.querySelector('#contact-us');
let scheduleLink = document.querySelector('#schedule');

function handleScroll(event){
    event.preventDefault();
    if (event.target.id === 'contact-us') {
        contactForm.scrollIntoView({behavior: "smooth"})
    }
    else if (event.target.id === 'schedule'){
        apptForm.scrollIntoView({behavior: "smooth"})
    }

}

contactLink.addEventListener('click', handleScroll);
scheduleLink.addEventListener('click', handleScroll);
