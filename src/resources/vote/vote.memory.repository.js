const fs = require('fs');
const fsPromise = fs.promises;

const filePath = '../votes.json';

const getAll = () => {
    try {
        return fsPromise.readFile(filePath);
    } catch (e) {
        throw new Error(`vote repository getAll ${e}`);
    }
};

const update = async (variant) => {
    try {
        const votes = JSON.parse(await getAll());

        votes[variant] = votes[variant] ? votes[variant] + 1 : 1;

        return await fsPromise.writeFile(filePath, JSON.stringify(votes));
    } catch (e) {
        throw new Error(`update error ${e}`);
    }
};

module.exports = {
    getAll,
    update,
};
