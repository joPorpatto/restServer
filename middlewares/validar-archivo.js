const validarArchivoSubir = (req, res, next) =>{


        if (!req.files || Object.keys(req.files).length === 0) {
                res.status(400).json({msg: "no hay archivos que subir - validar archivo a subir"});
                return;
        }
         if (!req.files.archivo) {
                res.status(400).json({msg: "no hay archivos que subir"});
                return;
        }

        next();

}

module.exports = {
        validarArchivoSubir
}