import { Router } from 'express'
import * as notificationsCtrl from '../controllers/notifications.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/', notificationsCtrl.index)
// router.get('/:id', directMessagesCtrl.show)

router.post('/', checkAuth, notificationsCtrl.create)
// router.post('/:id/sendMessage', checkAuth, directMessagesCtrl.sendMessage)

router.delete('/:id', checkAuth, notificationsCtrl.delete)


export { router }