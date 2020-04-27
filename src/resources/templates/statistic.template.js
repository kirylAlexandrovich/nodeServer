const getStatisticTemplate = (votes) => Object.keys(votes).reduce((accum, el) => {
    return accum + `<div>${el}: ${votes[el]}</div>`;
}, '');

module.exports = getStatisticTemplate;
