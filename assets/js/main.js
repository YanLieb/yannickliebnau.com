// Animation on burger-button.

let toggleButton = document.getElementById('toggle-button');
document.getElementById('middle-line').style.opacity = '1';
document.getElementById('top-line').style.transform = 'rotate(0)';
document.getElementById('bottome-line').style.transform = 'rotate(0)';


toggleButton.addEventListener('click', function () {
    let topLine = document.getElementById('top-line'),
        middleLine = document.getElementById('middle-line'),
        bottomLine = document.getElementById('bottome-line');
    
    if (middleLine.style.opacity == '1') {
        middleLine.style.opacity = "0";
        topLine.style.transform = 'rotate(45deg)';
        bottomLine.style.transform = 'rotate(-45deg)';
    } else {
        middleLine.style.opacity = "1";
        topLine.style.transform = 'rotate(0)';
        bottomLine.style.transform = 'rotate(0)';
    }
});
    

// Scroll Animation on header 
window.addEventListener('scroll', function () {
    let headerLogo = document.getElementById('header-logo'),
        header = document.getElementById('header'),
        menuLine = document.getElementById('navbarNav');

    if (this.window.scrollY > 300) {
        headerLogo.style.opacity = '1';
        header.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        menuLine.style.justifyContent = 'flex-end';
    } else {
        headerLogo.style.opacity = '0';
        header.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 75%)';
        menuLine.style.justifyContent = 'center';
    }
});

// Scroll Animation on main logo
window.addEventListener('scroll', function () {
    let value = window.scrollY;
    let lettreY = document.getElementById('lettreY'),
        lettreL = document.getElementById('lettreL');
    
    lettreY.style.top = -value * 0.2 + 'px';
    lettreL.style.bottom = value * 0.4 + 'px';
});



// Animation on Profile Picture

let animationCarousel = setInterval(activeCarousel, 1500);

function activeCarousel() {
   
    let activePhoto = document.getElementById('about-photo').getAttribute('data-photo');
    console.log(activePhoto);
    if (activePhoto == 'photo1') {
        document.getElementById('photo1').style.opacity = "0";
        document.getElementById('photo2').style.opacity = "1";
        document.getElementById('about-photo').setAttribute('data-photo', 'photo2');
    } else if (activePhoto == 'photo2') {
        document.getElementById('photo2').style.opacity = "0";
        document.getElementById('photo3').style.opacity = "1";
        document.getElementById('about-photo').setAttribute('data-photo', 'photo3'); 
    } else if (activePhoto == 'photo3') {
        document.getElementById('photo3').style.opacity = "0";
        document.getElementById('photo4').style.opacity = "1";
        document.getElementById('about-photo').setAttribute('data-photo', 'photo4'); 
    }else if (activePhoto == 'photo4') {
        document.getElementById('photo4').style.opacity = "0";
        document.getElementById('photo5').style.opacity = "1";
        document.getElementById('about-photo').setAttribute('data-photo', 'photo5'); 
    } else {
        document.getElementById('photo5').style.opacity = "0";
        document.getElementById('photo1').style.opacity = "1";
        document.getElementById('about-photo').setAttribute('data-photo', 'photo1'); 
    }

}

// email check in contact form

// let userMail = document.getElementById('mail');
// let sendMail = document.getElementById('send');

// sendMail.addEventListener('click', function (e) {
//     e.preventDefault();
//     let email = userMail.value;
//     if (validateEmail(email)) {
//         window.alert("Merci, votre mail a bien été envoyé! :)");
//     } else {
//         window.alert("Désolé, votre adresse mail n'est pas valide :(");
//     }
// });

// function validateEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

function validateForm() {
    let name = document.forms["contactForm"]["name"];
    let email = document.forms["contactForm"]["email"];
    let message = document.forms["contactForm"]["message"];

    if (name.value == "") {
        document.getElementById("errorname").innerHTML = "Veuillez entrer votre prénom & nom."
        name.focus();
        return false;
    } else {
        document.getElementById("errorname").innerHTML = "";
    }

    if ((email.value == "") || (email.value.indexOf("@", 0) < 0) || (email.value.indexOf(".", 0) < 0) ) {
        document.getElementById("erroremail").innerHTML = "Veuillez entrer une adresse mail valide."
        email.focus();
        return false;
    } else {
        document.getElementById("erroremail").innerHTML = "";
    }

    if (message.value == "") {
        document.getElementById("errormsg").innerHTML = "Quelques lignes sur la raison de votre message m'aideront à mieux vous répondre :)";
        message.focus();
        return false;
    } else {
        document.getElementById("errormsg").innerHTML = "";
    }

    return true;
}