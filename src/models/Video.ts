import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSION = {
    width : 100,
    heigth : 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId
    title:string;
    description:string;
    videoUrl : string;
    thumbnailUrl : string;
    controls?: boolean;
    transformation?:{
        height:number;
        width:number;
        quality?:number;
    };

}
const videoSchema = new Schema(
    {
        title:{type:String,required:true},
        description:{type:String,required:true},
        videoUrl:{type:String,required:true},
        thumbnailUrl:{type:String,required:true},
        controls:{type:Boolean , default:true},
        transformation:{
            height:{type:Number , default : VIDEO_DIMENSION.heigth},
            width:{type:Number , default : VIDEO_DIMENSION.width},
            qualty:{type:Number , min:1, max : 100},
        }
    },
    {
        timestamps:true
    }

);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
