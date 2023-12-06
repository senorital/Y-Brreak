const db = require('../Models');
const Admin = db.admin;
const User = db.user;

exports.isAdminPresent = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({
            where: {
                id: req.admin.id,
                email: req.admin.email
            }
        });
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Admin is not present!"
            })
        }
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.isUserPresent = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
                mobileNumber: req.user.mobileNumber
            }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not present!"
            })
        }
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}