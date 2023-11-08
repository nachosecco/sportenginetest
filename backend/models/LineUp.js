import mongoose from "mongoose";

const lineUpSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    generation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Generation",
        required: true
    },
    players: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        position: {
            type: String,
            enum: [
                'Loosehead Prop',
                'Hooker',
                'Thighthead Prop',
                'Lock-1',
                'Lock-2',
                'Blindside Flanker',
                'Openside Flanker',
                'Number 8',
                'Scrum Half',
                'Fly Half',
                'Left Wing',
                'Inside Center',
                'Outside Center',
                'Right Wing',
                'Full Back',
                'Alternate'
            ],
            required: true
        }
    }]
}, {
    timestamps: true
})

/**
 *  Function to validate if players are real instances.
 *  If some players are not in the database return false and stop the process,
 *  otherwise return true and continue.
 * 
 *  @param {String[]} players
 */
lineUpSchema.path('players').validate(async function (players) {
    for (const playerObj of players) {
        const player = await mongoose.model('User').findById(playerObj.player);

        if (!player) {
            return false;
         }
    }
    return true;
}, 'Some players has invalid data');

const LineUp = mongoose.model("LineUp", lineUpSchema);
export default LineUp;

