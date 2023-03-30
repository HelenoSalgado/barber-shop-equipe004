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

// src/helpers/user/processDataUser.ts
var import_short_unique_id, import_bcryptjs, generateSenha, generateId;
var init_processDataUser = __esm({
  "src/helpers/user/processDataUser.ts"() {
    "use strict";
    import_short_unique_id = __toESM(require("short-unique-id"));
    import_bcryptjs = __toESM(require("bcryptjs"));
    generateSenha = (senha) => {
      const salt = import_bcryptjs.default.genSaltSync(10);
      senha = import_bcryptjs.default.hashSync(senha, salt);
      return senha;
    };
    generateId = () => {
      const generateId2 = new import_short_unique_id.default({ length: 6 });
      return generateId2();
    };
  }
});

// src/helpers/service/verifyIdService.ts
var require_verifyIdService = __commonJS({
  "src/helpers/service/verifyIdService.ts"(exports2, module2) {
    "use strict";
    var verifyIdService = (id_servico) => {
      return id_servico.map((id) => ({ id }));
    };
    module2.exports = verifyIdService;
  }
});

// src/helpers/scheduling/valideScheduling.ts
var import_zod, schedulingSchema;
var init_valideScheduling = __esm({
  "src/helpers/scheduling/valideScheduling.ts"() {
    "use strict";
    import_zod = require("zod");
    schedulingSchema = import_zod.z.object({
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
      }),
      data: import_zod.z.string({
        required_error: "Data \xE9 obrigat\xF3ria."
      }).min(7, {
        message: "Data incompleta."
      }),
      hora: import_zod.z.string({
        required_error: "Hora \xE9 obrigat\xF3ria."
      }).min(4, {
        message: "Hora deve ter no m\xEDnimo 4 caracteres."
      }),
      id_servico: import_zod.z.number({
        required_error: "O valor de id_servi\xE7o deve ser um array com pelo menos um servi\xE7o.",
        invalid_type_error: "O id do servi\xE7o deve ser um n\xFAmero dentro de um array."
      }).array().nonempty({
        message: "\xC9 necess\xE1rio pelo menos um servi\xE7o para o agendamento."
      })
    });
  }
});

// src/helpers/scheduling/valideUpdateScheduling.ts
var import_zod2, schedulingUpdateSchema;
var init_valideUpdateScheduling = __esm({
  "src/helpers/scheduling/valideUpdateScheduling.ts"() {
    "use strict";
    import_zod2 = require("zod");
    schedulingUpdateSchema = import_zod2.z.object({
      id: import_zod2.z.string({
        required_error: "Id \xE9 obrigat\xF3rio."
      }),
      data: import_zod2.z.string({
        required_error: "Data \xE9 obrigat\xF3ria."
      }).min(7, {
        message: "Data incompleta."
      }),
      hora: import_zod2.z.string({
        required_error: "Hora \xE9 obrigat\xF3ria."
      }).min(4, {
        message: "Hora deve ter no m\xEDnimo 4 caracteres."
      }),
      id_servico: import_zod2.z.number({
        required_error: "O valor de id_servi\xE7o deve ser um array com pelo menos um servi\xE7o.",
        invalid_type_error: "O id do servi\xE7o deve ser um n\xFAmero dentro de um array."
      }).array().nonempty({
        message: "\xC9 necess\xE1rio pelo menos um servi\xE7o para o agendamento."
      })
    });
  }
});

// src/controllers/SchedulingController.ts
var require_SchedulingController = __commonJS({
  "src/controllers/SchedulingController.ts"(exports2, module2) {
    "use strict";
    var import_prisma = __toESM(require_prisma());
    init_processDataUser();
    var import_verifyIdService = __toESM(require_verifyIdService());
    init_valideScheduling();
    var import_zod5 = require("zod");
    init_valideUpdateScheduling();
    var SchedulingController2 = class {
      static async create(req, res) {
        try {
          const { nome, email, telefone, senha, data, hora, id_servico } = schedulingSchema.parse(req.body);
          const senhahash = generateSenha(senha);
          const id = generateId();
          const idService = (0, import_verifyIdService.default)(id_servico);
          const userExist = await import_prisma.default.user.findUnique({
            where: { email }
          });
          if (userExist) {
            return res.status(200).json({
              message: "Usu\xE1rio j\xE1 existe."
            });
          }
          ;
          const createScheduling = await import_prisma.default.scheduling.create({
            data: {
              id,
              data,
              hora,
              servico: {
                connect: idService
              },
              usuario: {
                create: {
                  id,
                  nome,
                  email,
                  telefone: telefone.toString(),
                  senha: senhahash
                }
              }
            },
            include: {
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
                  id: true,
                  nome: true,
                  telefone: true,
                  email: true
                }
              }
            }
          });
          return res.status(200).json(createScheduling);
        } catch (err) {
          if (err instanceof import_zod5.z.ZodError) {
            return res.status(400).json({
              errors: err.errors.map(({ message, path }) => ({
                message,
                field: path.join(".")
              }))
            });
          }
          return res.status(400).json({ err: err.message });
        }
        ;
      }
      static async show(req, res) {
        try {
          const schedulings = await import_prisma.default.scheduling.findUnique({
            where: { usuarioId: req.body.id },
            select: {
              data: true,
              hora: true,
              servico: {
                select: {
                  id: true,
                  nome: true,
                  loja: true,
                  preco: true,
                  descricao: true
                }
              }
            }
          });
          if (!schedulings)
            return res.status(400).json({ message: "Sem agendamento" });
          return res.status(200).json(schedulings);
        } catch (err) {
          res.status(400).json({ err: err.message });
        }
        ;
      }
      static async update(req, res) {
        try {
          const { id, data, hora, id_servico } = schedulingUpdateSchema.parse(req.body);
          const idService = (0, import_verifyIdService.default)(id_servico);
          const user = await import_prisma.default.scheduling.upsert({
            where: { usuarioId: id },
            create: {
              id,
              data,
              hora,
              servico: {
                connect: idService
              },
              usuario: {
                connect: {
                  id
                }
              }
            },
            update: {
              data,
              hora,
              servico: {
                set: [],
                connect: idService
              }
            }
          });
          return res.status(200).json(user);
        } catch (err) {
          if (err instanceof import_zod5.z.ZodError) {
            return res.status(400).json({
              errors: err.errors.map(({ message, path }) => ({
                message,
                field: path.join(".")
              }))
            });
          }
          return res.status(400).json({ err: err.message });
        }
        ;
      }
      static async delete(req, res) {
        try {
          await import_prisma.default.scheduling.delete({
            where: { id: req.body.id }
          });
          return res.status(200).json({
            message: "Agendamento deletado com sucesso."
          });
        } catch (err) {
          res.status(400).json({ err: err.message });
        }
        ;
      }
    };
    module2.exports = SchedulingController2;
  }
});

