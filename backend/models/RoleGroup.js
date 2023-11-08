import mongoose from "mongoose";

const roleGroupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RoleGroup = mongoose.model("RoleGroup", roleGroupSchema);
export default RoleGroup;