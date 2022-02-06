const { Router } = require("express");
const { check } = require("express-validator");

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();


//obtener todas las categorias PUBLIC
router.get('/',obtenerCategorias);


//obtener una categoria por id PUBLIC
router.get('/:id',[
        check('id','No es un id de mongo valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos,
],obtenerCategoria)



//crear una categoria por id PRIVATE con token
router.post('/',[
        validarJWT,
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        validarCampos
], crearCategoria);


// ],(req,res) =>{
//         res.json('post')
// })


//actualizar una categoria por id PRIVATE con token
router.put('/:id',[
        validarJWT,
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('id').custom(existeCategoriaPorId),
        validarCampos,
],actualizarCategoria)



//delete una categoria si es admin
router.delete('/:id',[
        validarJWT,
        esAdminRole,
        check('id','No es un id de mongo valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos,

],borrarCategoria)


module.exports = router;