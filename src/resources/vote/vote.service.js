const voteRepo = require('./vote.memory.repository');
const getStatisticTemplate = require('../templates/statistic.template');
const getPageTemplate = require('../templates/page.template');

const getPage = async () => {
    const allVotes = JSON.parse(await voteRepo.getAll());

    return getPageTemplate(
        getStatisticTemplate(allVotes)
    );
};

const update = (vote) => {
    return voteRepo.update(vote.variant);
};

module.exports = {
    getPage,
    update,
};
