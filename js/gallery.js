let weddingButton = document.querySelector('#weddingsButton');
let portraitButton = document.querySelector('#portraitsButton');
let maternityButton = document.querySelector('#maternityButton');
let weddingSection = document.querySelector('.weddings');
let portraitSection = document.querySelector('.Portraits');
let maternitySection = document.querySelector('.Maternity');

let topic = window.location.href;
console.log(topic);


portraitButton.addEventListener('click', handlePortraitClick);
weddingButton.addEventListener('click', handleWeddingClick);
maternityButton.addEventListener('click', handleMaternityClick);

function handlePortraitClick(event){
    // remove class "no-show" from portrait section
    portraitSection.classList.remove('no-show');
    // add class "no-show" to wedding and maternity section
    weddingSection.classList.add('no-show');
    maternitySection.classList.add('no-show');
};

function handleWeddingClick(event){
    // remove class "no-show" from wedding section
    weddingSection.classList.remove('no-show');
    // add class "no-show" to portrait and maternity section
    portraitSection.classList.add('no-show');
    maternitySection.classList.add('no-show');
};

function handleMaternityClick(event){
    // remove class "no-show" from maternity section
    maternitySection.classList.remove('no-show');
    // add class "no-show" to portrait and wedding section
    portraitSection.classList.add('no-show');    
    weddingSection.classList.add('no-show');  
};

window.onscroll = function(){scrollFunction()};
function scrollFunction(){
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector('h1').style.fontSize = '30px';
  } else {
    document.querySelector('h1').style.fontSize = '4rem';
  }
}
function pageLoad() {
    if (topic.includes('#')){
        let userSelection = topic.split('#')[1];
        console.log(userSelection);
        if (userSelection === 'portraits') {
            handlePortraitClick();
        }
        else if (userSelection === 'weddings') {
            handleWeddingClick();
        }
        else if (userSelection === 'maternity') {
            handleMaternityClick();
        }
    }
}

pageLoad();
