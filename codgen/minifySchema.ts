import { Project, type Node, PropertyAssignment } from "ts-morph";

export default function minifyZodSchema(sourceCode: string): string {
  const project = new Project();
  const sourceFile = project.createSourceFile("temp.ts", sourceCode, {
    overwrite: true,
  });

  const declarations = new Map<string, string>();

  const processNode = (node: Node) => {
    for (const child of node.getChildren()) processNode(child);

    if (!(node instanceof PropertyAssignment)) return;
    const initializer = node.getInitializer();
    if (!initializer) return; // Ignore empty properties

    const key = node.getName();
    const valueText = initializer.getText().trim();

    const isRelevant =
      valueText.startsWith("z.object(") ||
      valueText.startsWith("z.array(") ||
      valueText.startsWith("z.tuple(") ||
      valueText.startsWith("z.record(") ||
      valueText.startsWith("z.union(");

    if (!isRelevant) return;

    if (declarations.has(valueText)) {
      node.replaceWithText(`${key}: ${declarations.get(valueText) as string}`);
      return;
    }

    const id = `_${declarations.size}`;
    declarations.set(valueText, id);
    node.replaceWithText(`${key}: ${id}`);
  };

  const nodes = sourceFile.getDescendants();
  for (const node of nodes.reverse()) processNode(node);

  const schemaDeclarations = [];
  for (const [schema, name] of declarations) {
    schemaDeclarations.push(`const ${name} = ${schema};`);
  }

  if (schemaDeclarations.length > 0) {
    sourceFile.insertStatements(2, schemaDeclarations.join("\n"));
  }

  return sourceFile.getFullText();
}
