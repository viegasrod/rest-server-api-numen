
const { Router } = require('express');
const { productosGet,productosPost,productosPut,productosDelete } = require('../controllers/productos');
const { check } = require('express-validator');
const { validarCampos } = require('../helpers/validar-campos');
const { emailExiste } = require('../middlewares/existeEmail');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router()


router.get('/', productosGet);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que ser mas de 6 digitos').isLength({ min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom( emailExiste ),
    validarCampos
] , productosPost )

router.put('/:id', productosPut)

router.delete('/:id',[
    validarJWT,
    esAdminRole
], productosDelete)


module.exports = router