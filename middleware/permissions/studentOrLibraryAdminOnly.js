const config = require("../../config")

module.exports = async(req,res,next)=>{
    const user = req.user
    if (user.dataValues.role !== config.userTypes.student || user.dataValues.role !== config.userTypes.libraryAdmin){
        res.status(403).json({detail:"You do not have permission to perform this function"})
        return ;
    }
    next()
}