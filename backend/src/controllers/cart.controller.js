"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyCart = exports.updateItemQuantity = exports.removeItem = exports.addItem = exports.fetchCart = exports.getCart = void 0;
var database_1 = __importDefault(require("../database"));
// TODO add database/index typedef
var db = database_1.default;
// Fetch cart or create a new one
function getCart(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cartHash, cart, cart_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.headers["cart-hash"]) {
                        return [2 /*return*/, {
                                error: "cartHash is required"
                            }];
                    }
                    cartHash = req.headers["cart-hash"];
                    return [4 /*yield*/, db.cart.findOne({
                            where: {
                                cartHash: cartHash
                            },
                            include: [db.cartItem]
                        })];
                case 1:
                    cart = _a.sent();
                    console.log({ cart: cart, cartHash: cartHash });
                    if (!cart) return [3 /*break*/, 2];
                    return [2 /*return*/, { cart: cart }];
                case 2: return [4 /*yield*/, db.cart.create({
                        cartHash: cartHash,
                        lockCart: false
                    })];
                case 3:
                    cart_1 = _a.sent();
                    return [2 /*return*/, { cart: cart_1 }];
            }
        });
    });
}
exports.getCart = getCart;
// Fetch cart
function fetchCart(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cartFetchResult, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCart(req, res)];
                case 1:
                    cartFetchResult = _a.sent();
                    if ("error" in cartFetchResult) {
                        res.status(500).send(cartFetchResult.error);
                        return [2 /*return*/];
                    }
                    res.status(200).send(cartFetchResult.cart);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    res.status(500).send("Unable to fetch cart");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchCart = fetchCart;
// Add item 
function addItem(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productID_1, cartFetchResult, cartItem, err_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    productID_1 = req.body.productID;
                    if (!productID_1) {
                        res.status(400).send("productID is required");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getCart(req, res)];
                case 1:
                    cartFetchResult = _c.sent();
                    if ("error" in cartFetchResult) {
                        res.status(500).send(cartFetchResult.error);
                        return [2 /*return*/];
                    }
                    if (!("cart" in cartFetchResult)) {
                        res.status(500).send("Unable to fetch cart");
                        return [2 /*return*/];
                    }
                    if (cartFetchResult.cart.lockCart) {
                        res.status(400).send("Cart is locked");
                    }
                    cartItem = (_a = cartFetchResult.cart.CartItems) === null || _a === void 0 ? void 0 : _a.find(function (cartItem) { return cartItem.productID === productID_1; });
                    if (!cartItem) return [3 /*break*/, 2];
                    cartItem.update({
                        quantity: cartItem.quantity + 1
                    });
                    res.status(200).send("Item added to cart");
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, db.cartItem.create({
                        productID: productID_1,
                        quantity: 1,
                        cartID: (_b = cartFetchResult.cart) === null || _b === void 0 ? void 0 : _b.cartID
                    })];
                case 3:
                    _c.sent();
                    res.status(200).send("Item added to cart");
                    _c.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_2 = _c.sent();
                    console.log(err_2);
                    res.status(500).send("Unable to add item to cart");
                    return [2 /*return*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.addItem = addItem;
// remove item
function removeItem(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productID_2, cartFetchResult, cartItem, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    productID_2 = req.body.productID;
                    if (!productID_2) {
                        res.status(400).send("productID is required");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getCart(req, res)];
                case 1:
                    cartFetchResult = _a.sent();
                    if ("error" in cartFetchResult) {
                        res.status(500).send(cartFetchResult.error);
                        return [2 /*return*/];
                    }
                    if (cartFetchResult.cart.lockCart) {
                        res.status(400).send("Cart is locked");
                        return [2 /*return*/];
                    }
                    cartItem = cartFetchResult.cart.CartItems.find(function (cartItem) { return cartItem.productID === productID_2; });
                    if (cartItem) {
                        cartItem.destroy();
                        res.status(200).send("Item removed from cart");
                        return [2 /*return*/];
                    }
                    else {
                        res.status(400).send("Item not found in cart");
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    res.status(500).send("Unable to remove item from cart.");
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeItem = removeItem;
// updateItemQuantity
function updateItemQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cartFetchResult, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCart(req, res)];
                case 1:
                    cartFetchResult = _a.sent();
                    if ("error" in cartFetchResult) {
                        res.status(500).send(cartFetchResult.error);
                        return [2 /*return*/];
                    }
                    if (cartFetchResult.cart.lockCart) {
                        res.status(400).send("Cart is locked");
                        return [2 /*return*/];
                    }
                    cartFetchResult.cart.destroy();
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    res.status(500).send("Unable to update cart item quantity");
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateItemQuantity = updateItemQuantity;
// destroyCart
function destroyCart(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cartFetchResult, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCart(req, res)];
                case 1:
                    cartFetchResult = _a.sent();
                    if ("error" in cartFetchResult) {
                        res.status(500).send(cartFetchResult.error);
                        return [2 /*return*/];
                    }
                    if (cartFetchResult.cart.lockCart) {
                        res.status(400).send("Cart is locked");
                        return [2 /*return*/];
                    }
                    cartFetchResult.cart.destroy();
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    res.status(500).send("Unable to update cart item quantity");
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.destroyCart = destroyCart;
// placeOrder
