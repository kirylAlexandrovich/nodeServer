const  request = new XMLHttpRequest();
const main = document.getElementById('main');
const statContainer = document.getElementById('statisticContainer');
const downloadButtonsContainer = document.getElementById('downloadButtonsContainer');
const downloadedFileContainer = document.getElementById('downloadedFileContainer');
let variants;

request.open('get', '/variants');
request.send();

request.onerror = function () {
    console.log('ERROR on get variants');
};

request.onload = function () {
    variants = JSON.parse(this.response);

    main.innerHTML = Object.keys(variants).reduce((accum, el) => {
        return accum + `<button name="${el}">${variants[el]}</button>`;
    }, '<div>Who was the first Western explorer to reach China?</div>');

    getStatistic();
};

function getStatistic() {
    request.open('get', '/stat', true);
    request.send();

    request.onload = function () {
        const stat = JSON.parse(this.response);

        statContainer.innerHTML = Object.keys(stat).reduce((accum, el) => {
            return accum + `<div>${variants[el]}: ${stat[el]}</div>`;
        }, '<span>Response statistics:</span>');
    };
}

main.addEventListener('click', (event) => {
    if (!event.target.name) return;

    request.open('post', '/vote', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify({variant: event.target.name}));

    request.onload = function () {
        if (this.status === 200) {
            getStatistic();
        } else {
            console.log('ERROR status', this.status);
        }
    };
});

downloadButtonsContainer.addEventListener('click', (event) => {
    let format = 'text/html';

    if (event.target.name === 'xml') {
        format = 'application/xml';
    }
    if (event.target.name === 'json') {
        format = 'application/json';
    }

    request.open('get', '/stat', true);
    request.setRequestHeader('Accept', format);
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.send();

    request.onload = function () {
        console.log('Statistic content type', this.getResponseHeader('Content-type'));
        console.log(this.response);
        downloadedFileContainer.innerText = this.response;
    };
});
