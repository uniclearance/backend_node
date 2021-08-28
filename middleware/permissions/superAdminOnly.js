const config = require("../../config")

module.exports = (req,res,next)=>{
    if(req.user.role !== config.userTypes.superadmin)
    return res.status(403).json("You do not have permission. Must be a super admin")
    next()
}