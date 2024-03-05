import { app } from "./index.js";
import {conntectToDb} from "./connection/index.js"

conntectToDb()

app.listen(process.env.PORT, ()=>{
    console.log(`Server On - http://localhost:${process.env.PORT}`);
})