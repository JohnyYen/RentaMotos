"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const client_dto_1 = require("./dto/client.dto");
const clientPatch_dto_1 = require("./dto/clientPatch.dto");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async getClients() {
        return await this.clientService.getAllClients();
    }
    getClientsByPDF() {
        this.clientService.getAllClientByPDF();
    }
    createClient(clientDto) {
        this.clientService.createClient(clientDto);
    }
    deleteClient(id) {
        this.clientService.deleteClient(id);
    }
    updateClient(id, client) {
        this.clientService.updateClient(client, id);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClients", null);
__decorate([
    (0, common_1.Get)('/pdf'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "getClientsByPDF", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientDto]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "deleteClient", null);
__decorate([
    (0, common_1.Patch)('/id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, clientPatch_dto_1.ClientPatchDto]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "updateClient", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map