const express = require('express');
const router = express.Router();
const customerClients = require('../controllers/customerController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

module.exports = function () {
    //Customers
    router.post('/customers', customerClients.new);
    router.get('/customers', customerClients.getCustomers);
    router.get('/customers/:id', customerClients.getCustomer);
    router.put('/customers/:id', customerClients.updateCustomer);
    router.delete('/customers/:id', customerClients.deleteCustomer);

    //Products
    router.post(
        '/products',
        productController.uploadFile,
        productController.new
    );
    router.get('/products', productController.all);
    router.get('/products/:id', productController.get);
    router.put(
        '/products/:id',
        productController.uploadFile,
        productController.update
    );
    router.delete('/products/:id', productController.delete);

    //Orders
    router.post('/orders', orderController.new);
    router.get('/orders', orderController.all);
    router.get('/orders/:id', orderController.get);
    router.put('/orders/:id', orderController.update);
    router.delete('/orders/:id', orderController.delete);

    return router;
};
