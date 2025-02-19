// const sessionIdToUserMap=new Map();
const jwt=require('jsonwebtoken');
const secret='narasimha@44$!';
function setUser(user){
       const payload={
        _id:user._id,
        email:user.email,
       }
       return jwt.sign(payload,secret);
       // sessionIdToUserMap.set(id,user);
}

function getUser(token){
    // return sessionIdToUserMap.get(id);
    if(!token) return null;
    try{
        console.log(token);
        return jwt.verify(token,secret); 
    }catch(err){
        return null;
    }
}
module.exports={
    setUser,
    getUser,
};
