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
    var placeOrder = require('../src/controllers/order.controller').placeOrder;
    var addItem = require('../src/controllers/cart.controller').addItem;
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
    // placeOrder unit tests
    test('placeOrder should return a 400 status if the cart is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        headers: {
                            'cart-hash': "cartHash4"
                        },
                        body: {
                            ccNum: "5555555555554444",
                            ccExpiry: "12/24",
                            ccCVV: "000"
                        }
                    };
                    return [4 /*yield*/, placeOrder(req, res)];
                case 1:
                    _a.sent();
                    expect(res.status).toHaveBeenCalledWith(400);
                    return [2 /*return*/];
            }
        });
    }); });
    test('placeOrder should return a 400 if credit card number is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        headers: {
                            'cart-hash': "cartHash5"
                        },
                        body: {
                            ccNum: "superInvalidCardNumber",
                            ccExpiry: "12/24",
                            ccCVV: "000"
                        }
                    };
                    return [4 /*yield*/, placeOrder(req, res)];
                case 1:
                    _a.sent();
                    expect(res.status).toHaveBeenCalledWith(400);
                    return [2 /*return*/];
            }
        });
    }); });
    test('placeOrder should return a 400 if credit card expiry is the past', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        headers: {
                            'cart-hash': "cartHash6"
                        },
                        body: {
                            ccNum: "5555555555554444",
                            ccExpiry: "12/22",
                            ccCVV: "000"
                        }
                    };
                    return [4 /*yield*/, placeOrder(req, res)];
                case 1:
                    _a.sent();
                    expect(res.status).toHaveBeenCalledWith(400);
                    return [2 /*return*/];
            }
        });
    }); });
    test('placeOrder should return a 200 if checking out with a valid cart', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addItemReq, placeOrderReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addItemReq = {
                        headers: {
                            'cart-hash': "cartHash3"
                        },
                        body: {
                            // ProductID one will already exist from seed data.
                            productID: 1,
                            quantity: 1
                        }
                    };
                    return [4 /*yield*/, addItem(addItemReq, res)];
                case 1:
                    _a.sent();
                    placeOrderReq = {
                        headers: {
                            'cart-hash': "cartHash7"
                        },
                        body: {
                            ccNum: "5555555555554444",
                            ccExpiry: "12/24",
                            ccCVV: "000"
                        }
                    };
                    return [4 /*yield*/, placeOrder(placeOrderReq, res)];
                case 2:
                    _a.sent();
                    expect(res.status).toHaveBeenCalledWith(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
