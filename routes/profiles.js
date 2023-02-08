import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/', checkAuth, profilesCtrl.index)
router.get('/friends', checkAuth, profilesCtrl.friendsIdx)
router.get('/requests', checkAuth, profilesCtrl.friendRequests)
router.get('/:id', checkAuth, profilesCtrl.show)
// router.get('/:id/posts', checkAuth, profilesCtrl.profilePosts)

router.put('/edit', checkAuth, profilesCtrl.updateProfile)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

router.patch('/:id/sendFriendRequest', checkAuth, profilesCtrl.sendFriendRequest)
router.patch('/:id/acceptRequest', checkAuth, profilesCtrl.acceptRequest)
router.patch('/:id/denyRequest', checkAuth, profilesCtrl.denyRequest)

export { router }
