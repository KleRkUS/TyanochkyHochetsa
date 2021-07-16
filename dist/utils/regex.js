"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexIncoming = void 0;
exports.regexIncoming = {
    register: `начать|рег[^\\[\\d]*|следи|начни|ищет|не наш`,
    remove: `забей|удали|оставь|remove|delete|стоп|хватит|кик[^\\[\\d]*`,
    hasFound: `появил[^\\[\\d]*|есть|замутил[^\\[\\d]*|наш[^\\[\\d]*`,
    hasLost: `раз[^\\[\\d]*|рас[^\\[\\d]*|перестали|потерял[^\\[\\d]*|лох`,
    groupMention: `\\[club205505790.*]`,
    userMention: `\\[id(\\\d*)\\|`,
    female: `тян[^\\[\\d]*|жен[^\\[\\d]*|дев[^\\[\\d]*`,
    male: `кун[^\\[\\d]*|муж[^\\[\\d]*|маль[^\\[\\d]*`
};
//# sourceMappingURL=regex.js.map