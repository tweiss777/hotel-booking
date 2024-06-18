import { JSONSchemaType } from "ajv";
import NewGuestDto from "../../dtos/guests/new-guest.dto";

export const GuestSchema: JSONSchemaType<NewGuestDto> = {
    type: "object",
    properties: {
        id: {
            type: "string",
        },
        firstName: {
            type: "string",
            pattern: "^[a-zA-Z]+$",
            notEmpty: true,
            errorMessage: {
                pattern: "First name can only contain letters",
                notEmpty: "First name cannot be empty",
                required: "First name is required",
            }
        },
        lastName: {
            type: "string",
            pattern: "^[a-zA-Z]+$",
            notEmpty: true,
            errorMessage: {
                pattern: "Last name can only contain letters",
                notEmpty: "Last name cannot be empty",
                required: "Last name is required",
            }
        },
        address: {
            type: "string",
            notEmpty: true,
            pattern: "^[a-zA-Z0-9, ]+$",
            errorMessage: {
                pattern: "Address can only contain letters, numbers and spaces",
                notEmpty: "Address cannot be empty",
                required: "Address is required",
            }
        },
    },
    required: [ "firstName", "lastName", "address"],
    additionalProperties: false,
} ;
