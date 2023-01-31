const navLinks = document.querySelectorAll("#nav-links li");

for (let i = 0; i < navLinks.length; i++) {
    const navlink = navLinks[i]
    const redUnder = navlink.querySelector(".red-under")
    const blueUnder = navlink.querySelector(".blue-under")
    navlink.addEventListener('mouseenter', function(){
        let redWidth = 0;
        let interval = setInterval(function(){
            redWidth += 4 
            redUnder.style.width = `${redWidth}%`
            if (redWidth >= 100 ) {
                clearInterval(interval)
            }
        },20)
    })
    navlink.addEventListener('mouseleave', function(){
        let blueWidth = 0;
        let interval = setInterval(function(){
            blueWidth += 4 
            blueUnder.style.width = `${blueWidth}%`
            if (blueWidth >= 100 ) {
                blueUnder.style.width = '0'
                redUnder.style.width = '0'
                clearInterval(interval)
            }
        },20)
    })
}


// diapo

// On récupère le conteneur principal du diaporama
const diapo = document.querySelector(".diapo")

// On récupère le conteneur de tous les éléments
elements = document.querySelector(".elements")

// On récupère un tableau contenant la liste des diapos
slides = Array.from(elements.children)

// On récupère les deux flèches
let next = document.querySelector("#nav-droite")
let prev = document.querySelector("#nav-gauche")

// Variables globales
let compteur = 0 // Compteur qui permettra de savoir sur quelle slide nous sommes
let timer, elements, slides, slideWidth

// On calcule la largeur visible du diaporama
slideWidth = diapo.getBoundingClientRect().width

// On met en place les écouteurs d'évènements sur les flèches
next.addEventListener("click", slideNext)
prev.addEventListener("click", slidePrev)

/**
 * Cette fonction fait défiler le diaporama vers la droite
 */
function slideNext(){
    // On incrémente le compteur
    compteur++

    // Si on dépasse la fin du diaporama, on "rembobine"
    if(compteur == slides.length){
        compteur = 0
    }

    // On calcule la valeur du décalage
    let decal = -slideWidth * compteur
    elements.style.transform = `translateX(${decal}px)`
}

/**
 * Cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev(){
    // On décrémente le compteur
    compteur--

    // Si on dépasse le début du diaporama, on repart à la fin
    if(compteur < 0){
        compteur = slides.length - 1
    }

    // On calcule la valeur du décalage
    let decal = -slideWidth * compteur
    elements.style.transform = `translateX(${decal}px)`
}


