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

// src/helpers/service/verifyIdService.ts
var require_verifyIdService = __commonJS({
  "src/helpers/service/verifyIdService.ts"(exports2, module2) {
    "use strict";
    var verifyIdService2 = (id_servico) => {
      return id_servico.map((id) => ({ id }));
    };
    module2.exports = verifyIdService2;
  }
});

// src/controllers/SchedulingController.ts
var import_prisma = __toESM(require_prisma());

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

// src/controllers/SchedulingController.ts
var import_verifyIdService = __toESM(require_verifyIdService());

// src/helpers/scheduling/valideScheduling.ts
var import_zod = require("zod");
var schedulingSchema = import_zod.z.object({
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

// src/controllers/SchedulingController.ts
var import_zod3 = require("zod");

// src/helpers/scheduling/valideUpdateScheduling.ts
var import_zod2 = require("zod");
var schedulingUpdateSchema = import_zod2.z.object({
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

// src/controllers/SchedulingController.ts
var SchedulingController = class {
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
      if (err instanceof import_zod3.z.ZodError) {
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
      if (err instanceof import_zod3.z.ZodError) {
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
module.exports = SchedulingController;
