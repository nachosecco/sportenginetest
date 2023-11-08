import mongoose from "mongoose";

const generationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
});

/**
 *  Function to validate if players are real instances.
 *  If some players are not in the database return false and stop the process,
 *  otherwise return true and continue.
 * 
 *  @param {String[]} players
 */
generationSchema.path('players').validate(async function (players) {
    for (const id of players) {
        const player = await mongoose.model('User').findById(id);
        if (!player) {
            return false;
        }
    }
    return true;
}, 'Some players has invalid data');


const Generation = mongoose.model("Generation", generationSchema);
export default Generation;