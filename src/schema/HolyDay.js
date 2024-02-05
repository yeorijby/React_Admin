import mongoose from "mongoose";
const { Schema } = mongoose;

// 휴일 
const holyDaySchema = new Schema({
    _id  : {
        type : String,
        require : true,
    },  
    subject : {
        type : String,
        require : true,
    },
    year  : {
        type : Number,
        require : true,
    },
    month  : {
        type : Number,
        require : true,
    },
    day  : {
        type : Number,
        require : true,
    },
});
export default mongoose.model('HolyDay', holyDaySchema);