const {Router} = require('express');
const {listusers} = require('../directorio/users')

const router = Router();

//http://localhost:3000/api/v1/users/
router.get('/', listusers);

module.exports = router;