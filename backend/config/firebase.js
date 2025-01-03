const admin = require('firebase-admin');
const serviceAccount = require('../ver-1-7a8c3-firebase-adminsdk-cig5r-c16f0fbbc6.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

module.exports = admin; 