"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailsModule = void 0;
const common_1 = require("@nestjs/common");
const mails_service_1 = require("./mails.service");
const mails_controller_1 = require("./mails.controller");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
let MailsModule = class MailsModule {
};
exports.MailsModule = MailsModule;
exports.MailsModule = MailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
                    transport: {
                        host: config.get('MAIL_HOST'),
                        port: config.get('MAIL_PORT'),
                        secure: false,
                        auth: {
                            user: config.get('MAIL_USER'),
                            pass: config.get('MAIL_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: `"No reply" <${config.get('MAIL_FROM')}>`,
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        }
                    },
                }),
                inject: [config_1.ConfigService]
            })
        ],
        controllers: [mails_controller_1.MailsController],
        exports: [mails_service_1.MailsService],
        providers: [mails_service_1.MailsService],
    })
], MailsModule);
//# sourceMappingURL=mails.module.js.map