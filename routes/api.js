var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var db = require('../model/userDB');
var sendMail = require('./sendMail')
var passport = require('passport');
var saltRounds = 10;



// dang ki
router.post("/sign-up", function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
     db.userModel.find({
        'local.email':email
    }).then(function(data){
        console.log(data);
    })
        .then(function (checkEmail) {
            if (checkEmail) {
              return  res.json('da ton tai')
            }
            bcrypt.hash(password, saltRounds, function (err, hash) {
                db.userModel.create({
                    'local.email':email,
                    'local.password':hash
                }).then(function (data) {
                    let token = jwt.sign({
                        id: data._id
                    }, 'caothaito', {
                        expiresIn: "1h"
                    })
                    sendMail('vukind@gmail.com', 'THU XAC NHAN', `link xac nhan <a href="${req.protocol}://${req.get('host')}/authEmail/${token}">here</a>`)
                    res.json(`${req.protocol}://${req.get('host')}/apii/authEmail/${token}`);
                })
            })
        }).catch(function (err) {
            console.log(err);
        })
})

router.get('/authEmail/:token', function (req, res, next) {
    try {
     let token = req.params.token;
     let decoded = jwt.verify(token, 'caothaito')
     db.userModel.findByIdAndUpdate({_id:decoded.id},{$set:{activeMail:true}})
     .then(function(data){
         if(data){
             res.json('active thành công')
         }else{
            res.json('lỗi')
         }
     })
 
    }catch (error) {
        res.json(error)
    }
 })


// login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });


module.exports = router;