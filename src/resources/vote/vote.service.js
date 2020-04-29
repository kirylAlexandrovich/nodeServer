const voteRepo = require('./vote.memory.repository');

const get = async () => {
    return voteRepo.getAll();
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
