const express = require('express');
const dataBase = require('../libs/dataBase');
const utilsUrl = require('../utils/url');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ 'message': 'SERVER RUNNING' })
});

router.post('/short', async (req, res) => {
    let url = req.body.url
    if (typeof url != "undefined") {
        let isUrl = utilsUrl.checkIfIsUrl(url)
        if (isUrl) {
            let created = await dataBase.createNewShort(url);
            res.json({ message: 'resource created' })
        } else {
            res.json({ 'message': 'Not a url.' })
        }
    } else {
        res.json({ message: 'Not url specified.' })
    }
});

module.exports = router;