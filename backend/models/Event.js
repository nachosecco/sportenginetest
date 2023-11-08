import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    client: {
        type: String,
        trim: true,
        required: true,
    },
    creator: {//Migrate to Owner. Set required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    tasks: [
       { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"Task",
       }
    ],
    colaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    deactivated: {
        type: Boolean,
        default: false
    },
    teams: {
        type: [String],
        required: true,
    },
    matchDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: false,
    },
}, 
{
    timestamps:true,
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
