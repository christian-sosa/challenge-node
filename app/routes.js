const router = require('express').Router()
const Controller = require('./controllers/postsController')
const bp = require('body-parser')
const urlencodedParser = bp.urlencoded({ extended: false })

router.get('/posts', Controller.getPosts)
router.get('/posts/:id', urlencodedParser, Controller.getPostsOne)
router.post('/posts', urlencodedParser, Controller.postPost)
router.patch('/posts/:id', urlencodedParser, Controller.patchPost)
router.delete('/posts/:id', Controller.deletePost)

module.exports = router
