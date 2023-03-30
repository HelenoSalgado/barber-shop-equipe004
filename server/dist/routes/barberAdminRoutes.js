"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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
    var prisma = new import_client.PrismaClient();
    module2.exports = prisma;
  }
});

// src/helpers/service/valideService.ts
var import_zod, serviceSchema;
var init_valideService = __esm({
  "src/helpers/service/valideService.ts"() {
    "use strict";
    import_zod = require("zod");
    serviceSchema = import_zod.z.object({
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
  }
});

// src/controllers/BarberShop.ts
var require_BarberShop = __commonJS({
  "src/controllers/BarberShop.ts"(exports2, module2) {
    "use strict";
    var import_prisma = __toESM(require_prisma());
    init_valideService();
    var import_zod2 = require("zod");
    var BarberShopController = class {
      static async schedulingsShow(req, res) {
        try {
          const scheduling = await import_prisma.default.scheduling.findMany({
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
              },
              usuario: {
                select: {
                  nome: true,
                  telefone: true
                }
              }
            }
          });
          return res.status(200).json(scheduling);
        } catch (err) {
          res.status(400).json({ err: err.message });
        }
        ;
      }
      static async schedulingsSearch(req, res) {
        try {
          const schema = import_zod2.z.string({
            invalid_type_error: "Deve ser uma string."
          }).min(8, { message: "A data deve ter os 8 caracteres." });
          const data = schema.parse(req.body);
          const schedulingSearch = await import_prisma.default.scheduling.findMany({
            where: {
              data: {
                equals: data
              }
            },
            include: {
              servico: {
                select: {
                  nome: true,
                  preco: true
                }
              },
              usuario: {
                select: {
                  nome: true,
                  telefone: true
                }
              }
            }
          });
          if (schedulingSearch.length == 0)
            return res.status(400).json({ message: "Nenhum agendamento encontrado." });
          return res.status(200).json(schedulingSearch);
        } catch (err) {
          if (err instanceof import_zod2.z.ZodError) {
            return res.status(400).json({
              errors: err.errors.map(({ message, path }) => ({
                message,
                field: path.join(".")
              }))
            });
          }
          return res.status(500).json({
            message: "Internal server error"
          });
        }
        ;
      }
      static async usersShow(req, res) {
        try {
          const users = await import_prisma.default.user.findMany({
            select: {
              nome: true,
              email: true,
              telefone: true
            }
          });
          return res.status(200).json(users);
        } catch (err) {
          res.status(400).json({ err: err.message });
        }
        ;
      }
      static async serviceCreate(req, res) {
        try {
          const service = serviceSchema.parse(req.body);
          const createService = await import_prisma.default.service.create({
            data: service
          });
          return res.status(200).json(createService);
        } catch (err) {
          if (err instanceof import_zod2.z.ZodError) {
            return res.status(400).json({
              errors: err.errors.map(({ message, path }) => ({
                message,
                field: path.join(".")
              }))
            });
          }
          return res.status(500).json({
            message: "Internal server error"
          });
        }
        ;
      }
      static async servicesShow(req, res) {
        try {
          const services = await import_prisma.default.service.findMany({
            select: {
              id: true,
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            }
          });
          return res.status(200).json(services);
        } catch (err) {
          res.status(400).json({ err: err.message });
        }
        ;
      }
      static async serviceUpdate(req, res) {
        try {
          const service = serviceSchema.parse(req.body);
          const updateService = await import_prisma.default.service.update({
            where: { id: req.body.id },
            data: service
          });
          return res.status(200).json(updateService);
        } catch (err) {
          if (err instanceof import_zod2.z.ZodError) {
            return res.status(400).json({
              errors: err.errors.map(({ message, path }) => ({
                message,
                field: path.join(".")
              }))
            });
          }
          return res.status(400).json({ err });
        }
        ;
      }
      static async servicesDelete(req, res) {
        try {
          await import_prisma.default.service.delete({
            where: { id: req.body.id }
          });
          return res.status(200).json({ message: "Servi\xE7o deletado com sucesso." });
        } catch (err) {
          res.status(400).json({ err: err.message });
        }
        ;
      }
    };
    module2.exports = BarberShopController;
  }
});

// src/middlewares/authAdmin.ts
var require_authAdmin = __commonJS({
  "src/middlewares/authAdmin.ts"(exports2, module2) {
    "use strict";
    var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
    var import_dotenv = __toESM(require("dotenv"));
    import_dotenv.default.config();
    var SECRET = process.env.SECRET;
    function tokenAdmin(req, res, next) {
      const token = req.headers["x-acess-token"];
      import_jsonwebtoken.default.verify(token, SECRET, (err, decoded) => {
        if (err)
          return res.status(401).json({ err: "Voc\xEA n\xE3o tem permiss\xE3o, autentique-se novamente." });
        req.user = { id: decoded.sub, role: decoded.role };
        if (req.user.role != "ADMIN")
          return res.status(401).json({ message: "N\xE3o autorizado." });
        next();
      });
    }
    module2.exports = tokenAdmin;
  }
});

// src/routes/barberAdminRoutes.ts
var import_BarberShop = __toESM(require_BarberShop());
var import_express = __toESM(require("express"));
var import_authAdmin = __toESM(require_authAdmin());
var barberRoutes = import_express.default.Router();
barberRoutes.use(import_authAdmin.default);
barberRoutes.get("/agendamentos", import_BarberShop.default.schedulingsShow);
barberRoutes.get("/buscar/agendamento", import_BarberShop.default.schedulingsSearch);
barberRoutes.get("/usuarios", import_BarberShop.default.usersShow);
barberRoutes.post("/servico/criar", import_BarberShop.default.serviceCreate);
barberRoutes.put("/servico/atualizar", import_BarberShop.default.serviceUpdate);
barberRoutes.delete("/servico/deletar", import_BarberShop.default.servicesDelete);
module.exports = barberRoutes;
