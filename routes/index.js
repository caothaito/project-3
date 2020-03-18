var express = require('express');
var router = express.Router();
var { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
/* welcome page. */
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


//Trang chủ ( dashboard )

router.get('/dashboard',ensureAuthenticated, (req,res,next)=>{
    res.render('dashboard',{
        user: req.user
    })
})
module.exports = router;