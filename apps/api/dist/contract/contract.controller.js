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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const contract_service_1 = require("./contract.service");
const contract_dto_1 = require("./dto/contract.dto");
const contractPatch_dto_1 = require("./dto/contractPatch.dto");
let ContractController = class ContractController {
    constructor(contractService) {
        this.contractService = contractService;
    }
    getContract() {
        return this.contractService.getAllContract();
    }
    getContractInPDF() {
    }
    deleteContract(idCliente, matricula) {
        this.contractService.deleteContract(idCliente, matricula);
    }
    createContract(contract) {
        this.contractService.createContract(contract);
    }
    updateContract(idCliente, matricula, contract) {
        this.contractService.updateContract(contract, idCliente, matricula);
    }
};
exports.ContractController = ContractController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "getContract", null);
__decorate([
    (0, common_1.Get)("/pdf"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "getContractInPDF", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)("idCliente")),
    __param(1, (0, common_1.Body)("matricula")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "deleteContract", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)("contract")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_dto_1.ContractDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "createContract", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)("idCliente")),
    __param(1, (0, common_1.Body)("matricula")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, contractPatch_dto_1.ContractPatchDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "updateContract", null);
exports.ContractController = ContractController = __decorate([
    (0, common_1.Controller)('api/contract'),
    __metadata("design:paramtypes", [contract_service_1.ContractService])
], ContractController);
//# sourceMappingURL=contract.controller.js.map