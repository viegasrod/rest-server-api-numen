const Usuario = require("../models/usuario");


const usuariosGet = (req, res) => {

    const { limite } = req.query;

    res.status(200).json({

        msg: 'GET USUARIOS',
        limite
    })

}

const usuariosPost = async (req, res) => {

    const body = req.body

    const usuario = new Usuario(body)

    await usuario.save()

    res.status(200).json({

        msg: 'POST USUARIOS',
        usuario
      
    })

}


const usuariosPut = (req, res) => {

    const { id } = req.params

    res.status(200).json({

        msg: 'PUT USUARIOS',
        id
        
    })

}


const usuariosDelete = (req, res) => {

    const { id } = req.params

    res.status(200).json({

        msg: 'DELETE USUARIOS',
        id
        
    })

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}