// src/helpers/user/valideUserUpdate.ts
var import_zod3, userUpdateSchema;
var init_valideUserUpdate = __esm({
  "src/helpers/user/valideUserUpdate.ts"() {
    "use strict";
    import_zod3 = require("zod");
    userUpdateSchema = import_zod3.z.object({
      id: import_zod3.z.string({
        required_error: "id \xE9 obrigat\xF3rio",
        invalid_type_error: "id deve ser do tipo string"
      }),
      nome: import_zod3.z.string({
        required_error: "Nome \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 um nome v\xE1lido."
      }).min(2).max(26),
      telefone: import_zod3.z.number({
        required_error: "Telefone \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 do tipo num\xE9rico."
      }),
      senha: import_zod3.z.any((0, import_zod3.optional)((0, import_zod3.string)()))
    });
  }
});

// src/helpers/user/valideUser.ts
var import_zod4, userSchema;
var init_valideUser = __esm({
  "src/helpers/user/valideUser.ts"() {
    "use strict";
    import_zod4 = require("zod");
    userSchema = import_zod4.z.object({
      nome: import_zod4.z.string({
        required_error: "Nome \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 um nome v\xE1lido."
      }).min(2, {
        message: "Nome de ter entre 2 e 26 caracteres."
      }).max(26, {
        message: "Nome deve ter entre 2 e 26 caracteres."
      }),
      email: import_zod4.z.string({
        required_error: "Email \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 uma string."
      }).email({
        message: "N\xE3o \xE9 um email v\xE1lido."
      }),
      telefone: import_zod4.z.number({
        required_error: "Telefone \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 do tipo num\xE9rico."
      }),
      senha: import_zod4.z.string({
        required_error: "Senha \xE9 obrigat\xF3ria.",
        invalid_type_error: "A senha deve conter letras e n\xFAmeros."
      }).min(6, {
        message: "Senha deve ter entre 6 e 8 caracteres."
      }).max(8, {
        message: "Senha deve ter entre 6 e 8 caracteres."
      })
    });
  }
});

// src/controllers/UserController.ts
var require_UserController = __commonJS({
  "src/controllers/UserController.ts"(exports2, module2) {
    "use strict";
    var import_prisma = __toESM(require_prisma());
    var import_zod5 = require("zod");
    init_valideUserUpdate();
    init_valideUser();
    init_processDataUser();
    var UserController2 = class {
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
          if (err instanceof import_zod5.z.ZodError) {
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
    module2.exports = UserController2;
  }
});

// src/middlewares/tokenUser.ts
var require_tokenUser = __commonJS({
  "src/middlewares/tokenUser.ts"(exports2, module2) {
    "use strict";
    var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
    var import_dotenv = __toESM(require("dotenv"));
    import_dotenv.default.config();
    var SECRET = process.env.SECRET;
    function tokenUser2(req, res, next) {
      const token = req.headers["x-acess-token"];
      import_jsonwebtoken.default.verify(token, SECRET, (err, decoded) => {
        if (err)
          return res.status(401).json({ err: "Voc\xEA n\xE3o tem permiss\xE3o, autentique-se novamente." });
        req.userId = decoded.userId;
        next();
      });
    }
    module2.exports = tokenUser2;
  }
});

// src/routes/userRoutes.ts
var import_express = __toESM(require("express"));
var import_SchedulingController = __toESM(require_SchedulingController());
var import_UserController = __toESM(require_UserController());
var import_tokenUser = __toESM(require_tokenUser());
var userRoutes = import_express.default.Router();
userRoutes.use(import_tokenUser.default);
userRoutes.get("/agendamento/buscar", import_SchedulingController.default.show);
userRoutes.put("/agendamento/atualizar", import_SchedulingController.default.update);
userRoutes.delete("/agendamento/deletar", import_SchedulingController.default.delete);
userRoutes.get("/buscar", import_UserController.default.show);
userRoutes.put("/atualizar", import_UserController.default.update);
userRoutes.delete("/deletar", import_UserController.default.delete);
module.exports = userRoutes;
