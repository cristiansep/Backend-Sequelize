const {Address} = require('../models/index');

const getDirecciones = async(req,res) => {

    const addresses = await Address.findAll({
        attributes: ['calle']
    });

    res.json({
        ok:true,
        addresses,
        msg: 'Hola desde getDirecciones'
    })

}


module.exports = {
    getDirecciones
}