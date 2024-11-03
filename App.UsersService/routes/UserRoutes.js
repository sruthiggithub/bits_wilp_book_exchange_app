'use strict';   

Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");

var UserController_1 = require("../controllers/UserController");
var router = express_1.Router();
router.post('/', UserController_1.createUser);
router.get('/', UserController_1.getUsers);
router.get('/:id', UserController_1.getUserById);
router.put('/:id', UserController_1.updateUser);
router.delete('/:id', UserController_1.deleteUser);

exports.default = router;


