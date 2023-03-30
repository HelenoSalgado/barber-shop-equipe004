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

// src/helpers/service/valideService.ts
var valideService_exports = {};
__export(valideService_exports, {
  serviceSchema: () => serviceSchema
});
module.exports = __toCommonJS(valideService_exports);
var import_zod = require("zod");
var serviceSchema = import_zod.z.object({
  nome: import_zod.z.string({
    required_error: "Nome do servi\xE7o \xE9 obrigat\xF3rio.",
    invalid_type_error: "Nome deve ser uma string."
  }).min(4, {
    message: "Nome do servi\xE7o deve conter no m\xEDnimo 4 caracteres."
  }).max(26, {
    message: "Nome do servi\xE7o deve conter no m\xE1ximo 26 caracteres."
  }),
  loja: import_zod.z.string({
    required_error: "Nome da loja \xE9 obrigat\xF3rio."
  }).min(2).max(20),
  preco: import_zod.z.string({
    required_error: "Pre\xE7o \xE9 obrigat\xF3rio."
  }).min(4).max(6),
  descricao: import_zod.z.string({
    required_error: "Descri\xE7\xE3o \xE9 obrigat\xF3ria."
  }).min(10, {
    message: "Descri\xE7\xE3o deve ter entre 10 e 100 caracteres."
  }).max(100)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  serviceSchema
});
