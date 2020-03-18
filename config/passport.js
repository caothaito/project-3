var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt')

// db model
var User =  require('../model/userDB')

module.exports =  function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'}, (email,password,done)=>{
            // check email
            User.userModel.findOne({
                'local.email':email
            }).then( user =>{
                if(!user){
                    return done(null,false,{message:'Email chưa được đăng kí'})
                }

                // Match Password
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        let token = jwt.sign({user: user[0].email},'caothaito',{expiresIN:'1h'})
                        res.json(token)
                    }else{
                        return done(null,false,{message:'Mật Khẩu Không Đúng'})
                    }
                })
            })
        })
    )
}

passport.serializeUser(function(user, done) {
    done(null, user.userModel.id);
  });

passport.deserializeUser((id,done)=>{
    db.userModel.findById(id,(err,user)=>{
        done(err,user);
    })
})