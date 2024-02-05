import mongoose from "mongoose";
const { Schema } = mongoose;

// 주 
const weekDaySchema = new Schema({
    _id  : {
        type : String,
        require : true,
    },  
    wDay  : {
        type : String,
        require : true,
    },
    wDay_kr  : {
        type : String,
        require : true,
    },
    wDay_cc  : {
        type : String,
        require : true,
    },
    abbreviation  : {
        type : String,
        require : true,
    },
    abbreviation_kr  : {
        type : String,
        require : true,
    },
    abbreviation_cc  : {
        type : String,
        require : true,
    },
});
export default mongoose.model('WeekDay', weekDaySchema);