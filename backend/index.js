import ConnectToDb from "./db.js";
ConnectToDb();
import express from "express";
import authRouter from './routes/auth.js' 
import postRouter from './routes/post.js' 
const port=8000;
const hostname='localhost'
const app=express();
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/auth/',authRouter);
app.use('/posts/',postRouter);
app.listen(port,hostname,()=>{
    console.log(`connected to ${hostname}:${port}`);
});