import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    foundationDate: {
      type: String,
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

const Team = mongoose.model("Team", teamSchema);
export default Team;