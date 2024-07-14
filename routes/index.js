import { Router } from 'express';
import { jwtController } from '../controllers/testController.js';
import { sentToClient } from '../controllers/httpWebScoketController.js';
import unloggedMid from '../middlewares/unloggedMid.js';
import { deviceAuthPost, userAuthPost } from '../controllers/authController.js';
import { userAccSendVerifPost, userAccountDelete, userAccountGet, userAccountPost, userAccountPut, userCheckVerify, userSignOutDelete, userVerifyGet } from '../controllers/accountController.js';
import loggedMid from '../middlewares/loggedMid.js';
import { foregetResetPasswordPost, forgetValidateEmailPost, forgetValidateTokenGet } from '../controllers/forgetPasswordController.js';
import { deviceDelete, deviceGet, devicePost, devicePut, deviceWateringPost } from '../controllers/deviceController.js';
import rateLimit from 'express-rate-limit';

const router = Router();

//test controller
router.post('/jwt', (req, res, next) => jwtController(req, res, next))
router.post('/sentWSClient', (req, res, next) => sentToClient(req, res, next))

// logout route
router.delete('/logOut', (req, res, next) => unloggedMid(req, res, next,), userSignOutDelete)

//check Verify route
router.get('/check-verify', (req, res, next) => loggedMid(req, res, next, true), userCheckVerify)

//login route
router.post('/deviceLogin', (req, res, next) => unloggedMid(req, res, next), deviceAuthPost)
router.post('/userLogin', (req, res, next) => unloggedMid(req, res, next), userAuthPost)

//accountController
router.post('/createAccount', (req, res, next) => unloggedMid(req, res, next), rateLimit({
    windowMs: 10 * 1000, //10 seconds
    limit: 2,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests, please try again later.",
        });
    }
}), userAccountPost)
router.get('/verifyAccount', (req, res, next) => unloggedMid(req, res, next), userVerifyGet)
router.post('/resend-verify', (req, res, next) => loggedMid(req, res, next, true), rateLimit({
    windowMs: 10 * 1000, //10 seconds
    limit: 2,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests, please try again later.",
        });
    }
}), userAccSendVerifPost)
router.get('/getAccount', (req, res, next) => loggedMid(req, res, next), userAccountGet)
router.put('/updateAccount', (req, res, next) => loggedMid(req, res, next), userAccountPut)
router.delete('/removeAccount', (req, res, next) => loggedMid(req, res, next), userAccountDelete)

//forgetPasswordController
router.post('/resetSendMail', (req, res, next) => unloggedMid(req, res, next), rateLimit({
    windowMs: 2 * 60 * 1000, //2 minutes
    limit: 5,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests, please try again later.",
        });
    }
}), forgetValidateEmailPost)
router.get('/resetValidate', (req, res, next) => unloggedMid(req, res, next), forgetValidateTokenGet)
router.put('/resetAccountPass', (req, res, next) => unloggedMid(req, res, next), foregetResetPasswordPost)

//device Controller
router.get('/userDevice', (req, res, next) => loggedMid(req, res, next), deviceGet)
router.post('/addDevice', (req, res, next) => loggedMid(req, res, next), devicePost)
router.put('/updateDevice', (req, res, next) => loggedMid(req, res, next), devicePut)
router.delete('/deleteDevice', (req, res, next) => loggedMid(req, res, next), deviceDelete)
router.post('/doWatering', (req, res, next) => loggedMid(req, res, next), deviceWateringPost)

export default router;