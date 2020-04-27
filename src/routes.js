const { Router } = require('express');

const voteService = require('./resources/vote/vote.service');
const variantsService = require('./resources/variants/variants.service');

const router = Router();

router.route('/').get((req, res) => {
    res.redirect('/variants');
});

router.route('/variants').get((req, res) => {
    res.send(variantsService.getPage());
});

router.route('/vote').post((req, res) => {
    try {
        voteService.update(req.body);

        res.redirect('/stat');
    } catch (e) {
        res.sendStatus(404);
    }
});

router.route('/stat').get(async (req, res) => {
    try {
        const vote = await voteService.getPage();

        res.send(vote);
    } catch (e) {
        res.sendStatus(404);
    }
});

module.exports = router;
