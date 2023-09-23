const { User, Thought } = require("../models");

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId });
          if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
          }
          return res.status(200).json(thought);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
      
          const user = await User.findByIdAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
          );
      
          if (!user) {
            return res
              .status(404)
              .json({ message: "Thought created but no user with this id!" });
          }
      
          res.json({ message: "Thought successfully created!" });
        } catch (err) {
          res.json(err);
        }
      },
      async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId  },
            { $set: req.body },
            { runValidators: true, new: true }
          );
          if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" });
          }
          res.json(thought);
        } catch (err) {
          res.json(err);
        }
      },
      async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      
          if (!thought) {
            return res.status(404).json({ message: "No thought with this id!" });
          }
          res.json({ message: "Thought successfully deleted!" });
        } catch (err) {
          res.json(err);
        }
      },
      async addReaction(req, res) {
        try {
          const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true }
          );
    
          if (!reaction) {
            return res.status(404).json({ message: "No thought with that ID" });
          }
    
          return res.status(200).json(reaction);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      async deleteReaction(req, res) {
        try {
          const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!reaction) {
            return res
              .status(404)
              .json({ message: "Check thought and reaction ID" });
          }
    
          return res.status(200).json(reaction);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
}