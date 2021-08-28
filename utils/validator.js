const Validator = require("validatorjs")

const validator = (body,rules,customMessages,calback)=>{
    const validation = new Validator(body,rules,customMessages)
    validation.passes(()=>calback(null,true))
    validation.fails(()=>calback(validation.errors,false))
}

module.exports = validator