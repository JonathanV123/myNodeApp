const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('Hey!');
    res.render('hello!')
});
router.get('/testing', (req, res) => res.send('Testing Success'))



module.exports = router;