import jwt from "jsonwebtoken";

const generateJWT = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

export default generateJWT;