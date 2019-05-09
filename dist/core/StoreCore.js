"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
    }
    StoreCore.register = function () {
        if (!StoreCore._this)
            StoreCore._this = new this;
        return StoreCore._this;
    };
    StoreCore.prototype.command = function (constructor, context) {
        var _this_1 = this;
        var c = { version: '1.0.0' };
        if (context)
            c = context;
        return new Promise(function (r) {
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
        }).then(function (resp) {
            commander_1.default.version(c.version);
            return lodash_1.default.map(_this_1.execsOpt, function (v, k) {
                commander_1.default.command(k);
            });
        }).then(function (resp) {
            return lodash_1.default.map(_this_1.tasksOpt, function (opt, key) {
                var opts = '';
                if (opt && opt.option) {
                    if (lodash_1.default.isArray(opt.option))
                        opts = opt.option.join(',');
                    else
                        opts = opt.option;
                    if (opts)
                        opts = "[" + opts + "]";
                }
                var option = "-" + key.slice(0, 1) + ", --" + key + " " + opts;
                commander_1.default.option(option, opt && opt.explain);
            });
        }).then(function (resp) {
        }).then(function (resp) {
            commander_1.default.parse(process.argv);
            var mode = new constructor;
            lodash_1.default.map(_this_1.tasksOpt, function (opt, key) {
                if (commander_1.default[key])
                    mode[key](commander_1.default[key]);
            });
            return lodash_1.default.map(_this_1.execsOpt, function (v, k) {
                commander_1.default.action(mode[v].bind(mode));
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
    return StoreCore;
}());
exports.StoreCore = StoreCore;

//# sourceMappingURL=../sourcemaps/core/StoreCore.js.map
