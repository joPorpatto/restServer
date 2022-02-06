const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const path = require('path');
const fs = require('fs');


const cargarArchivo =  async(req,res=response) =>{
   
      

        try {
                // const nombre = await subirArchivo(req.files,['png','otraextension'],'textos');

                const nombre = await subirArchivo(req.files,undefined,'imgs');
                res.json({
                        nombre
                })
                
        } catch (error) {
                res.status(400).json({error})
        }


}


const actualizarImagen = async(req,res=response) =>{

        const {id, coleccion} = req.params;
        let modelo;
        switch (coleccion) {
                case 'usuarios':

                        //verificacion
                        modelo = await Usuario.findById(id);
                        if (!modelo) {
                                return res.status(400).json({
                                        msg: 'no existe usuario con el id'
                                })
                        }
                        
                        break;

                case 'productos':

                        //verificacion
                        modelo = await Producto.findById(id);
                        if (!modelo) {
                                return res.status(400).json({
                                        msg: 'no existe producto con el id'
                                })
                        }
                        
                        break;
        
                default:
                        return res.status(500).json({msg: 'se olvidó validar acá'});
        }
        // console.log(req.files.archivos)
        // return


        //limpiar si esta duplicado
       if ( modelo.img ) {
               console.log(modelo.img)
                // Hay que borrar la imagen del servidor
                const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
                if ( fs.existsSync( modelo.img ) ) {
                        console.log(true)
                        fs.unlinkSync( modelo.img );
                }
    }

        try {
                const nombre = await subirArchivo( req.files , undefined , coleccion);
                 modelo.img = nombre;
                 await modelo.save();
                 res.json(modelo);
                
        } catch (error) {
                console.log(error)
        }


}


const mostrarImagen = async(req,res=response) =>{


      const {id, coleccion} = req.params;

        let modelo;
        
        switch (coleccion) {
                case 'usuarios':

                        //verificacion
                        modelo = await Usuario.findById(id);
                        if (!modelo) {
                                return res.status(400).json({
                                        msg: 'no existe usuario con el id'
                                })
                        }
                        
                        break;

                case 'productos':

                        //verificacion
                        modelo = await Producto.findById(id);
                        if (!modelo) {
                                return res.status(400).json({
                                        msg: 'no existe producto con el id'
                                })
                        }
                        
                        break;
        
                default:
                        return res.status(500).json({msg: 'se olvidó validar acá'});
        }
        // console.log(req.files.archivos)
        // return


        //limpiar si esta duplicado
       if ( modelo.img ) {
                // Hay que borrar la imagen del servidor
                const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
                if ( fs.existsSync( modelo.img ) ) {
//                        console.log(true)
                        return  res.sendFile( modelo.img );
                }
            }


            const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
            res.sendFile(pathImagen)


}




const actualizarImagenCloudinary = async(req,res=response) =>{

        const {id, coleccion} = req.params;
        let modelo;
        switch (coleccion) {
                case 'usuarios':

                        //verificacion
                        modelo = await Usuario.findById(id);
                        if (!modelo) {
                                return res.status(400).json({
                                        msg: 'no existe usuario con el id'
                                })
                        }
                        
                        break;

                case 'productos':

                        //verificacion
                        modelo = await Producto.findById(id);
                        if (!modelo) {
                                return res.status(400).json({
                                        msg: 'no existe producto con el id'
                                })
                        }
                        
                        break;
        
                default:
                        return res.status(500).json({msg: 'se olvidó validar acá'});
        }
        // console.log(req.files.archivos)
        // return


        //limpiar si esta duplicado
        if ( modelo.img ) {
                const nombreArr = modelo.img.split('/');
                const nombre    = nombreArr[ nombreArr.length - 1 ];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy( public_id );
        }

        const {tempFilePath} = req.files.archivo

         const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
         modelo.img = secure_url;
         await modelo.save();
        res.json(modelo)
        


}


module.exports = {
        cargarArchivo,
        actualizarImagen,
        mostrarImagen,
        actualizarImagenCloudinary
}