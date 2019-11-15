"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var colors_1 = __importDefault(require("colors"));
var commander_1 = __importDefault(require("commander"));
var figlet_1 = __importDefault(require("figlet"));
var lodash_1 = __importDefault(require("lodash"));
colors_1.default.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});
var StoreCore = /** @class */ (function () {
    function StoreCore() {
        this.tasksOpt = {};
        this.execsOpt = {};
        this.argsOpt = {};
    }
    StoreCore.register = function () {
        if (!StoreCore._this)
            StoreCore._this = new this;
        return StoreCore._this;
    };
    StoreCore.prototype.command = function (constructor, context) {
        return __awaiter(this, void 0, void 0, function () {
            var c, mode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = { version: '1.0.0' };
                        if (context)
                            c = context;
                        return [4 /*yield*/, new Promise(function (r) {
                                if (c.context) {
                                    figlet_1.default(c.context, function (err, data) {
                                        if (err) {
                                            console.log('Something went wrong...'.error);
                                            console.dir(err);
                                        }
                                        else {
                                            console.log(data[c.color || 'red']);
                                            r(data);
                                        }
                                    });
                                }
                                else {
                                    r(true);
                                }
                            })];
                    case 1:
                        _a.sent();
                        mode = new constructor;
                        return [4 /*yield*/, commander_1.default.version(c.version)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, lodash_1.default.map(this.execsOpt, function (v, k) {
                                commander_1.default.command(v).action(function () {
                                    var args = [];
                                    for (var _i = 0; _i < arguments.length; _i++) {
                                        args[_i] = arguments[_i];
                                    }
                                    return mode[k].apply(mode, args);
                                });
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, lodash_1.default.map(this.argsOpt, function (v, k) {
                                commander_1.default.arguments(v).action(function () {
                                    var args = [];
                                    for (var _i = 0; _i < arguments.length; _i++) {
                                        args[_i] = arguments[_i];
                                    }
                                    return mode[k].apply(mode, args);
                                });
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, lodash_1.default.map(this.tasksOpt, function (opt, key) {
                                var option = "-" + key.slice(0, 1) + ", --" + key + " [" + key + "]";
                                commander_1.default.option(option, opt && opt.explain);
                            })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, commander_1.default.parse(process.argv)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, lodash_1.default.map(this.tasksOpt, function (opt, key) {
                                if (commander_1.default[key])
                                    mode[key].apply(mode, [commander_1.default[key]]);
                            })];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StoreCore.prototype.execs = function (method, context) {
        this.execsOpt[method] = context;
    };
    StoreCore.prototype.tasks = function (method, context) {
        var _a;
        this.tasksOpt = __assign({}, this.tasksOpt, (_a = {}, _a[method] = context, _a));
    };
    StoreCore.prototype.args = function (methods, context) {
        this.argsOpt[methods] = context;
    };
    return StoreCore;
}());
exports.StoreCore = StoreCore;

//# sourceMappingURL=../sourcemaps/core/StoreCore.js.map
