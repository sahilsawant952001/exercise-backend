const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    try {
        const token = req.body.authToken;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        
        if(String(req.body.email) !== String(decoded.email)){ 
            return res.status(401).json({
                success:false,
                message: 'unauthorized user jj'
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message: 'unauthorized user'
        });
    }
};