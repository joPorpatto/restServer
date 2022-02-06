const bcryptjs = require("bcryptjs");
const { request } = require("express");
const { response } = require("express");



const Usuario = require('../models/usuario')



const  usuariosGet = async(req, res) => {

        const {limite=5,desde=0} = req.query
        
        //ambas prmesas en simultáneo
        const [total, usuarios] = await Promise.all([
                Usuario.count({estado: true}),
                Usuario.find({estado: true})
                        .skip(Number(desde))
                        .limit(Number(limite))

        ])
        
        res.json({
                total,
                usuarios
        });
}

const usuariosPost = async (req, res) => {        

        const {nombre,correo, password, rol} = req.body;
        const usuario = new Usuario({nombre, correo, password,rol});       

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password,salt)

        await usuario.save();
        
        res.json({                
                msg: 'post API controlador',
                usuario
        })
}




const usuariosPut = async(req, res) => {
        const id = req.params.id;

        const {_id,password,google,correo, ...resto} = req.body

        if (password) {
                const salt = bcryptjs.genSaltSync();
                resto.password = bcryptjs.hashSync(password,salt)
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto)

        res.json({               
                usuario
        })
}




const usuariosDelete =  async(req, res = response) => {
        const {id} = req.params;


        //fisicamente NO USAR porque se pierde integridad
        //const usuario = await Usuario.findByIdAndDelete(id)

        const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});



        res.json({                
                usuario
        })
}



const usuariosPatch = (req, res) => {
        res.json({
                
                msg: 'patch API controlador'

        })
}
module.exports = {
        usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPatch
}