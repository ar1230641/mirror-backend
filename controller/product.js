
const { mandatoryField } = require("../middleWare/validator");
const PRODUCT = require("../models/product");
const crypto = require('crypto');


async function generateUniqueSKU() {
    let randomSKU = generateRandomString(10);
    let sku = "FTXN" + randomSKU
    while (await isSkuTaken(sku)) {
        randomSKU = generateRandomString(3);
        sku = "FTXN" + randomSKU
    }
    return sku
}
function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').substring(0, 10);
}
async function isSkuTaken(sku) {
    const productSku = await PRODUCT.findOne({ sku: sku });
    return !!productSku;
}

exports.getAllProduct = async (req, res) => {
    try {
        let page = Number(req.query.page) || 0;
        let limit = Number(req.query.limit) || 10;
        let is_active = req.query.is_active;

        let skip = page * limit;
        let searchValue = req.query.searchValue

        let match = { is_active: is_active === 'true' ? true : false }
        if (searchValue && searchValue != "undefined") {
            match = { $or: [{ name: { "$regex": searchValue, "$options": 'i' } }, { description: { "$regex": searchValue, "$options": 'i' } }] }
        }
        const allProduct = await PRODUCT.aggregate([
            {
                "$facet": {
                    "totalData": [
                        { "$match": match },
                        { "$sort": { created_at: -1 } },
                        { "$skip": skip },
                        { "$limit": limit },
                    ],
                    "totalCount": [
                        { "$match": match },
                        {
                            "$group": {
                                "_id": null,
                                "count": { "$sum": 1 }
                            }
                        }
                    ]
                }
            }
        ])
        return res.json({
            status: true,
            statusCode: 201,
            response: allProduct,
        });
    } catch (error) {
        return res.json({
            status: false,
            statusCode: 422,
            message: "Some technincal Issue",
        });
    }
}

exports.newProduct = async (req, res) => {
    try {
        const { name, is_active, is_popular, stock, price, category, description, availabelOn, ratings } = req.body

        const required = mandatoryField(req.body, [
            'name', 'category', 'description', 'availabelOn', 'ratings', 'stock'
        ]);

        if (required.length > 0) {
            return res.status(422).json({ status: false, statusCode: 422, message: `${required} is required` });
        }
        const unique_sku = await generateUniqueSKU();
        console.log("unique_sku", unique_sku)

        const newProduct = new PRODUCT({ name, is_active, is_popular, price, category, description, availabelOn, ratings, sku: unique_sku, stock })
        const producData = await newProduct.save();
        return res.status(201).json({
            status: true,
            statusCode: 201,
            response: { producData }
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            statusCode: 422,
            message: `Some technincal Issue ${error}`,
        });
    }
}

exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const date = new Date();
        const { name, is_active, is_popular, stock, price, category, description, availabelOn, ratings } = req.body;

        const updateProduct = await PRODUCT.findByIdAndUpdate(id, { name, stock, is_active, is_popular, price, category, description, availabelOn, ratings, updated_at: date }, {
            new: true,
        });
        return res.status(201).json({
            status: true,
            statusCode: 201,
            response: updateProduct,
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            statusCode: 422,
            message: "Some technincal Issue",
        });
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await PRODUCT.deleteOne({ _id: id });
        console.log("deleteProduct", deleteProduct)
        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            statusCode: 422,
            message: "Some technincal Issue",
        });
    }
}



exports.oneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(422).json({
                success: false,
                statusCode: 422,
                message: "Please Provide id"
            })
        }

        const oneProduct = await PRODUCT.findById(id).lean().exec()
        return res.status(201).json({
            status: true,
            statusCode: 201,
            response: oneProduct,
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            statusCode: 422,
            message: "Some technincal Issue",
        });
    }
}


