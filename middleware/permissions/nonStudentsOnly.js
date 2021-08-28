const config = require("../../config")

module.exports = (req,res,next)=>{
    if (!req.user.role === config.userTypes.student) 
    return res
    .status(403).json({
        status:"error",
        message:"Sorry you do not have permission. You must not be a student"
    })
    return next()

}