"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/database/prisma.ts
var require_prisma = __commonJS({
  "src/database/prisma.ts"(exports2, module2) {
    "use strict";
    var import_client = require("@prisma/client");
    var prisma2 = new import_client.PrismaClient();
    module2.exports = prisma2;
  }
});

// src/controllers/UserController.ts
var import_prisma = __toESM(require_prisma());
var import_zod3 = require("zod");

// src/helpers/user/valideUserUpdate.ts
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

// src/helpers/user/valideUser.ts
var import_zod2 = require("zod");
var userSchema = import_zod2.z.object({
  nome: import_zod2.z.string({
    required_error: "Nome \xE9 obrigat\xF3rio.",
    invalid_type_error: "N\xE3o \xE9 um nome v\xE1lido."
  }).min(2, {
    message: "Nome de ter entre 2 e 26 caracteres."
  }).max(26, {
    message: "Nome deve ter entre 2 e 26 caracteres."
  }),
  email: import_zod2.z.string({
    required_error: "Email \xE9 obrigat\xF3rio.",
    invalid_type_error: "N\xE3o \xE9 uma string."
  }).email({
    message: "N\xE3o \xE9 um email v\xE1lido."
  }),
  telefone: import_zod2.z.number({
    required_error: "Telefone \xE9 obrigat\xF3rio.",
    invalid_type_error: "N\xE3o \xE9 do tipo num\xE9rico."
  }),
  senha: import_zod2.z.string({
    required_error: "Senha \xE9 obrigat\xF3ria.",
    invalid_type_error: "A senha deve conter letras e n\xFAmeros."
  }).min(6, {
    message: "Senha deve ter entre 6 e 8 caracteres."
  }).max(8, {
    message: "Senha deve ter entre 6 e 8 caracteres."
  })
});

// src/helpers/user/processDataUser.ts
var import_short_unique_id = __toESM(require("short-unique-id"));
var import_bcryptjs = __toESM(require("bcryptjs"));
var generateSenha = (senha) => {
  const salt = import_bcryptjs.default.genSaltSync(10);
  senha = import_bcryptjs.default.hashSync(senha, salt);
  return senha;
};
var generateId = () => {
  const generateId2 = new import_short_unique_id.default({ length: 6 });
  return generateId2();
};

// src/controllers/UserController.ts
var UserController = class {
  static async create(req, res) {
    try {
      const { nome, email, telefone, senha } = userSchema.parse(req.body);
      const senhahash = generateSenha(senha);
      const id = generateId();
      const userExist = await import_prisma.default.user.findUnique({
        where: { email }
      });
      if (userExist)
        return res.json({ message: "Usu\xE1rio j\xE1 existe." });
      const user = await import_prisma.default.user.create({
        data: {
          id,
          nome,
          email,
          telefone: telefone.toString(),
          senha: senhahash
        },
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true
        }
      });
      return res.json(user);
    } catch (err) {
      if (err instanceof import_zod3.z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map(({ message, path }) => ({
            message,
            field: path.join(".")
          }))
        });
      }
      ;
      res.status(400).json({ err: err.message });
    }
    ;
  }
  static async show(req, res) {
    try {
      const user = await import_prisma.default.user.findUnique({
        where: { id: req.body.id },
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          agendamento: {
            select: {
              data: true,
              hora: true,
              servico: {
                select: {
                  nome: true,
                  loja: true,
                  preco: true,
                  descricao: true
                }
              }
            }
          }
        }
      });
      return res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
    ;
  }
  static async update(req, res) {
    try {
      const { id, nome, telefone, senha } = userUpdateSchema.parse(req.body);
      const senhahash = generateSenha(senha);
      const user = await import_prisma.default.user.update({
        where: { id },
        data: {
          nome,
          telefone: telefone.toString(),
          senha: senhahash
        },
        select: {
          nome: true,
          email: true,
          telefone: true
        }
      });
      return res.json(user);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
    ;
  }
  static async delete(req, res) {
    try {
      await import_prisma.default.user.delete({
        where: { id: req.body.id }
      });
      return res.json({
        message: "Usu\xE1rio deletado com sucesso."
      });
    } catch (err) {
      res.status(400).json({ err });
    }
    ;
  }
};
module.exports = UserController;
