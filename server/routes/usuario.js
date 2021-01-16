const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificarToken, verificarAdmin_Role } = require('../middleware/autenticacion');

const app = express();

//Obtener todos los usuarios con paginacion
//Se utiliza un middleware verificarToken
app.get('/usuario', verificarToken, (req, res) => {

    /*return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    });*/

    let desde = Number(req.query.desde) || 0;

    let limite = Number(req.query.limite) || 5;

    let condicion = { estado: true };

    //Excluyendo campos: se pasa como 2do argumento al metodo find los campos que solo se quieren mostrar
    Usuario.find(condicion, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //count -- countDocuments | count esta deprecado
            Usuario.countDocuments(condicion, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });
        });

    //res.json('get Usuario');
});

//Crear Usuario
app.post('/usuario', [verificarToken, verificarAdmin_Role], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        google: body.google
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    /*if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }*/
});

//Actualizar usuario
app.put('/usuario/:id', [verificarToken, verificarAdmin_Role], (req, res) => {
    let id = req.params.id;

    //Arreglo con los campos que permitire actualizar, por medio de la dependencia: underscore
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //options --> {new: true} -- devuelve el objeto modificado de la bd
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.save

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//Eliminar usuario
app.delete('/usuario/:id', [verificarToken, verificarAdmin_Role], (req, res) => {

    let id = req.params.id;

    //Arreglo con los campos que permitire actualizar, por medio de la dependencia: underscore
    //let body = _.pick(req.body, ['estado']);

    let data = {
        estado: false
    };

    //options --> {new: true} -- devuelve el objeto modificado de la bd
    Usuario.findByIdAndUpdate(id, data, { new: true }, (err, usuarioBorrado) => {

        //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

    //res.json('delete Usuario');
});

module.exports = app;