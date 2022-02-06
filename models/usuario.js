const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
        nombre: {
                type: String,
                required:[true,'nombre obligatorio']

},
        correo:{
                type: String,
                required: [true,'correo obligatorio'],
                unique: true
        },
        password:{
                type: String,
                required: [true,'contraseña obligatoria'],
        },
        img:{
                type: String,
        },
        rol:{
                type: String,
                required: true,
                default: 'USER_ROLE',
                emun: ['ADMIN_ROLE', 'USER_ROLE']

        },
        estado:{
                type: Boolean,
                default:true
        },
        google:{
                type:Boolean,
                default: false
        },

});

UsuarioSchema.methods.toJSON = function () {
        const {__v, password, _id,...usuario} = this.toObject();
        usuario.uid=_id;
        return usuario;
}


module.exports = model('Usuario', UsuarioSchema)