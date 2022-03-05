const Producto = require("../models/producto");
const bcryptjs = require('bcryptjs')


const productosGet = async (req, res) => {

    //const producto = await Producto.find()

    const { limite = 5, desde = 0 } = req.query

    const paramatros = { estado: true }


    const [total, usuarios ] = await Promise.all([
        Producto.countDocuments(paramatros),
        Producto.find(paramatros)
        .skip(Number (desde))
        .limit(Number(limite))

    ])

    // const productos = await Productos.find(paramatros)
    //         .skip(Number (desde))
    //         .limit(Number(limite))
    
    // const total = await Usuario.countDocuments(paramatros)

    res.status(200).json({

        total,
        productos
    })

}

const productosPost = async (req, res) => {

    const { nombre, estado, precio, descripcion } = req.body
    console.log(nombre, estado, precio, descripcion);
    

    const producto = new Producto( {nombre, estado, precio, descripcion} )

    
    //Guardar en la base de datos
    await producto.save()

    res.status(200).json({

        producto
      
    })

}


const productosPut = async(req, res) => {

    const { id } = req.params

    const { uid, google, password, ...resto } = req.body


    if ( password ) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const producto = await Producto.findByIdAndUpdate(id, resto)



    res.status(200).json(producto)

}


const productosDelete = async(req, res) => {

    const { id } = req.params
    const producto = await Producto.findByIdAndUpdate( id, { estado: false })

    res.status(200).json(producto)

}


module.exports = {
    productosGet,
    productosPost,
    productosPut,
    productosDelete
}
