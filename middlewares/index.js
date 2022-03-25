
const validaCampos = require('../middlewares/validar-campos');
const validatJwt = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validatJwt,
    ...validaRoles
}
