const express = require('express');
const router = express.Router();
const customerClients = require('../controllers/customerController');

module.exports = function () {
    //Customers
    router.post('/customers', customerClients.new);
    router.get('/customers', customerClients.getCustomers);
    router.get('/customers/:id', customerClients.getCustomer);

    return router;
};
