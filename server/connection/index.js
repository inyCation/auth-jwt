import mongoose from "mongoose";


export const conntectToDb = () => {
    mongoose.connect(process.env.MONGO_DB_URI,{
        dbName:"userInfo",
    })
    .then(() =>{
        console.log("DB Connected")
    })
    .catch((e) =>{
        console.log("Error in Connection",e);
    })
}