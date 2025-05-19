const mongoose=require('mongoose')
const connectdb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

    }catch(e){
        console.error(e.message);
        console.log("Could not connect to MongoDB");
        process.exitCode = 1;
    }
};
module.exports=connectdb