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
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
/**
 * Cart controller "Unit" testing.
 * In an ideal world the DB should be properly mocked as well,
 * but the current implementation of the cart controller
 * makes that difficult without a refactor.
 */
describe('Cart Controller', function () {
    var res;
    (0, dotenv_1.config)({
        path: './.env_hburr'
    });
    var _db = require('../src/database');
    var _a = require('../src/controllers/cart.controller'), getCart = _a.getCart, addItem = _a.addItem, destroyCart = _a.destroyCart, removeItem = _a.removeItem, updateItemQuantity = _a.updateItemQuantity;
    beforeEach(function () {
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    // getCart unit test
    test('getCart should always return a cart', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        headers: {
                            'cart-hash': "cartHash1"
                        }
                    };
                    return [4 /*yield*/, destroyCart(req, res)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getCart(req, res)];
                case 2:
                    cart = _a.sent();
                    expect(cart).toEqual({ cart: expect.any(Object) });
                    return [2 /*return*/];
            }
        });
    }); });
    // addItem unit test
    test('addItem should add items to the list of CartItems', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, result, cartResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        headers: {
                            'cart-hash': "cartHash2"
                        },
                        body: {
                            // ProductID one will already exist from seed data.
                            productID: 1,
                            quantity: 1
                        }
                    };
                    return [4 /*yield*/, destroyCart(req, res)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, addItem(req, res)];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, getCart(req, res)];
                case 3:
                    cartResult = _a.sent();
                    expect(res.status).toHaveBeenCalledWith(200);
                    expect(cartResult.cart.CartItems[0].productID).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('removeItem should remove an item added to the cart', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, result, cartResult, removeReq, removeResult, cartAfterRemove;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        headers: {
                            'cart-hash': "cartHash3"
                        },
                        body: {
                            // ProductID one will already exist from seed data.
                            productID: 1,
                            quantity: 1
                        }
                    };
                    return [4 /*yield*/, destroyCart(req, res)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, addItem(req, res)];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, getCart(req, res)];
                case 3:
                    cartResult = _a.sent();
                    expect(res.status).toHaveBeenCalledWith(200);
                    expect(cartResult.cart.CartItems[0].productID).toEqual(1);
                    removeReq = {
                        headers: {
                            'cart-hash': "cartHash3"
                        },
                        body: {
                            productID: 1
                        }
                    };
                    return [4 /*yield*/, destroyCart(req, res)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, removeItem(removeReq, res)];
                case 5:
                    removeResult = _a.sent();
                    return [4 /*yield*/, getCart(removeReq, res)];
                case 6:
                    cartAfterRemove = _a.sent();
                    expect(res.status).toHaveBeenCalledWith(200);
                    expect(cartAfterRemove.cart.CartItems.length).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
