const config = require("../../config")
const {DepartmentAdmin} = require("../../models")

module.exports = (req,res,next)=>{
    const user = req.user
    const {role} = user.dataValues
    console.log(role);
    if(role !== config.userTypes.superadmin && role !== config.userTypes.departmentAdmin ) return res.status(403).json({message:"Sorry, you must have super admin or department admin permission"})
    const admin = DepartmentAdmin.findOne({where:{userId:user.id}})
    if (!admin) return res.status(403).json({message:"Sorry you do not have permission. There is something wrong with profile. Contact super admin"})
    if (role === config.userTypes.departmentAdmin && admin.dataValues.type != config.subAdminType.superAdmin) return res.status(403).json({message:"Sorry, you do not have super admin permission for this department"})
    next()
}