const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');


const SessionController = require('./app/controllers/SessionController');
const SpotController = require('./app/controllers/SpotController');
const DashboardController = require('./app/controllers/DashboardController');
const BookingController = require('./app/controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/session', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spot/:spot_id/booking', BookingController.store);

module.exports = routes;