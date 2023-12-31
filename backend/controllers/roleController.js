import Role from '../models/Role.js';

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getRoles };