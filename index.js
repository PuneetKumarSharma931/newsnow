
let cardsBody = document.getElementById('cardsContainer');

let apiKey = '03eaa14c266a4a38bd0fe4aa8c59c072';

const xhr = new XMLHttpRequest();

xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, true);

function putNews(json) {

    let title;
    let description;
    let img;
    let url;
    let str = "";

    json['articles'].forEach(function (element) {

        title = element['title'];
        description = element['description'];
        url = element['url'];
        img = element['urlToImage'];

        str += `<div class="card mx-2 my-3" style="width: 18rem;">
                <img src="${img}" class="card-img-top" alt="Image Not Available">
                <div class="card-body">
                <h5 class="card-title">${title}</h5>
                 <p class="card-text">${description}</p>
                 <a href="${url}" target="_blank" class="btn btn-primary">Read More</a>
                </div>
                </div>`;

    });

    cardsBody.innerHTML = str;
}

xhr.onload = function () {

    if (this.status === 200) {

        json = JSON.parse(this.responseText);
        putNews(json);
    }
    else {
        console.log('ops Some error occoured!');
    }
}


xhr.send();

let search = document.getElementById('searchTxt');

search.addEventListener('input', function() {

    let searchTxt = search.value.toLowerCase();

    let cards = document.getElementsByClassName('card');

    Array.from(cards).forEach(function(element) {

        if(element.querySelector('h5').innerText.toLowerCase().includes(searchTxt) || element.querySelector('p').innerText.toLowerCase().includes(searchTxt)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});

