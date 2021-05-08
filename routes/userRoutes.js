const express = require('express');
const userController = require('E:/PERSONAL/avi folder/NODE.js/complete-node-bootcamp-master/4-natours/starter/controllers/userController.js')
const router = express.Router();

router.route('/').get(userController.getAllUser).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);
module.exports = router;