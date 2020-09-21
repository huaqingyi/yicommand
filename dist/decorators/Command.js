"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("../core");
function Commander(props) {
    if (props._root && props._root() === YCommander) {
        core_1.DI.commanders.push(props);
        return props;
    }
    return function warpper(target) {
        core_1.DI.commanders.push(target);
        return target;
    };
}
exports.Commander = Commander;
function BootCommander(config) {
    return function warpper(target) {
        core_1.DI.bootstrap(config, target);
        return target;
    };
}
exports.BootCommander = BootCommander;
var YCommander = (function (_super) {
    tslib_1.__extends(YCommander, _super);
    function YCommander(ctx) {
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        return _this;
    }
    Object.defineProperty(YCommander.prototype, "_root", {
        get: function () {
            return YCommander;
        },
        enumerable: true,
        configurable: true
    });
    YCommander._root = function () {
        return YCommander;
    };
    return YCommander;
}(core_1.CommanderCore));
exports.YCommander = YCommander;

//# sourceMappingURL=../sourcemaps/decorators/command.js.map
