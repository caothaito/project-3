var express = require('express');
var router = express.Router();
var db = require('../model/userDB');

/* GET users listing. */
router.get('/comment', async function (req, res, next) {
    try {
        var Show = await db.commentModel.find();
        res.json({
            error: false,
            data: Show
        });
    } catch (error) {
        res.json({
            error: true,
            data: error
        });
    }

});
router.get('/comment/:idpost', async function (req, res, next) {
    var id = req.params.idpost
    try {
        var ShowId = await db.commentModel.findById(id);

        res.json({
            error: false,
            data: ShowId
        });

    } catch (error) {
        res.json({
            error: true,
            data: error
        })
    }

});


router.post('/comment', async (req, res) => {

    try {
        let commentNew = await db.commentModel.create({
            content: "Bai học tạm",
            user: '5e6da8aea5bde31eacf1f002',
            post: '5e6da86772f8561728b30ac5'
        })
        res.json({
            error: false,
            data: commentNew
        });
    } catch (error) {
        res.json({
            error: true,
            data: error
        })
    }
});

module.exports = router;