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

// src/controllers/SessionController.ts
var import_prisma = __toESM(require_prisma());

// src/helpers/valideSession.ts
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

// src/controllers/SessionController.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = userSessionSchema.parse(req.body);
      const user = await import_prisma.default.user.findUnique({
        where: {
          email
        }
      });
      if (!user)
        return res.json({ message: "Usu\xE1rio n\xE3o existe." });
      const passwordChecked = import_bcryptjs.default.compareSync(senha, user.senha);
      if (!passwordChecked)
        return res.status(401).json({ message: "Falha na Autentica\xE7\xE3o." });
      const SECRET = process.env.SECRET;
      const token = import_jsonwebtoken.default.sign({
        id: user.id,
        role: user.role
      }, SECRET, {
        expiresIn: "3 days"
      });
      return res.status(200).json({ auth: true, token });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
    ;
  }
};
