const {Router} = require('express');
const {listusers, listuserbyid, addUser} = require('../directorio/users')

const router = Router();

//http://localhost:3000/api/v1/users/
router.get('/', listusers);
router.get('/:id', listuserbyid);
router.put('/', addUser);

module.exports = router;