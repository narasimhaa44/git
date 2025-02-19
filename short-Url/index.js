const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
// const {restrictToLoggedinUseronly,checkAuth}=require('./middleware/auth');
const { restrictToLoggedinUserOnly, checkAuth } = require('./middleware/auth');

const {connectmongodb}=require("./connect");
const URL=require('./models/url');

const urlRoute=require('./routes/url');
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");
const app=express();
const PORT=8001;
connectmongodb("mongodb://localhost:27017/short-url")
    .then(()=>console.log('mongodb connected'));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/user',userRoute);
app.use('/',checkAuth,staticRoute);
app.get('/url/:shortId',async(req,res)=>{

    const shortID=req.params.shortId;
    // console.log(URL.findOne({shortID,}));
    const entry= await URL.findOneAndUpdate({shortId:shortID,},{$push:{visitHistory:{timestamp:Date.now()},}},{new:true});
    // const entry=await URL.findOne({shortId:shortID});
    console.log(entry);
    res.redirect(entry.redirectURL);
});
app.listen(PORT,()=>console.log(`server started at PORT:${PORT}`));