import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { verifyToken } from '../middlewares';
/* import { authJwt, verifySignup } from "../middlewares"; */

/* router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
); */

router.get("/getAll", verifyToken, usersCtrl.getUsers);

router.get("/getUser/:userId", verifyToken, usersCtrl.getUserById);

router.get('/resetPass', verifyToken, usersCtrl.resetPass);

router.put("/putUser/:userId", verifyToken, usersCtrl.updateUserById);

router.post('/forgetPassword', verifyToken, usersCtrl.forgotPassword);

router.post('/resetPassword', verifyToken, usersCtrl.resetPassword);

export default router; 