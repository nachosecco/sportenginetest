import User from '../models/User.js';
import Role from '../models/Role.js';

const checkRole = (roleGroups) => async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('roles');
  if (!user) {
    return res.status(404).json({msg: "User not found"});
  }
  const userRoles = user.roles.map(role => role.name);
  const validRoles = await Role.find({ name: { $in: roleGroups } });
  if (!validRoles.some(role => userRoles.includes(role.name))) {
    return res.status(403).json({msg: "You do not have permission to perform this action"});
  }
  next();
}
export default checkRole;