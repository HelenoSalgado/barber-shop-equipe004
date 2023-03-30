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
    var import_zod7 = require("zod");
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
          const schema = import_zod7.z.string({
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
          if (err instanceof import_zod7.z.ZodError) {
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
          if (err instanceof import_zod7.z.ZodError) {
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
          if (err instanceof import_zod7.z.ZodError) {
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
var import_zod2, schedulingSchema;
var init_valideScheduling = __esm({
  "src/helpers/scheduling/valideScheduling.ts"() {
    "use strict";
    import_zod2 = require("zod");
    schedulingSchema = import_zod2.z.object({
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

// src/helpers/scheduling/valideUpdateScheduling.ts
var import_zod3, schedulingUpdateSchema;
var init_valideUpdateScheduling = __esm({
  "src/helpers/scheduling/valideUpdateScheduling.ts"() {
    "use strict";
    import_zod3 = require("zod");
    schedulingUpdateSchema = import_zod3.z.object({
      id: import_zod3.z.string({
        required_error: "Id \xE9 obrigat\xF3rio."
      }),
      data: import_zod3.z.string({
        required_error: "Data \xE9 obrigat\xF3ria."
      }).min(7, {
        message: "Data incompleta."
      }),
      hora: import_zod3.z.string({
        required_error: "Hora \xE9 obrigat\xF3ria."
      }).min(4, {
        message: "Hora deve ter no m\xEDnimo 4 caracteres."
      }),
      id_servico: import_zod3.z.number({
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
    var import_zod7 = require("zod");
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
          if (err instanceof import_zod7.z.ZodError) {
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
          if (err instanceof import_zod7.z.ZodError) {
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
var import_zod4, userUpdateSchema;
var init_valideUserUpdate = __esm({
  "src/helpers/user/valideUserUpdate.ts"() {
    "use strict";
    import_zod4 = require("zod");
    userUpdateSchema = import_zod4.z.object({
      id: import_zod4.z.string({
        required_error: "id \xE9 obrigat\xF3rio",
        invalid_type_error: "id deve ser do tipo string"
      }),
      nome: import_zod4.z.string({
        required_error: "Nome \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 um nome v\xE1lido."
      }).min(2).max(26),
      telefone: import_zod4.z.number({
        required_error: "Telefone \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 do tipo num\xE9rico."
      }),
      senha: import_zod4.z.any((0, import_zod4.optional)((0, import_zod4.string)()))
    });
  }
});

// src/helpers/user/valideUser.ts
var import_zod5, userSchema;
var init_valideUser = __esm({
  "src/helpers/user/valideUser.ts"() {
    "use strict";
    import_zod5 = require("zod");
    userSchema = import_zod5.z.object({
      nome: import_zod5.z.string({
        required_error: "Nome \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 um nome v\xE1lido."
      }).min(2, {
        message: "Nome de ter entre 2 e 26 caracteres."
      }).max(26, {
        message: "Nome deve ter entre 2 e 26 caracteres."
      }),
      email: import_zod5.z.string({
        required_error: "Email \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 uma string."
      }).email({
        message: "N\xE3o \xE9 um email v\xE1lido."
      }),
      telefone: import_zod5.z.number({
        required_error: "Telefone \xE9 obrigat\xF3rio.",
        invalid_type_error: "N\xE3o \xE9 do tipo num\xE9rico."
      }),
      senha: import_zod5.z.string({
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
    var import_zod7 = require("zod");
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
          if (err instanceof import_zod7.z.ZodError) {
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

// src/helpers/valideSession.ts
var import_zod6, userSessionSchema;
var init_valideSession = __esm({
  "src/helpers/valideSession.ts"() {
    "use strict";
    import_zod6 = require("zod");
    userSessionSchema = import_zod6.z.object({
      email: import_zod6.z.string({
        required_error: "Email \xE9 obrigat\xF3rio."
      }).email({
        message: "N\xE3o \xE9 um email v\xE1lido."
      }),
      senha: import_zod6.z.string({
        required_error: "Senha \xE9 obrigat\xF3ria."
      })
    });
  }
});

// src/controllers/SessionController.ts
var require_SessionController = __commonJS({
  "src/controllers/SessionController.ts"(exports2, module2) {
    "use strict";
    var import_prisma = __toESM(require_prisma());
    init_valideSession();
    var import_bcryptjs2 = __toESM(require("bcryptjs"));
    var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
    var import_dotenv = __toESM(require("dotenv"));
    import_dotenv.default.config();
    module2.exports = {
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
          const passwordChecked = import_bcryptjs2.default.compareSync(senha, user.senha);
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
  }
});

// src/routes/barberPublicRoutes.ts
var import_BarberShop = __toESM(require_BarberShop());
var import_SchedulingController = __toESM(require_SchedulingController());
var import_UserController = __toESM(require_UserController());
var import_express = __toESM(require("express"));
var import_SessionController = __toESM(require_SessionController());
var publicRoutes = import_express.default.Router();
publicRoutes.get("/servicos", import_BarberShop.default.servicesShow);
publicRoutes.post("/agendamento/criar", import_SchedulingController.default.create);
publicRoutes.post("/criar-conta", import_UserController.default.create);
publicRoutes.post("/sessao", import_SessionController.default.login);
module.exports = publicRoutes;
