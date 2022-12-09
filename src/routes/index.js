const express = require('express');
const router = express.Router();
const { findDocuments, deleteDocument, findTitleDocument, findByIdAndUpdate } = require('../controller/controller');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send('no authenticated');
    }
}

router.get('/getUser', (req, res) => res.send(req.user))
router.get('/titulo/:id', isAuthenticated, findTitleDocument);
router.get('/getAllDocuments', isAuthenticated, findDocuments);
router.delete('/deleteDocument/:id', isAuthenticated, deleteDocument);
router.put('/new-title', isAuthenticated, async (req, res) => {
    await findByIdAndUpdate(req.body.id, { data: req.body.data, title: req.body.title });
    res.send(req.body.title);
});

module.exports = router;