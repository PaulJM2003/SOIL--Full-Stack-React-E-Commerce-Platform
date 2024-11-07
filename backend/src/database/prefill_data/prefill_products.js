"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.addPrefillProducts = void 0;
var fs = __importStar(require("fs"));
var prefill_products = [
    {
        productID: 1,
        name: "Cheddar Cheese (-/pound)",
        category: "diarys",
        price: 2.50,
        description: 'Example description',
        isFeatured: false,
        stock: 100,
    },
    {
        productID: 2,
        name: "Carton of Milk (1-gallon)",
        category: "diarys",
        price: 2.50,
        description: 'Example description',
        isFeatured: false,
        stock: 100,
    },
    {
        productID: 3,
        name: "Greek Yogurt (20oz)",
        category: "diarys",
        price: 3.00,
        isFeatured: false,
        stock: 100,
        description: 'Example description',
    },
    {
        productID: 4,
        name: "Brie Cheese (-/pound)",
        category: "diarys",
        price: 5.00,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 10.00,
    },
    {
        productID: 5,
        name: "Apple (-/pound)",
        category: "fruits",
        price: 1.50,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 2.50,
    },
    {
        productID: 6,
        name: "Bananas (-/pound)",
        category: "fruits",
        price: 0.50,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 1.00,
    },
    {
        productID: 7,
        name: "Orange (-/pound)",
        category: "fruits",
        price: 1.00,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 1.50,
    },
    {
        productID: 8,
        name: "Green Grapes (-/pound)",
        category: "fruits",
        price: 2.00,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 4.00,
    },
    {
        productID: 9,
        name: "Red Bell Pepper (-/each)",
        category: "veg",
        price: 0.50,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 1.50,
    },
    {
        productID: 10,
        name: "Broccoli (-/bunch)",
        category: "veg",
        price: 1.50,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 2.50,
    },
    {
        productID: 11,
        name: "Carrot (-/pound)",
        category: "veg",
        price: 0.50,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 1.00,
    },
    {
        productID: 12,
        name: "Spinach (-/bunch)",
        category: "veg",
        price: 2.50,
        description: 'Example description',
        isFeatured: false,
        stock: 100, // 4.50,
    },
];
function addPrefillProducts(db) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, prefill_products_1, product, promiseArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.productImage.destroy({ where: {} })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.product.destroy({ where: {} })];
                case 2:
                    _a.sent();
                    _i = 0, prefill_products_1 = prefill_products;
                    _a.label = 3;
                case 3:
                    if (!(_i < prefill_products_1.length)) return [3 /*break*/, 6];
                    product = prefill_products_1[_i];
                    return [4 /*yield*/, db.product.create(product)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log('Prefill products added');
                    return [4 /*yield*/, db.product.findAll()];
                case 7:
                    promiseArr = (_a.sent()).map(function (product) {
                        return db.productImage.create({
                            image: fs.readFileSync("src/database/prefill_data/images/product_".concat(product.productID, ".png")),
                            productID: product.productID
                        });
                    });
                    return [4 /*yield*/, Promise.all(promiseArr)];
                case 8:
                    _a.sent();
                    console.log('Prefill product images added');
                    return [2 /*return*/];
            }
        });
    });
}
exports.addPrefillProducts = addPrefillProducts;
;
