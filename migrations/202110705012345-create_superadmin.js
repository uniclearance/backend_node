const {User} = require('../models')
const config = require('../config');

module.exports = {
    up:async()=>{
        await User.create({
            fullname:'Admin',
            password:'superadmin',
            username:'superadmin',
            role: config.userTypes.superadmin
        })
    },
    down: async()=>{
        await User.destroy({where:{username:'superadmin'}})
        console.log("User migrated");
    }
}