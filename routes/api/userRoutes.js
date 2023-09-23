const router = require('express').Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getUserByID)
.put(updateUser)
.delete(deleteUser);

router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(deleteFriend);

module.exports = router;