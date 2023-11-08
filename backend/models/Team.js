import mongoose from "mongoose";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    foundationDate: {
      type: Date,
      required: true,
      unique: false,
    },
    headCoach: {
      type: String,
      required: true,
      unique: false,
    },
    manager: {
      type: String,
      required: true,
      unique: false,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    contactMail: {
      type: String,
      required: true,
      match: emailRegex,
    },
    webPage: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);

// Relationship with User model
teamSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'team',
});

// Relationship with Event model
teamSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'teams',
});

const Team = mongoose.model("Team", teamSchema);

// Ensure virtual fields are serialised when we turn this into a JSON
teamSchema.set('toJSON', { virtuals: true });
teamSchema.set('toObject', { virtuals: true });

export default Team;
