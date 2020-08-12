// =======
// Puerto
// =======

process.env.PORT = process.env.PORT || 3000;

// =======
// Entorno
// =======

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======
// Vencimiento token
// =======
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =======
// SEED de autenticacion
// =======

process.env.SEMILLA = process.env.SEMILLA || 'secret';

// =======
// Base de datos
// =======

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO.URI;
}

process.env.URLDB = urlBD;
//'mongodb://root:0vKJKRughzCeiYmU@cluster0-ay88q.mongodb.net/cafeteria'
//

// =====================
// Google Client ID
// =====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '215107632445-58n59ij1miel04an96rn1p9uvuj66oq6.apps.googleusercontent.com';