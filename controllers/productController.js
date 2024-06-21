const Products = require('../models/Products');

const multer = require('multer');
const shortid = require('shortid');

const multerSetup = {
    storage: (fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        },
    })),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid Format'));
        }
    },
};

const upload = multer(multerSetup).single('image');

exports.uploadFile = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ message: error });
        }
        return next();
    });
};

exports.new = async (req, res, cb) => {
    const product = new Products(req.body);

    try {
        if (req.file) {
            product.image = req.file.filename;
        }
        await product.save();
        res.json({
            message: 'A new Product was added',
        });
    } catch (error) {
        console.log(error);
        cb();
    }
};

exports.all = async (req, res, cb) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        cb();
    }
};
exports.get = async (req, res, cb) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.json({ message: 'The product does not exist' });
        }
        return res.json(product);
    } catch (error) {
        console.log(error);
        cb();
    }
};
exports.update = async (req, res, cb) => {
    try {
        let oldProduct = await Products.findById(req.params.id);

        let newProduct = req.body;

        if (req.file) {
            newProduct.image = req.file.filename;
        } else {
            newProduct.image = oldProduct.image;
        }

        let product = await Products.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            newProduct,
            { new: true }
        );

        res.json(product);
    } catch (error) {
        console.log(error);
        cb();
    }
};
exports.delete = async (req, res, cb) => {
    try {
        await Products.findOneAndDelete({
            _id: req.params.id,
        });

        res.json({ message: 'Product Delete!!!' });
    } catch (error) {
        console.log(error);
        cb();
    }
};
