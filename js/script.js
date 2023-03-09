/*
Consegna:
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.

Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.

BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/


// - richiamo dal Dom l'elemento in cui inserirò l'immagine principale
let carouselElement = document.getElementById('carousel');
// - richiamo dal Dom l'elemento immagine principale a cui cambierò l'rsc
let carouselActiveImgElement = document.getElementById('carousel-active-img');
// - richiamo dal Dom l'elemento in cui inserirò le anteprime delle immagini
let previewCardsElement = document.getElementById('preview-cards');
// - richiamo dal Dom l'elemento bottone alto per poterlo modificare
let startArrowElement = document.getElementById('start-arrow');
// - richiamo dal Dom l'elemento bottone basso per poterlo modificare
let endArrowElement = document.getElementById('end-arrow');


// modifico lo stile e la posizione del bottone laterale alto per cambiare immagine
startArrowElement.style.position = 'absolute';
startArrowElement.style.left = '50%';
startArrowElement.style.top = '2%';
startArrowElement.style.fontSize = '1.3em';
startArrowElement.style.border = '1px solid grey';
startArrowElement.style.zIndex = '1';
startArrowElement.style.backgroundColor = 'white';
startArrowElement.style.borderRadius = '6px'

// modifico lo stile e la posizione del bottone laterale basso per cambiare immagine
endArrowElement.style.position = 'absolute';
endArrowElement.style.left = '50%';
endArrowElement.style.bottom = '2%';
endArrowElement.style.fontSize = '1.3em';
endArrowElement.style.border = '1px solid grey';
endArrowElement.style.zIndex = '1';
endArrowElement.style.backgroundColor = 'white';
endArrowElement.style.borderRadius = '6px'


// - importo l'array di ogetti fornitoci
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];


// creo un ciclo per appendere nella parte laterale le 6 anteprime immagini
for (i = 0; i < images.length; i++) {

    // - creo un'immagine anteprima modificandone anche lo stile
    let currentImage = document.createElement('img');
    currentImage.src = images[i].image;
    currentImage.style.height = 'calc(40vw / 5)';
    currentImage.style.width = '100%';
    currentImage.style.objectFit = 'cover';
    currentImage.classList.add('card-opacity');
    previewCardsElement.append(currentImage);
}

// imposto un indice che utilizzerò per manipolare src dell'immagine
let index = 0;

// creo un elemento in posizione assoluta in cui inserirò il nome dell'immagine
let nameInside = document.createElement('div');
nameInside.innerHTML = images[index].title;
nameInside.style.position = 'absolute';
nameInside.style.right = '5%';
nameInside.style.top = '70%';
nameInside.style.color = 'white';
nameInside.style.fontWeight = '600';
nameInside.style.fontSize = '1em';
nameInside.style.textAlign = 'right';
carouselElement.append(nameInside);

// creo un elemento in posizione assoluta in cui inserirò il text dell'immagine
let textInside = document.createElement('div');
textInside.innerHTML = images[index].text;
textInside.style.position = 'absolute';
textInside.style.right = '5%';
textInside.style.top = '80%';
textInside.style.width = '90%';
textInside.style.color = 'white';
textInside.style.textAlign = 'right';
carouselElement.append(textInside);

// - seleziono nel Dom la prima anteprima immagine e gli dò la classe per togliere l'opacità
document.getElementsByClassName('card-opacity')[index].classList.add('selected-card');


// - creo un evento click sul bottone alto laterale
endArrowElement.addEventListener('click', () => {

    // - rimuovo la classe per togliere l'opacità all'immagine di partenza
    document.getElementsByClassName('card-opacity')[index].classList.remove('selected-card');

    // - aggiungo un unità all'indice
    index++

    // - condizione di ciclicità infinita
    if (index == images.length) {

        index = 0;
    }

    // - aggiungo la classe per togliere l'opacità all'immagine successiva
    document.getElementsByClassName('card-opacity')[index].classList.add('selected-card');

    // - cambio l'indice dell'immagine principale -> cambio l'immagine principale
    carouselActiveImgElement.src = images[index].image;

    // - cambio il titolo dell'immagine
    nameInside.innerHTML = images[index].title;

    // - cambio il testo dell'immagine
    textInside.innerHTML = images[index].text;
})


// - creo un evento click sul bottone laterale basso
startArrowElement.addEventListener('click', () => {

    // - rimuovo la classe per togliere l'opacità all'immagine di partenza
    document.getElementsByClassName('card-opacity')[index].classList.remove('selected-card');

    // - diminuisco un unità all'indice
    index--

    // - condizione di ciclicità infinita
    if (index == -1) {

        index = images.length - 1;
    }

    // - aggiungo la classe per togliere l'opacità all'immagine precedente
    document.getElementsByClassName('card-opacity')[index].classList.add('selected-card');

    // - cambio l'indice dell'immagine principale -> cambio l'immagine principale
    carouselActiveImgElement.src = images[index].image;

    // - cambio il titolo dell'immagine
    nameInside.innerHTML = images[index].title;

    // - cambio il testo dell'immagine
    textInside.innerHTML = images[index].text;
})