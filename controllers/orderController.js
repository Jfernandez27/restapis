const Orders = require('../models/Orders');

exports.new = async (req, res, next) => {
    const order = new Orders(req.body);
    try {
        await order.save();
        res.json({ message: 'New order added' });
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.all = async (req, res, next) => {
    try {
        const orders = await Orders.find({}).populate('customer').populate({
            path: 'order.product',
            model: 'Products',
        });

        res.json(orders);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.get = async (req, res, next) => {
    const order = await Orders.findById(req.params.id)
        .populate('customer')
        .populate({
            path: 'order.product',
            model: 'Products',
        });

    if (!order) {
        res.json({ message: 'Order number does not exist' });
        return next();
    }

    res.json(order);
};

exports.update = async (req, res, next) => {
    try {
        let order = await Orders.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        )
            .populate('customer')
            .populate({
                path: 'order.product',
                model: 'Products',
            });

        res.json(order);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.delete = async (req, res, next) => {
    try {
        await Orders.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'The Order has been deleted' });
    } catch (error) {
        console.log(error);
        next();
    }
};
