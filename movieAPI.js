const api = "https://www.omdbapi.com/?i=tt3896198&apikey=be41af31";
const searchbox = document.querySelector('.search-box');

const button = document.querySelector('.btn');
button.addEventListener('click', setQuery);

function setQuery(evt) {
    getResults(searchbox.value);
}

function getResults(query) {
    fetch(`${api}&s=${query}`)
        .then(movie => {
            return movie.json();
        }).then((movie) => {
            var content = document.querySelector('#content');

            var box = content.lastElementChild;
            while (box) {
                content.removeChild(box);
                box = content.lastElementChild;
            }

            for (var a = 0; a < movie.Search.length; a++) {
                let box = document.createElement('div');
                box.setAttribute('class', 'box');

                let content = document.getElementById('content');

                content.appendChild(box);

                box.innerHTML = `<div class="title">Title: ${movie.Search[a].Title}, (${movie.Search[a].Year})</div>
                <div class="type">Type: ${movie.Search[a].Type}</div>
                <div class="poster"><img src="${movie.Search[a].Poster}" alt="Poster not available"></img></div>
                <div class="moreinfo"><a href="https://www.imdb.com/title/${movie.Search[a].imdbID}" target="_blank">Watch</a></div>`;
            }
        }).catch(movie => {
            alert(`Movie Not Found!`);
        });
}
