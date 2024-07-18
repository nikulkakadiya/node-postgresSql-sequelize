const { Address } = require("../models");

exports.addAddress = async(req,res,next)=>{
    try{
        let address = {
            userId:16,
            street:'xyz',
            city:'baroda',
            state:'guj'
        }
        await Address.create(address);
        res.status(200).json({
            message:'success',            
        })
    }catch(error){
        console.log(error);
    }
}