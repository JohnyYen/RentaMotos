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
let ContractController = class ContractController {
    constructor(contractService) {
        this.contractService = contractService;
    }
    async getContract() {
        return await this.contractService.getAllContract();
    }
    async getContractInPDF(res) {
        const buffer = await this.contractService.getPDFContract();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Contracts.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getContractsMunWorker(mun) {
        return await this.contractService.getContractMun(mun);
    }
    async getPDFContractWorkerMun(mun, res) {
        const buffer = await this.contractService.getPDFContractWorkerMun(mun);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsWorker.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getContractByMun() {
        return await this.contractService.getContractByMun();
    }
    async getContractInPDFMun(res) {
        const buffer = await this.contractService.getPDFContractByMun();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsByMun.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getFilterContract() {
        return await this.contractService.getContractFilter();
    }
    async getContractInPDFMarc(res) {
        const buffer = await this.contractService.getPDFContractXModelo();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsXModeloXMarca.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getContractByCliente(id) {
        return await this.contractService.getCotnractByCliente(id);
    }
    deleteContract(matricula) {
        this.contractService.deleteContract(matricula);
    }
    createContract(contract) {
        this.contractService.createContract(contract);
    }
    updateContract(matricula, contract) {
        this.contractService.updateContract(contract, matricula);
    }
};
exports.ContractController = ContractController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContract", null);
__decorate([
    (0, common_1.Get)("/pdf"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContractInPDF", null);
__decorate([
    (0, common_1.Get)('/worker/:mun'),
    __param(0, (0, common_1.Param)('mun')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContractsMunWorker", null);
__decorate([
    (0, common_1.Get)('/worker/pdf/:mun'),
    __param(0, (0, common_1.Param)('mun')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getPDFContractWorkerMun", null);
__decorate([
    (0, common_1.Get)('/mun'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContractByMun", null);
__decorate([
    (0, common_1.Get)("/mun/pdf"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContractInPDFMun", null);
__decorate([
    (0, common_1.Get)('/marcxmodel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getFilterContract", null);
__decorate([
    (0, common_1.Get)("/marcxmodel/pdf"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContractInPDFMarc", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContractByCliente", null);
__decorate([
    (0, common_1.Delete)('/:matricula'),
    __param(0, (0, common_1.Param)("matricula")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "deleteContract", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_dto_1.ContractDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "createContract", null);
__decorate([
    (0, common_1.Patch)('/:matricula'),
    __param(0, (0, common_1.Param)("matricula")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contract_dto_1.ContractDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "updateContract", null);
exports.ContractController = ContractController = __decorate([
    (0, common_1.Controller)('api/contract'),
    __metadata("design:paramtypes", [contract_service_1.ContractService])
], ContractController);
//# sourceMappingURL=contract.controller.js.map