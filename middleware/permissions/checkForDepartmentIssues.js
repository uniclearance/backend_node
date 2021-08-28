const {DepartmentIssue} = require("../../models")

module.exports = (req,res,next)=>{
    const student = req.student
    try {
       
        const issues = DepartmentIssue.findAll({where:{studentId:student.dataValues.id,isCleared:false}})
        if (issues.length >0) return res.status(403)
        .json({
            message:"Sorry there are some uncleared issues. See your department adminstrator for assistant",
            issues:issues
        })
        next()
    } catch (error) {
        res.status(500).json({message:"Unexpected error occued"})
        console.log(error);
    }
}