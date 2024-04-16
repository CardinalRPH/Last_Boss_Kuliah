import { Router } from 'express';
import loginController from '../controllers/loginController.js';
import { jwtController } from '../controllers/testController.js';
const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => loginController(req, res, next))
router.post('/jwt', (req, res, next) => jwtController(req, res, next))

export default router;
