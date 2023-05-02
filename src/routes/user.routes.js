import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
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

router.get("/getAll", usersCtrl.getUsers);

router.get("/getUser/:userId", usersCtrl.getUserById);

router.get('/resetPass', usersCtrl.resetPass);

router.put("/putUser/:userId", usersCtrl.updateUserById);

router.post('/forgetPassword', usersCtrl.forgotPassword);

router.post('/resetPassword', usersCtrl.resetPassword);

export default router;