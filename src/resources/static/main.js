const  request = new XMLHttpRequest();
const main = document.getElementById('main');

request.open('GET', '/variants');
request.send();

request.onerror = function () {
    console.log('ERROR on get variants');
};

request.onload = function () {
    main.innerHTML = JSON.parse(this.response).reduce((accum, current) => {
        return accum + `<button>${current}</button>`;
    }, '');
};

function getStatistic() {
    request.open('get', '/stat', true);
    request.send();

    request.onload = function () {
        const stat = JSON.parse(this.response);

        main.innerHTML = Object.keys(stat).reduce((accum, el) => {
            return accum + `<div>${el}: ${stat[el]}</div>`;
        }, '<span>Answer statistic:</span>');
    };
}

main.addEventListener('click', (event) => {
    request.open('post', '/vote', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify({variant: event.target.textContent}));

    request.onload = function () {
        if (this.status === 200) {
            getStatistic();
        } else {
            console.log('ERROR status', this.status);
        }
    };
});
