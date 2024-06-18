import { Request, Response,NextFunction } from "express";
import SchemaMap from "./SchemaMap"
import AjvInstance from "./AjvInstance";
export function ValidateSchema(value: string) {
 const func = (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        if(typeof originalMethod === 'function') {
            descriptor.value = function(req: Request, res: Response, next: NextFunction) {
                const schema = SchemaMap.SchemaMapInstance.instance.getSchema(value);
                const validate = AjvInstance.AjvInstance.instance.compile(schema);
                if(!validate(req.body)){
                    res.status(400).send({
                        errors: validate.errors?.map(error => error.message)
                    }).end()
                    return
                }
                originalMethod.apply(this,[req, res, next])

            }
        }
 }   
    return func
} 
