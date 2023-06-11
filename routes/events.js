const { Router } = require('express');
const { body } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validateFields');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use(validateJWT)

router.get( '/', getEvents );

router.post( '/',[
    body( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
    body( 'start', 'Fecha de inicio es obligatoria' ).custom(isDate),
    body( 'end', 'Fecha de inicio es obligatoria' ).custom(isDate),
    validateFields
], createEvent);

router.put( '/:id', [
    body( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
    body( 'start', 'Fecha de inicio es obligatoria' ).custom(isDate),
    body( 'end', 'Fecha de inicio es obligatoria' ).custom(isDate),
    validateFields
], updateEvent);

router.delete( '/:id', deleteEvent);

module.exports = router;