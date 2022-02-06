const { request } = require("express")
const { response } = require("express")
const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario")




const validarJWT = async(req=request,res=response,next) =>{

        const token = req.header('x-token');
        console.log(token);

        if (!token) {
                return res.status(401).json({
                        msg:'no hay token'
                })
        }



        try {

                const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
                const usuario = await  Usuario.findById(uid);

               
                if (!usuario    ) {
                        return res.status(401).json({
                                msg:'token no valido - usuario con no existe en DB'
                        })
                }
                //validacion si el usuario no fue borrado
                if (!usuario.estado    ) {
                        return res.status(401).json({
                                msg:'token no valido - usuario con estado false'
                        })
                }


                req.usuario = usuario;
                next();
                
        } catch (error) {
                console.log(error)      
                res.status(401).json({
                        msg: "Token no valido"
                })

        }


}


module.exports = {
        validarJWT
}