const jwt = require('jsonwebtoken');

// ========================
// Verificar Token
// ========================

let verificarToken = (req, res, next) => {

    //Capturamos el token en el Header de la peticion
    let token = req.get('token');

    // token, secret y callback
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        //Se carga la información al request de donde se hizo la petición
        req.usuario = decoded.usuario;

        //Para que continue la ejecucion
        next();

    });

    console.log('Token: ', token);

    /*res.json({
        token
    });*/
};


// ========================
// Verificar AdminRole
// ========================

let verificarAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    console.log('Nombre --> ' + usuario.nombre);
    console.log('Role --> ' + usuario.role);

    if (usuario.role !== 'ADMIN_ROLE') {

        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

    //Para que continue la ejecucion
    next();

    console.log('Rol de ADMIN');
};


module.exports = {
    verificarToken,
    verificarAdmin_Role
}