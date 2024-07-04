import User from '../model/User.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})

        res.json({
            users,
            message: 'user fetch successfully ',
            error: false
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(400).json({
                message: 'All fields are required',
                error: true
            });
        }
        const userExists = await User.findOne({ "email": email });
        if (userExists) {
            return res.status(400).json({
                message: 'User already exists',
                error: true
            });
        }




        const user = await User.create({ firstName, lastName, email, password, role });
        res.status(201).json({
            message: 'User created successfully',
            error: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error',
            error: true
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, role } = req.body;
        const user = await User.findById(req.params.id);

        if (user) {
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
            user.role = role || user.role;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                role: updatedUser.role
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};