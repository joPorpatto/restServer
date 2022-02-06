const Role = require("../models/role");
const {Usuario,Categoria,Producto} = require("../models");

const esRoleValido = async(rol = '' )=>{


        const existeRol = await  Role.findOne({rol});
        if (!existeRol) {
                throw new Error(`El rol ${rol} no esta registrado en bd`)                        
        }
}


const emailExiste = async (correo = '') =>{
        const existeEmail = await Usuario.findOne({correo});
        if (existeEmail) {
            throw new Error(`correo ${correo} registrado`) 
        }
}


const existeUsuarioId = async (id) =>{
        const existeId = await Usuario.findById(id);
        if (!existeId) {
            throw new Error(`Id ${id} no existe`) 
        }
}

const existeCategoriaPorId = async (id) =>{
        const existeCategoria = await Categoria.findById(id);
        if (!existeCategoria) {
            throw new Error(`El id ${id} no existe`) 
        }
}

const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const coleccionesPermitidas = (coleccion='', colecciones=[]) =>{


        const incluida = colecciones.includes(coleccion);
        if (!incluida) {
                throw new Error(`la coleccions ${coleccion} no esta permitida`);
        }

        return true

}

module.exports = {
        esRoleValido,emailExiste,existeUsuarioId,existeCategoriaPorId,
        existeProductoPorId,coleccionesPermitidas
}