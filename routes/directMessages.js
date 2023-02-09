import { Router } from 'express'
import * as directMessagesCtrl from '../controllers/directMessages.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


router.get('/', directMessagesCtrl.index)
router.get('/:id', directMessagesCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)


router.post('/', checkAuth, directMessagesCtrl.create)
router.post('/:id/sendMessage', checkAuth, directMessagesCtrl.sendMessage)

router.delete('/:conversationId/deleteMessage/:messageId', checkAuth, directMessagesCtrl.deleteMessage)


export { router }