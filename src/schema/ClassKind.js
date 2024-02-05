import mongoose from "mongoose";
const { Schema } = mongoose;

// 회비 
const classKindSchema = new Schema({
    _id  : {
        type : String,
        require : true,
    },  
    alias  : {
        type : String,
        require : true,
    },
    capacity  : {
        type : Number,
        require : true,
    },
    weekLecCnt  : {
        type : Number,
        require : true,
    },
    lecture  : {
        type : String,
        require : true,
    },
    member  : {
        type : String,
        require : true,
    },
});
export default mongoose.model('ClassKind', classKindSchema);