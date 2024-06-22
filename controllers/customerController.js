const Customers = require('../models/Customers');

exports.new = async (req, res, cb) => {
    const customer = new Customers(req.body);

    try {
        await customer.save();
        return res.json({
            message: 'A new client was added',
        });
    } catch (error) {
        console.log(error);
        return res.status(409).send('Invalid Operation');
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
    try {
        const customer = await Customers.findById(req.params.id);
        if (!customer) {
            return res.json({ message: 'The client does not exist' });
        }
        return res.json(customer);
    } catch (error) {
        console.log(error);
        cb();
    }
};
exports.updateCustomer = async (req, res, cb) => {
    try {
        const customer = await Customers.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            req.body,
            { new: true }
        );

        res.json(customer);
    } catch (error) {
        console.log(error);
        return res.status(403).send('Invalid Operation');
        cb();
    }
};
exports.deleteCustomer = async (req, res, cb) => {
    try {
        await Customers.findOneAndDelete({
            _id: req.params.id,
        });

        res.json({ message: 'Customer Delete!!!' });
    } catch (error) {
        console.log(error);
        return res.status(403).send('Invalid Operation');
        cb();
    }
};
