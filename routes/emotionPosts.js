import { Router } from 'express'
import * as emotionPostsCtrl from '../controllers/emotionPosts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/', emotionPostsCtrl.index)
router.get('/feed', decodeUserFromToken, checkAuth, emotionPostsCtrl.feed)
router.get('/all', decodeUserFromToken, checkAuth, emotionPostsCtrl.all)
router.get('/:id', emotionPostsCtrl.show)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

// renders all the posts from a users friends:


router.post('/', checkAuth, emotionPostsCtrl.create)
router.post('/:id/comments', checkAuth, emotionPostsCtrl.createComment)
router.post('/:id/reactions', checkAuth, emotionPostsCtrl.addReaction)

// Only for user that posted emotion:
router.put('/:id', checkAuth, emotionPostsCtrl.update)
//Only for user that posted comment:
router.put('/:emotionPostId/comments/:commentId', checkAuth, emotionPostsCtrl.updateComment)
//Only for user that posted reaction:
router.put('/:emotionPostId/reactions/:reactionId', checkAuth, emotionPostsCtrl.updateReaction)

// Only for the user that posted emotion:
router.delete('/:id', checkAuth, emotionPostsCtrl.delete)
// Both the user that posted the emotion, and the user that posted the comment:
router.delete('/:emotionPostId/comments/:commentId', checkAuth, emotionPostsCtrl.deleteComment)
// Only for the user that left the reaction:
router.delete('/:emotionPostId/reactions/:reactionId', checkAuth, emotionPostsCtrl.deleteReaction)


export { router }