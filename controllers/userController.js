const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);
    try {
        await user.save();
        return res.json({
            message: 'User registered successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send('Invalid Operation');
    }
};
exports.login = async (req, res, cb) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
    });
    if (!user) {
        return res.status(401).json({ message: 'The user does not exist' });
        cb();
    } else {
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Incorrect password' });
            cb();
        } else {
            const token = jwt.sign(
                {
                    email: user.email,
                    name: user.name,
                    id: user._id,
                },
                'SECRET',
                { expiresIn: '1h' }
            );

            res.json({ token });
        }
    }
};
