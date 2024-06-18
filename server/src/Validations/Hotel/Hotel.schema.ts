import NewHotelDTO from "../../dtos/hotels/new-hotel.dto";
import { JSONSchemaType } from "ajv";

export const HotelSchema: JSONSchemaType<NewHotelDTO> = {
    type: "object",
    properties: {
        id: {
            type: "string",
        },
        name: {
            type: "string",
            pattern: "^[a-zA-Z0-9 ]+$",
            notEmpty: true,
            errorMessage: {
                pattern: "Name can only contain letters, numbers and spaces",
                notEmpty: "Name cannot be empty",
            }
        },
        address: {
            type: "string",
            notEmpty: true,
            pattern: "^[a-zA-Z0-9, ]+$",
            errorMessage: {
                pattern: "Address can only contain letters, numbers and spaces",
                notEmpty: "Address cannot be empty",
            }
        },
        img_url: {
            type: "string",
        },
    },
    required: [ "name", "address" ],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "Hacking is not allowed!"
    }
}
