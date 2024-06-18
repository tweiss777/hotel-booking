import { Request, Response,NextFunction } from "express";
import SchemaMap from "./SchemaMap"
import Ajv from "ajv";
export function ValidateSchema(value: string) {
 const func = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        if(typeof originalMethod === 'function') {
            const ajv = new Ajv();
            descriptor.value = function(req: Request, res: Response, next: NextFunction) {
                const schema = SchemaMap.SchemaMapInstance.instance.getSchema(value);
                const valid = ajv.validate(schema, req.body);
                if(!valid){
                    res.status(400).send({
                        errors: ajv.errors?.map((error) => error.message)
                    })
                    return
                }
                originalMethod.apply(this,[req, res, next])

            }
        }
 }   
    return func
} 
