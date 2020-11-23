const api = "https://www.omdbapi.com/?i=tt3896198&apikey=be41af31";

const header = document.querySelector('#header');
const submitButton = document.querySelector('#submit');
const mainContent = document.querySelector('#main-content');
const input = document.querySelector('#queryBox');
const filterBox = document.querySelector('.filterBox');

submitButton.addEventListener('click', start);

function start() {
    header.classList.add('toTop');
    filterBox.style.display = 'block';
    getData(input.value);
    input.value = '';
}

function getData(val) {
    fetch(`${api}&s=${val}`)
        .then(data => {
            return data.json();
        }).then((data) => {
            // console.log(data)

            let boxes = mainContent.lastElementChild;
            while (boxes) {
                mainContent.removeChild(boxes);
                boxes = mainContent.lastElementChild;
            }

            for (let a = 0; a < data.Search.length; a++) {

                let box = document.createElement('div');
                box.setAttribute('class', `card ${data.Search[a].Type}`);
                mainContent.appendChild(box);

                box.innerHTML = `<h3 class="title">${data.Search[a].Title}, (${data.Search[a].Year})</h3><h6 class="type">TYPE: ${data.Search[a].Type}</h6><div class="poster"><img src="${data.Search[a].Poster}" alt="Poster Not Available"></div><a href="https://www.imdb.com/title/${data.Search[a].imdbID}" class="watch" target="_blank">WATCH</a>`;
            }
        }).catch(e => {
            alert(`Movie Not Found!`);
            header.classList.remove('toTop')
            filterBox.style.display = 'none';
        });
}

// jQuery started here
$(document).ready(function () {
    $('.list').click(function () {
        const value = $(this).attr('data-filter');
        if (value == 'All') {
            $('.card').show('1000');
        } else {
            $('.card').not('.' + value).hide('1000');
            $('.card').filter('.' + value).show('1000');
        }
    })

    $('.list').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})
