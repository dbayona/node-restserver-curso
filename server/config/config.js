// ========================
// Puerto
// ========================

process.env.PORT = process.env.PORT || 3000;

// ========================
// Entorno
// ========================

//Variable de Entorno de HEROKU
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
// Vencimiento del Token
// ========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = '48h'; //60 * 60 * 24 * 30;


// ========================
// SEED de autenticacion
// =======================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ========================
// Base de Datos
// ========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ========================
// Google Client ID
// ========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '249975425874-nghj4hj8jmpl9ko1l1ea5ibhshpikq7t.apps.googleusercontent.com';