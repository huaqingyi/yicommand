"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var commander_1 = require("commander");
var colors_1 = tslib_1.__importDefault(require("colors"));
var figlet_1 = require("figlet");
var CommanderCore = (function () {
    function CommanderCore() {
    }
    CommanderCore.prototype.input = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        throw new Error("not extends input ...");
    };
    CommanderCore.prototype.output = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        throw new Error("not extends output ...");
    };
    return CommanderCore;
}());
exports.CommanderCore = CommanderCore;
var DICore = (function () {
    function DICore() {
        this.commanders = [];
    }
    DICore.prototype.proxyClass = function (target, ctx, config) {
        if (config === void 0) { config = {}; }
        return new Proxy(new target(ctx), {
            get: function (t, name) {
                if (t[name]) {
                    return t[name];
                }
                var type = Reflect.getMetadata('design:type', t, name);
                var value = config[name];
                if (type === Array && typeof (value) === 'string') {
                    return value.split(',');
                }
                return value;
            },
            set: function (t, name, value) {
                t[name] = value;
                return true;
            }
        });
    };
    DICore.prototype.mappingCommander = function (target, program, ctx) {
        if (ctx === void 0) { ctx = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var comm;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        comm = target.prototype;
                        lodash_1.map(comm.options, function (desc, key) {
                            var type = Reflect.getMetadata('design:type', comm, key);
                            if (desc.required === false) {
                                return program.option("-" + key.substring(0, 1) + ", --" + key + " " + _this.formatTypes(type, key), desc.description);
                            }
                            else {
                                return program.requiredOption("-" + key.substring(0, 1) + ", --" + key + " " + _this.formatTypes(type, key), desc.description);
                            }
                        });
                        return [4, Promise.all(lodash_1.map(comm.actions, function (a) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var cs, returntype, idx;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            cs = commander_1.command(a.name);
                                            cs.description(a.description);
                                            if (!(a.children === true)) return [3, 5];
                                            return [4, a.action.apply(comm)];
                                        case 1:
                                            returntype = _a.sent();
                                            idx = this.commanders.indexOf(returntype);
                                            if (!(idx !== -1)) return [3, 3];
                                            return [4, this.mappingCommander(returntype, cs, this.proxyClass(target, program, program))];
                                        case 2:
                                            _a.sent();
                                            return [3, 4];
                                        case 3: throw new Error("\u5B50\u547D\u4EE4\u7ED1\u5B9A\u9519\u8BEF: " + target.name + "->" + a.name + "->" + returntype.name + " ...");
                                        case 4: return [3, 6];
                                        case 5:
                                            cs.action(function (config) {
                                                var commIns = _this.proxyClass(target, ctx, config.parent || {});
                                                return a.action.apply(commIns, [commIns]);
                                            });
                                            _a.label = 6;
                                        case 6: return [2, program.addCommand(cs)];
                                    }
                                });
                            }); }))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    DICore.prototype.formatTypes = function (type, name) {
        switch (type) {
            case String: return "<" + name + ">";
            case Array: return "[" + name + "]";
            default: return "<" + name + ">";
        }
    };
    DICore.prototype.bootstrap = function (config, target) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var text, _a, _b, _c, _d, v, _e, program;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4, config.context];
                    case 1:
                        text = _f.sent();
                        if (!lodash_1.isFunction(config.context)) return [3, 3];
                        return [4, config.context()];
                    case 2:
                        text = _f.sent();
                        _f.label = 3;
                    case 3:
                        _b = (_a = console).log;
                        _d = (_c = colors_1.default)[config.color || 'red'];
                        return [4, figlet_1.textSync(text, config)];
                    case 4:
                        _b.apply(_a, [_d.apply(_c, [_f.sent()])]);
                        if (!lodash_1.isFunction(config.version)) return [3, 6];
                        return [4, config.version()];
                    case 5:
                        _e = _f.sent();
                        return [3, 8];
                    case 6: return [4, config.version];
                    case 7:
                        _e = _f.sent();
                        _f.label = 8;
                    case 8:
                        v = _e;
                        program = commander_1.createCommand();
                        program.version(v);
                        return [4, this.mappingCommander(target, program)];
                    case 9:
                        _f.sent();
                        return [4, program.parse(process.argv)];
                    case 10:
                        _f.sent();
                        return [2];
                }
            });
        });
    };
    return DICore;
}());
exports.DICore = DICore;
exports.DI = new DICore();

//# sourceMappingURL=../sourcemaps/core/core.js.map
