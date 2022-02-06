const { Router } = require("express");
const { check } = require("express-validator");
const { 
        usuariosGet,
        usuariosDelete, 
        usuariosPut, 
        usuariosPost, 
        usuariosPatch 
} = require("../controllers/usuarios");

const { esRoleValido, emailExiste,existeUsuarioId } = require("../helpers/db-validators");
const {validarCampos,validarJWT,tieneRole} = require('../middlewares');
const router = Router();

////////////////////////////GET
router.get('/',  usuariosGet);
////////////////////////////POST
router.post('/',  [
        check('correo','correo no valido').isEmail(),
        check('correo').custom(emailExiste),
        check('nombre','nombre obligatorio').not().isEmpty(),
        check('password',"password debe de tener 6 letras minimo").isLength({min:6}),
        // check('rol', 'no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),       
        check('rol').custom(esRoleValido ),
        validarCampos
]  ,usuariosPost);
////////////////////////////PUT
router.put('/:id', [
        check('id','no es un id valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        check('rol').custom(esRoleValido),
        validarCampos

] ,usuariosPut);
////////////////////////////DELETE
router.delete('/:id',[
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE','NOSE_ROLE'),
        check('id','no es un id valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos
],usuariosDelete);
        
////////////////////////////PATCH
router.patch('/',usuariosPatch);



module.exports = router