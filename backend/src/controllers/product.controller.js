"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEnrichedProduct = exports.fetchProduct = exports.fetchAllProducts = void 0;
var database_1 = __importDefault(require("../database"));
// TODO add database/index typedef
var db = database_1.default;
function fetchAllProducts(req, res) {
    var _a, _b, _c, _d, _e, _f;
    var filters = {
        category: (_c = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.category) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : undefined,
        isFeatured: (_f = ((_e = (_d = req.query) === null || _d === void 0 ? void 0 : _d.isFeatured) === null || _e === void 0 ? void 0 : _e.toString()) === "true") !== null && _f !== void 0 ? _f : undefined,
    };
    console.log(filters);
    // https://stackoverflow.com/questions/35592394/remove-falsy-values-in-object
    var validFilters = Object.entries(filters).reduce(function (a, _a) {
        var k = _a[0], v = _a[1];
        return (!v ? a : (a[k] = v, a));
    }, {});
    db.product.findAll({
        where: validFilters
    }).then(function (products) {
        res.send(products);
    }).catch(function (err) {
        console.log(err);
        res.status(500).send("Unable to fetch products");
    });
    return res;
}
exports.fetchAllProducts = fetchAllProducts;
function fetchProduct(req, res) {
    var productID = req.params.id;
    if (!productID) {
        res.status(400).send("Product ID is required");
        return;
    }
    db.product.findOne({
        where: {
            productID: productID
        }
    }).then(function (products) {
        res.send(products);
    }).catch(function (err) {
        res.status(500).send("Unable to fetch products");
    });
    return res;
}
exports.fetchProduct = fetchProduct;
function fetchEnrichedProduct(req, res) {
    var productID = req.params.id;
    if (!productID) {
        res.status(400).send("Product ID is required");
        return;
    }
    db.product.findOne({
        where: {
            productID: productID
        },
        include: [
            db.productImage,
            // review
        ]
    }).then(function (products) {
        res.send(products);
    }).catch(function (err) {
        res.status(500).send("Unable to fetch products");
    });
    return res;
}
exports.fetchEnrichedProduct = fetchEnrichedProduct;
