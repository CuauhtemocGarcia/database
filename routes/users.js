const {Router} = require('express');
const {listusers, listuserbyid, addUser, deleteuser, updateUser, signinUser} = require('../directorio/users')

const router = Router();

//http://localhost:3000/api/v1/users/
router.get('/', listusers);
router.get('/:id', listuserbyid);
router.post('/', signinUser);
router.put('/', addUser);
router.patch('/:id', updateUser);
router.delete('/:id',deleteuser)

module.exports = router;