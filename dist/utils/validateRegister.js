"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
exports.validateRegister = (options) => {
    if (options.username.length <= 3) {
        return [
            {
                field: "username",
                message: "username length should be greater than 3",
            },
        ];
    }
    if (options.username.includes("@")) {
        return [
            {
                field: "username",
                message: "Username cannot include the '@' sign",
            },
        ];
    }
    if (options.email.length === 0) {
        return [
            {
                field: "email",
                message: "Email field can not be empty",
            },
        ];
    }
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "Please use a valid email. eg 'john@gmail.com'",
            },
        ];
    }
    if (options.password.length <= 3) {
        return [
            {
                field: "password",
                message: "password length should be greater than 3",
            },
        ];
    }
    return null;
};
//# sourceMappingURL=validateRegister.js.map