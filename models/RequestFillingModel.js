import mongoose from "mongoose";

const requestFF = mongoose.Schema(
    {
        requstId:{
            type:String,
            required: true,
        },
        fabricType:{
            type:String,
            required: true,
        },
        buttonType:{
            type:String,
            required: true,
        },
        threadType:{
            type:String,
            required: true,
        },
        otherMaterial:{
            type:String,
            required:true,
        },
        fillingDate:{
            type:Date,
            required:true,
        },
        
    }
);

export const RFF = mongoose.model('RFF', requestFF);