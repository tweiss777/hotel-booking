import { JSONSchemaType } from "ajv";
import NewUserDTO from "../../dtos/auth/NewUser.dto";

export const UserSchema: JSONSchemaType<NewUserDTO> = {
    type: "object",
    properties: {
        email: {
            type: "string",
            pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
            notEmpty: true,
            errorMessage: {
                pattern: "Email is not valid",
                notEmpty: "Email cannot be empty",
            },
        },
        password: {
            type: "string",
            notEmpty: true,
            errorMessage: {
                notEmpty: "Password cannot be empty",
            },
        },

        confirmPassword: {
            type: "string",
            notEmpty: true,
            errorMessage: {
                notEmpty: "Password cannot be empty",
            },
        },
    },
    required: ["email", "password", "confirmPassword"],
    additionalProperties: false,
};
