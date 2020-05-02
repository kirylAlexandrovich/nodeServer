const voteRepo = require('./vote.memory.repository');

const createXML = (data) => {
    const XMLStat = Object.keys(data).reduce((accum, el) => {
        return accum + `<variant>
                            <key>${el}</key>
                            <value>${data[el]}</value>
                        </variant>`;
    }, '');

    return `<statistic>${XMLStat}</statistic>`;
};

const createHTML = (data) => {
    return Object.keys(data).reduce((accum, el) => {
        return accum + `<div>${el}: ${data[el]}</div>`;
    }, '');
};

const get = async (format) => {
    let stat = JSON.parse(await voteRepo.getAll());

    if (format === 'application/xml') {
        stat = createXML(stat);
    }
    if (format === 'text/html') {
        stat = createHTML(stat);
    }

    return stat;
};

const update = (vote) => {
    if (!vote.variant) {
        throw new Error('variant is not defined');
    }
    return voteRepo.update(vote.variant);
};

module.exports = {
    get,
    update,
};
