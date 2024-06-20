const Customers = require('../models/Customers');

exports.new = async (req, res, cb) => {
    const customer = new Customers(req.body);

    try {
        await customer.save();
        res.json({
            message: 'A new client was added',
        });
    } catch (error) {
        console.log(error);
        cb();
    }
};

exports.getCustomers = async (req, res, cb) => {
    try {
        const customers = await Customers.find({});
        res.json(customers);
    } catch (error) {
        console.log(error);
        cb();
    }
};
exports.getCustomer = async (req, res, cb) => {
    const customer = await Customers.findById(req.params.id);
    if (!customer) {
        res.json({ message: 'The client does not exist' });
        cb();
    }
    res.json(customer);
};
