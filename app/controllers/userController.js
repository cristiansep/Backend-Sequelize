const {User} = require('../models/index');

const getUsuarios = async(req,res) => {

    const users = await User.findAll({
        include: {
            association: 'domicilio',
            attributes: ['calle']
        },
        attributes: ['nombre', 'email']
    });

    res.json({
        ok:true,
        users,
    })

}


module.exports = {
    getUsuarios
}