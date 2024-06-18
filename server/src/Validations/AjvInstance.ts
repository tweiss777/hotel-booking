import Ajv from "ajv";
import ajvErrors from 'ajv-errors';

export default class AjvInstance {
  private static ajvInstance: Ajv;

  public static AjvInstance = {
    get instance(): Ajv  {
      if (!AjvInstance.ajvInstance) {
        AjvInstance.ajvInstance = ajvErrors(new Ajv({ allErrors: true }));
      }
      return AjvInstance.ajvInstance;
    },
  };

  private constructor() {}

}
