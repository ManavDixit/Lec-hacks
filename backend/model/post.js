import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    answers:{type:Array,default:[]},
    likes:{type:Array,default:[]},
    user:{type:String,required:true}
})
const model=mongoose.model('post',postSchema);
export default model;