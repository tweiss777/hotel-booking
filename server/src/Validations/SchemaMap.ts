import { JSONSchemaType } from "ajv";

class SchemaDosNotExistError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "InstanceCreatedError";
  }
}

export default class SchemaMap {
  private readonly schemaMap: Map<string, object> = new Map();
  private static instance: SchemaMap | null = null;
  private constructor() {}

  public static SchemaMapInstance = {
    get instance(): SchemaMap {
      if (SchemaMap.instance) {
        return SchemaMap.instance;
      } else {
        SchemaMap.instance = new SchemaMap();
        return SchemaMap.instance;
      }
    },
  };

  public addSchema(name: string, instance: object) {
    this.schemaMap.set(name, instance);
  }

  public getSchema(name: string): JSONSchemaType<object> {
    if (this.schemaMap.has(name)) {
      return this.schemaMap.get(name) as JSONSchemaType<object>;
    }
    throw new SchemaDosNotExistError("Schema not found");
  }
}
