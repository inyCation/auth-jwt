import express from "express"
import {loginController,registerController,getPostController} from "../controllers/user.js"

import { checkLoggedIn } from "../middlewares/check-loggedin.js";


const router = express.Router();

router.get("/",(req,res)=>{
    res.send({
        name:"aditya",
    })
})
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/post", checkLoggedIn,getPostController)
router.get("/verify",(req,res)=>{

})
export default router;