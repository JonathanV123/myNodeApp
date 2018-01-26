const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('test')
});
router.get('/testing', (req, res) => res.send('Testing Success'))



module.exports = router;