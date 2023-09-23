const { User, Thought } = require("../models");

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
            .populate({ path: 'thoughts', select: '-__v' });
            if (!users) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
            return res.status(200).json(users);
          } catch (err) {
            res.status(500).json(err);
          }
        },
    async getUserByID(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
          .populate({ path: 'thoughts', select: '-__v' });
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          return res.status(200).json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'No course with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          res.json({ message: 'User deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
      },
}