"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexIncoming = exports.PeerType = void 0;
var PeerType;
(function (PeerType) {
    PeerType["User"] = "user";
    PeerType["Group"] = "chat";
})(PeerType = exports.PeerType || (exports.PeerType = {}));
exports.RegexIncoming = {
    hasGF: /появилась | есть | замутил /,
    lostGF: /расстал | растал | разошлись | перестали | потерял | лох /,
    groupMention: /\[club205505790.*]/
};
//# sourceMappingURL=types.js.map