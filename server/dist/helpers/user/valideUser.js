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

// src/helpers/user/valideUser.ts
var valideUser_exports = {};
__export(valideUser_exports, {
  userSchema: () => userSchema
});
module.exports = __toCommonJS(valideUser_exports);
var import_zod = require("zod");
var userSchema = import_zod.z.object({
  nome: import_zod.z.string({
    required_error: "Nome \xE9 obrigat\xF3rio.",
    invalid_type_error: "N\xE3o \xE9 um nome v\xE1lido."
  }).min(2, {
    message: "Nome de ter entre 2 e 26 caracteres."
  }).max(26, {
    message: "Nome deve ter entre 2 e 26 caracteres."
  }),
  email: import_zod.z.string({
    required_error: "Email \xE9 obrigat\xF3rio.",
    invalid_type_error: "N\xE3o \xE9 uma string."
  }).email({
    message: "N\xE3o \xE9 um email v\xE1lido."
  }),
  telefone: import_zod.z.number({
    required_error: "Telefone \xE9 obrigat\xF3rio.",
    invalid_type_error: "N\xE3o \xE9 do tipo num\xE9rico."
  }),
  senha: import_zod.z.string({
    required_error: "Senha \xE9 obrigat\xF3ria.",
    invalid_type_error: "A senha deve conter letras e n\xFAmeros."
  }).min(6, {
    message: "Senha deve ter entre 6 e 8 caracteres."
  }).max(8, {
    message: "Senha deve ter entre 6 e 8 caracteres."
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userSchema
});
