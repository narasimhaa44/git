const {getUser}=require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){
    const userUid=req.headers["authorization"];

    if(!userUid) return res.redirect("/login");
    const token=userUid.split('Bearer ')[1];
    console.log(token);

    const user=getUser(token);

    if(!user) return res.redirect("/login");

    req.user=user;
    next();
}

async function checkAuth(req,res,next){
//  const userUid=req.headers["authorization"];

//  const token=userUid.split("Bearer ")[1];

//  const user=getUser(token);

//  req.user=user;
//  next();    
    const userUid = req.headers["authorization"];

    // Check if the authorization header exists and is in the correct format
    if (userUid && userUid.startsWith("Bearer ")) {
        const token = userUid.split("Bearer ")[1];
        const user = getUser(token);
        req.user = user;
    } // No 'else' needed - if no valid token, req.user remains undefined


    next(); // Always call next() to continue the request chain


   
}

module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
};