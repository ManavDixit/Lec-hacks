import mongoose from "mongoose";
const AuthSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})
const model=mongoose.model("user",AuthSchema);
export default model;