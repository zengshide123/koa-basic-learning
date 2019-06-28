// 使用jwt策略
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.tokenSecret;
const Users = require('./user');
module.exports = passport => {    
    passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {    
        let user = await Users.findById(jwt_payload.id,{password:false});
        if(user){
                return done(null,user)  
            }else{
                return done(null,false)
            }
      }));
};
