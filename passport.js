const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const {ExtractJwt} =require("passport-jwt")
const LocalStrategy = require("passport-local").Strategy
const config = require("./config")
const {User} = require("./models")



//JWT Stategy
passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.appSecrete
},
async (payload,done)=>{
   const user = await User.findOne({where:{uuid:payload.sub}})
   if (!user) return done(null,false,{message:"You are not authenticated"})
    return done(null,user)
}
))

//Local Stategy

passport.use(new LocalStrategy(async(username,password,done)=>{
   const user = await User.findOne({where:{username}})
   if(!user) return done(null,false,{message:"Incorrect username"})
   const result = user.validatePassword(password)
   if(!result) return done(null,false,{message:"Incorrect password"})
   return done(null,user)
}))