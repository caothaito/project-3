var mongoose = require('../config/configDb');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// database User
var userSchema = Schema({
    username: String,
    local: {
        email: String,
        password: String
    },
    facebook: {
        email: String,
    },
    idPost: {
        type: String,
        default: null,
        ref: 'post'
    },
    idComment: [{
        type: ObjectId,
        default: null,
        ref: 'comment'
    }],
    activeMail: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    type: {
        type: Number,
        default: 1 //1:admin , 2:user
    }

}, {
    collection: "user"
})

// database Post
var postSchema = new Schema({
    title: String,
    content: String,
    img:String,
    idComment: [{
        type: ObjectId,
        ref: "comment"
    }]
}, {
    collection: "post"
})

//db Comment
var commentSchema = new Schema({
    content: String,
    user: [{
        type: ObjectId,
        ref: "user"
    }],
    post: [{
        type: ObjectId,
        ref: "post"
    }]
}, {
    collection: "comment"
})

var userModel = mongoose.model('user', userSchema);
var postModel = mongoose.model('post', postSchema);
var commentModel = mongoose.model('comment', commentSchema);


// userModel.find({})
//     .populate('idPost')
//     .populate('idComment')
//     .then(function(data) {
//         {
//             console.log(data);
//         }
//     })


// userModel.create({
//     username: 'Thanh',
//     local: {
//         email: 'nguyenthanh',
//         password: '123'
//     },
//     facebook: {
//         email: 'thanh@gmail',
//     },
//     idPost: '5e6da8aea5bde31eacf1f002',
//     idComment: ['5e6da86772f8561728b30ac5', '5e6da86772f8561728b30ac6'],
//     active: false,
//     block: false,
//     type: 1
// })



// postModel.create({
//     title: 'Cách trở thành master',
//     content: 'Chăm code',
//     idComment: ['5e6da86772f8561728b30ac5', '5e6da86772f8561728b30ac6']

// })


// commentModel.create({
//     content: "Bai học tạm"
// }, {
//     content: "ok"
// })

module.exports = {userModel,
    postModel,
    commentModel
   }