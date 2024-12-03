import { Router } from "express";
import Auth from './authentication/auth.js';

import * as rh from './reqhandler.js'

const router=Router();
router.route('/adduser').post(rh.addUser)
router.route('/login').post(rh.login)
router.route('/verify').post(rh.verifyEmail)
router.route('/getuser').get(Auth,rh.getUser)
// router.route('/otpcheck').post(rh.verifyotp)
// router.route('/passcheck').post(rh.updatepass)

export default router