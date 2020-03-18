module.exports = {
    ensureAuthenticated: function(req,res,next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg','Vui lòng Đăng Nhập Để Xem Thông Tin')
        res.redirect('/apii/login')
    },
    forwardAuthenticated: function (req,res,next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard')
    }
}