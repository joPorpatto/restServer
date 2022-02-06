const bcryptjs = require("bcryptjs")
const { response } = require("express")
const { json } = require("express/lib/response")
const { generarJWT } = require("../helpers/generarJWT")
const { googleVerify } = require("../helpers/google-verify")
const Usuario = require("../models/usuario")


const login = async (req, res=response) =>{
        const {correo,password} = req.body
        
        
        try {


                //mail existe

                //usuario activ
                const usuario = await Usuario.findOne({correo});
                if (!usuario) {
                        return res.status(400),json({
                                msg: ' USUARIO / pass no son correctos'
                        })
                }

                 if (!usuario.estado) {
                        return res.status(400),json({
                                msg: ' USUARIO / pass no son correctos estado'
                        })
                }

                const  validPassw = bcryptjs.compareSync(password, usuario.password)
                if (!validPassw) {
                        return res.status(400).json({
                                msg: 'USUARIO / pass no son correctos'
                        })
                }

                //genererar JWT
                const token = await generarJWT(usuario.id)


                res.json({
                        usuario,
                        token
        })
        } catch (error) {
                return res.status(500).json({
                        msg:'Hable con el admin'
                })
        }
        
        
        
       

}


const googleSignIn = async( req,res=response) =>{
        const {id_token} = req.body


        try {

                const {correo,nombre,img}   = await googleVerify(id_token);
                let usuario = await Usuario.findOne({correo});

                if (!usuario)   {
                        const data  = {
                                nombre,
                                correo,
                                password: "abc",
                                img,
                                google:true,
                                rol:"ADMIN_ROLE"
                        };

                        usuario = new Usuario(data);
                        await usuario.save();
                }


                // si usuario en DB 
                if (!usuario.estado) {
                     return res.status(401).json({
                             msg: "hable con el admin, usuario bloqueado"
                     })   
                }

                // generar JWT

                const token = await generarJWT(usuario.id)

                
                res.json({

                        usuario,
                        token
                      
                })
        
        
        } catch (error) {
                console.log(error)
                res.status(400).json({
                        'ok': false,
                        'msg': 'El token de google no es valido'
                })
                
        }
}

module.exports = { 
        login,googleSignIn
}