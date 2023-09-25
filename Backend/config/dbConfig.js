
const dotenv=require("dotenv")
const mongoose=require("mongoose")

dotenv.config()

async function connectDB (){
    try{
        const con=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            
        })
        console.log("db connected")
    }catch(e){
        console.log(e)
        process.exit(0)
    } 
}
module.exports=connectDB

