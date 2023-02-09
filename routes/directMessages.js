import { Router } from 'express'
import * as directMessagesCtrl from '../controllers/directMessages.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/', checkAuth, directMessagesCtrl.index)
router.get('/:id', checkAuth, directMessagesCtrl.show)

router.post('/', checkAuth, directMessagesCtrl.create)
router.post('/:id/sendMessage', checkAuth, directMessagesCtrl.sendMessage)

router.delete('/:conversationId/deleteMessage/:messageId', checkAuth, directMessagesCtrl.deleteMessage)


export { router }