"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    execute: (connection, inputMed, pres_id, inputPurpose, inputDosage, inputRoute, inputFrequency) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield (yield (connection)).query(`SELECT med_id FROM public.medicine WHERE medname = '${inputMed}'`);
        let med_id;
        if (result.rows.length == 0) {
            med_id = 1;
        }
        else {
            med_id = result.rows[0].med_id;
        }
        yield (yield connection).query(`INSERT INTO public.pres_med VALUES (${med_id}, ${pres_id}, '${inputPurpose}', 
            '${inputDosage}', '${inputRoute}', '${inputFrequency}')`);
    })
};
