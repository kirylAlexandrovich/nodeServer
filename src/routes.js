const { Router } = require('express');

const voteService = require('./resources/vote/vote.service');
const variantsService = require('./resources/variants/variants.service');

const router = Router();

router.route('/variants').get((req, res) => {
    res.send(variantsService.get());
});

router.route('/vote').post((req, res) => {
    try {
        voteService.update(req.body);

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});

router.route('/stat').get(async (req, res) => {
    try {
        const vote = await voteService.get();

        res.send(vote);
    } catch (e) {
        res.sendStatus(404);
    }
});

module.exports = router;
