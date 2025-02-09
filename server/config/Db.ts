import mongoose from "mongoose"

export const ConnectDB = async()=>{
    try {
        if(mongoose.connection.readyState === 1){
            return mongoose.connection.asPromise();
        }
        await mongoose.connect(process.env.MONGO_URI!)
        .then(()=>console.log('Mongodb connected successfully'))
        .catch((e: any)=>console.log(e))
    } catch (error) {
        console.log(error)
    }
}