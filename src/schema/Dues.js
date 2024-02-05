import mongoose from "mongoose";
const { Schema } = mongoose;

// 회비 
const duesSchema = new Schema({
    _id  : {
        type : String,
        require : true,
    },  
    limit  : {
        type : Number,
        require : true,
    },
    price  : {
        type : Number,
        require : true,
    },
});
export default mongoose.model('Dues', duesSchema);