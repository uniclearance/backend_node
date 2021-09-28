const validator = require("../../utils/validator")

module.exports = (req,res,next)=>{
    const rule = {
        otp:"required|max:6|min:6"
        
    }

    validator(req.body,rule,{},(err,status)=>{
        if (!status) return res.status(400).json(err.errors)
        next()
    });
}