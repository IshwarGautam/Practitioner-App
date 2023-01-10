"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validator_1 = require("../validator");
const validation = (req, res, next) => {
    let error;
    switch (req.url) {
        case "/signin":
            ({ error } = (0, validator_1.validateSignin)(req.body));
            break;
        case "/signup":
            ({ error } = (0, validator_1.validateSignup)(req.body));
            break;
        case "/delete": //requires admin access to delete users
            ({ error } = (0, validator_1.validateAdmin)(req.body));
            break;
        default:
            ({ error } = (0, validator_1.validatePractitioner)(req.body));
            break;
    }
    if (error) {
        return res.status(422).json({ message: error.details });
    }
    else {
        next();
    }
};
exports.validation = validation;
//# sourceMappingURL=validation.js.map