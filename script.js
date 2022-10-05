// Constantes de liens fetch
const url = "http://localhost:8000/api/v1/"
const uriAllTopRated = 'titles/?sort_by=-imdb_score'
const uriActionTopRated = 'titles/?genre_contains=action&sort_by=-imdb_score'
const uriThrillerRated = 'titles/?genre_contains=thriller&sort_by=-imdb_score'
const uriComedyRated = 'titles/?genre_contains=comedy&sort_by=-imdb_score'

// Constantes html
const bestMovieTitle = document.getElementsByClassName("bestMovieTitle")
const bestMovieDesc = document.getElementsByClassName("bestMovieDesc")
const bestMovieImage = document.getElementsByClassName("bestMovieImage")
const bestMovieInfo = document.getElementsByClassName("bestMovieInfo")
const highestScoresMoviesImage = document.getElementsByClassName("highestScoresMoviesImage")
const actionMoviesImage = document.getElementsByClassName("actionMoviesImage")
const thrillerMoviesImage = document.getElementsByClassName("thrillerMoviesImage")
const comedyMoviesImage = document.getElementsByClassName("comedyMoviesImage")

// carousels
var slide = document.getElementsByClassName("slide");
var leftArrow = document.querySelectorAll(".carousel__left");
var rightArrow = document.querySelectorAll(".carousel__right");

document.querySelectorAll(".carousel__right").forEach(item => {
    item.addEventListener('click', event => {
        item.parentElement.getElementsByTagName("div")[0].scrollBy(312,0);
    })
})

document.querySelectorAll(".carousel__left").forEach(item => {
    item.addEventListener('click', event => {
        item.parentElement.getElementsByTagName("div")[0].scrollBy(-312,0);
    })
})

//meilleur film + 4 preimers films les mieux notés
fetch(url + uriAllTopRated)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // meilleur film
        bestMovieImage[0].setAttribute("src", data.results[0].image_url)
        bestMovieImage[0].setAttribute("alt", "Affiche du film " + data.results[0].title)
        bestMovieTitle[0].textContent = data.results[0].title
        fetch(url + "titles/" + data.results[0].id)
            .then(response => response.json())
            .then(data => {
                bestMovieDesc[0].textContent = data.description
                bestMovieInfo[0].setAttribute("target", data.url)
            })
        
        // films les mieux notés
        for (let i=0; i<4; i++) {
            highestScoresMoviesImage[i].setAttribute("src", data.results[i+1].image_url)
            highestScoresMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i+1].title)
            highestScoresMoviesImage[i].setAttribute("target", data.results[i+1].url)
        }
    })

// suite des meilleurs films les mieux notés (3)
fetch(url + uriAllTopRated + "&page=2")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=4; i<7; i++) {
            highestScoresMoviesImage[i].setAttribute("src", data.results[i-4].image_url)
            highestScoresMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i-4].title)
            highestScoresMoviesImage[i].setAttribute("target", data.results[i-4].url)
        }
    })

// 5 films d'action les mieux notés
fetch(url + uriActionTopRated)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=0; i<5; i++) {
            actionMoviesImage[i].setAttribute("src", data.results[i].image_url)
            actionMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i].title)
            actionMoviesImage[i].setAttribute("target", data.results[i].url)
        }
    })

// suite des films d'action les mieux notés (2)
fetch(url + uriActionTopRated + "&page=2")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=5; i<7; i++) {
            actionMoviesImage[i].setAttribute("src", data.results[i-5].image_url)
            actionMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i-5].title)
            actionMoviesImage[i].setAttribute("target", data.results[i-5].url)
        }
    })

// 5 films thriller les mieux notés
fetch(url + uriThrillerRated)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=0; i<5; i++) {
            thrillerMoviesImage[i].setAttribute("src", data.results[i].image_url)
            thrillerMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i].title)
            thrillerMoviesImage[i].setAttribute("target", data.results[i].url)
        }
    })

// suite des films thriller les mieux notés (2)
fetch(url + uriThrillerRated + "&page=2")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=5; i<7; i++) {
            thrillerMoviesImage[i].setAttribute("src", data.results[i-5].image_url)
            thrillerMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i-5].title)
            thrillerMoviesImage[i].setAttribute("target", data.results[i-5].url)
        }
    })

// 5 comédies les mieux notés
fetch(url + uriComedyRated)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=0; i<5; i++) {
            comedyMoviesImage[i].setAttribute("src", data.results[i].image_url)
            comedyMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i].title)
            comedyMoviesImage[i].setAttribute("target", data.results[i].url)
        }
    })

// suite des comédies les mieux notés (2)
fetch(url + uriComedyRated + "&page=2")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=5; i<7; i++) {
            comedyMoviesImage[i].setAttribute("src", data.results[i-5].image_url)
            comedyMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i-5].title)
            comedyMoviesImage[i].setAttribute("target", data.results[i-5].url)
        }
    })

// Fenetre modal
var modal = document.getElementById("modalWindow");
var btn = document.getElementsByClassName("bestMovieInfo")[0];
var span = document.getElementsByClassName("close")[0];

document.querySelectorAll(".category__item").forEach(item => {
    item.addEventListener('click', event => {
        console.log(item.getAttribute("target"))
        modalInfos(item.getAttribute("target"))
    })
})
btn.onclick = function() {
    modalInfos(btn.getAttribute("target"))
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function modalInfos(target) {
    const image = document.getElementById("modal-image");
    const title = document.getElementById("modal-title");
    const category = document.getElementById("modal-category");
    const date = document.getElementById("modal-date");
    const rate = document.getElementById("modal-rate");
    const lmdb = document.getElementById("modal-lmdb");
    const director = document.getElementById("modal-director");
    const actor = document.getElementById("modal-actor");
    const duration = document.getElementById("modal-duration");
    const country = document.getElementById("modal-country");
    const boxoffice = document.getElementById("modal-boxoffice");
    const summary = document.getElementById("modal-summary");
    fetch(target)
        .then(response => response.json())
        .then(data => {
            modal.style.display = "block";
            console.log(data)
            image.setAttribute("src", data.image_url)
            image.setAttribute("alt", "Affiche du film " + data.title)
            title.innerHTML = "<strong>Titre : </strong>" + data.title;
            category.innerHTML = "<strong>Genres :</strong>";
            for(let i=0;i<data.genres.length;i++){
                category.innerHTML += "<li>" + data.genres[i] + "</li>"
            }
            date.innerHTML = "<strong>Date de sortie : </strong>" + data.date_published;
            rate.innerHTML = "<strong>Note : </strong>" + data.rated;
            lmdb.innerHTML = "<strong>Score lmdb : </strong>" + data.imdb_score;
            director.innerHTML = "<strong>Réalisateur(s) :</strong>";
            for(let i=0;i<data.directors.length;i++){
                director.innerHTML += "<li>" + data.directors[i] + "</li>"
            }
            actor.innerHTML = "<strong>Acteurs :</strong>";
            for(let i=0;i<data.actors.length;i++){
                actor.innerHTML += "<li>" + data.actors[i] + "</li>"
            }
            duration.innerHTML = "<strong>Durée : </strong>" + data.duration + " min";
            country.innerHTML = "<strong>Pays d'origine :</strong>";
            for(let i=0;i<data.countries.length;i++){
                country.innerHTML += "<li>" + data.countries[i] + "</li>"
            }
            summary.innerHTML = "<strong>Résumé : </strong>" + data.description;
        })
}