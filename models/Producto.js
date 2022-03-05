const { Schema, model } = require('mongoose')



const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
        unique: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    Precio: {
        type: Number,
        default:false
                
    },
    Descripcion: {
        type: String,
        //required: [true, 'La descripcion es obligatoria'],
        
    },
    
})

ProductoSchema.methods.toJSON = function() {

    const { __v, password, _id, ...producto } = this.toObject();
    producto.uid = _id

    return producto
}


module.exports = model('Producto', ProductoSchema)