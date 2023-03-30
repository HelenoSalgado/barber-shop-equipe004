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

// src/helpers/user/valideUserUpdate.ts
var valideUserUpdate_exports = {};
__export(valideUserUpdate_exports, {
  userUpdateSchema: () => userUpdateSchema
});
module.exports = __toCommonJS(valideUserUpdate_exports);
var import_zod = require("zod");
var userUpdateSchema = import_zod.z.object({
  id: import_zod.z.string({
    required_error: "id \xE9 obrigat\xF3rio",
    invalid_type_error: "id deve ser do tipo string"
  }),
  nome: import_zod.z.string({
    required_error: "Nome \xE9 obrigat\xF3rio.",
    invalid_type_error: "N\xE3o \xE9 um nome v\xE1lido."
  }).min(2).max(26),
  telefone: import_zod.z.number({
    required_error: "Telefone \xE9 obrigat\xF3rio.",
    invalid_type_error: "N\xE3o \xE9 do tipo num\xE9rico."
  }),
  senha: import_zod.z.any((0, import_zod.optional)((0, import_zod.string)()))
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userUpdateSchema
});
