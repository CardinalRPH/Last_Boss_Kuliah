import { Router } from 'express';
import { jwtController } from '../controllers/testController.js';
import { sentToClient } from '../controllers/httpWebScoketController.js';
import unloggedMid from '../middlewares/unloggedMid.js';
import { deviceAuthPost, userAuthPost } from '../controllers/authController.js';
import { userAccountDelete, userAccountGet, userAccountPost, userAccountPut, userVerifyPost } from '../controllers/accountController.js';
import loggedMid from '../middlewares/loggedMid.js';
import { foregetResetPasswordPost, forgetValidateEmailPost, forgetValidateTokenGet } from '../controllers/forgetPasswordController.js';
import { deviceDelete, deviceGet, devicePost, devicePut, deviceWateringPost } from '../controllers/deviceController.js';

const router = Router();

//test controller
router.post('/jwt', (req, res, next) => jwtController(req, res, next))
router.post('/sentWSClient', (req, res, next) => sentToClient(req, res, next))

//login route
router.post('/deviceLogin', (req, res, next) => unloggedMid(req, res, next), deviceAuthPost)
router.post('/userLogin', (req, res, next) => unloggedMid(req, res, next), userAuthPost)

//accountController
router.post('/createAccount', (req, res, next) => unloggedMid(req, res, next), userAccountPost)
router.post('/verifyAccount', (req, res, next) => loggedMid(req, res, next, true), userVerifyPost)
// need to resend verify email
router.get('/getAccount', (req, res, next) => loggedMid(req, res, next), userAccountGet)
router.put('/updateAccount', (req, res, next) => loggedMid(req, res, next), userAccountPut)
router.delete('/removeAccount', (req, res, next) => loggedMid(req, res, next), userAccountDelete)

//forgetPasswordController
router.post('/resetSendMail', (req, res, next) => unloggedMid(req, res, next), forgetValidateEmailPost)
// need to resend resetPass email
router.get('/resetValidate', (req, res, next) => unloggedMid(req, res, next), forgetValidateTokenGet)
router.post('/resetAccountPass', (req, res, next) => unloggedMid(req, res, next), foregetResetPasswordPost)

//device Controller
router.get('/userDevice', (req, res, next) => loggedMid(req, res, next), deviceGet)
router.post('/addDevice', (req, res, next) => loggedMid(req, res, next), devicePost)
router.put('/updateDevice', (req, res, next) => loggedMid(req, res, next), devicePut)
router.delete('/deleteDevice', (req, res, next) => loggedMid(req, res, next), deviceDelete)
router.post('/doWatering', (req, res, next) => loggedMid(req, res, next), deviceWateringPost)

export default router;