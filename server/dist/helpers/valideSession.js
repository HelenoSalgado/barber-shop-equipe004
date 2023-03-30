"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/helpers/valideSession.ts
var valideSession_exports = {};
__export(valideSession_exports, {
  userSessionSchema: () => userSessionSchema
});
module.exports = __toCommonJS(valideSession_exports);
var import_zod = require("zod");
var userSessionSchema = import_zod.z.object({
  email: import_zod.z.string({
    required_error: "Email \xE9 obrigat\xF3rio."
  }).email({
    message: "N\xE3o \xE9 um email v\xE1lido."
  }),
  senha: import_zod.z.string({
    required_error: "Senha \xE9 obrigat\xF3ria."
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userSessionSchema
});
