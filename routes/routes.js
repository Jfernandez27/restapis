const express = require('express');
const router = express.Router();
const customerClients = require('../controllers/customerController');

module.exports = function () {
    //Customers
    router.post('/customers', customerClients.new);
    router.get('/customers', customerClients.getCustomers);
    router.get('/customers/:id', customerClients.getCustomer);
    router.put('/customers/:id', customerClients.updateCustomer);
    router.delete('/customers/:id', customerClients.deleteCustomer);

    return router;
};
