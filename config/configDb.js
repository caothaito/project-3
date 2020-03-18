var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project2_Blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports = mongoose;