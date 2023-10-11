const {Router} = require('express');
const {listusers, listuserbyid} = require('../directorio/users')

const router = Router();

//http://localhost:3000/api/v1/users/
router.get('/', listusers);
router.get('/:id', listuserbyid);

module.exports = router;