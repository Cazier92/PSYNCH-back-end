import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id/friends', checkAuth, profilesCtrl.friendsIdx)
router.get('/:id/requests', checkAuth, profilesCtrl.friendRequests)

router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

router.patch('/:id/sendFriendRequest', checkAuth, profilesCtrl.sendFriendRequest)
router.patch('/:userId/profile/:friendId', checkAuth, profilesCtrl.acceptRequest)
router.patch('/:userId/profile/:notFriendId/denyRequest', checkAuth, profilesCtrl.denyRequest)

export { router }
