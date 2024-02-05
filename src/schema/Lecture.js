import mongoose from "mongoose";
const { Schema } = mongoose;

// 회비 
const lectureSchema = new Schema({
    _id  : {
        type : String,
        require : true,
    },  
    wDay  : {
        type : String,
        require : true,
    },
    from  : {
        type : String,
        require : true,
    },
    to  : {
        type : String,
        require : true,
    },
});
export default mongoose.model('Lecture', lectureSchema);