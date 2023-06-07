const { Router } = require('express');
const { body } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post( '/new', [
    body('name','Nombre es requerido').not().isEmpty(),
    body('email','El email es obligatorio').isEmail(),
    body('password','El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validateFields
] ,createUser );

router.post( '/', [
    body('email','El email es obligatorio').isEmail(),
    body('password','El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validateFields
], loginUser);
router.get( '/renew', validateJWT ,revalidateToken);

module.exports = router;