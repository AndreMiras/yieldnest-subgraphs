import * as fs from "fs";
import * as path from "path";

interface SchemaConfig {
  baseDir: string;
  outputFile: string;
  schemas: string[];
}

const readSchemaFile = (filePath: string): string =>
  fs.readFileSync(filePath, "utf8");

const writeSchemaFile = (filePath: string, content: string): void =>
  fs.writeFileSync(filePath, content);

const buildSchema = (config: SchemaConfig): void => {
  // Create combined schema content
  const combinedSchema = config.schemas
    .map((schemaPath) => readSchemaFile(path.join(config.baseDir, schemaPath)))
    .join("\n\n");

  // Write combined schema to output file
  const outputPath = path.join(config.baseDir, config.outputFile);
  writeSchemaFile(outputPath, combinedSchema);

  console.log(`Combined schema written to ${config.outputFile}`);
};

const main = () => {
  const config: SchemaConfig = {
    baseDir: path.join(__dirname, "../yneth"),
    outputFile: "generated/schema.graphql",
    schemas: [
      "schema.graphql",
      "metrics-schema.graphql",
    ],
  };
  buildSchema(config);
};

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
