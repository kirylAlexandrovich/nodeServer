const  request = new XMLHttpRequest();
const main = document.getElementById('main');
const statContainer = document.getElementById('statisticContainer');
let variants;

request.open('GET', '/variants');
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
