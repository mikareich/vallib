import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import path from 'path'

import jsonToZod from 'json-to-zod'

import { PATH_TO_CACHE } from './cacheResponse'

const PATH_TO_SCHEMA = path.resolve(process.cwd(), 'src', 'schema')

export default function generateSchema(prefix: string) {
  // eslint-disable-next-line no-console
  console.log('Generating schema for', prefix)

  // return all files with the prefix
  const fileNames = readdirSync(PATH_TO_CACHE).filter((file) =>
    file.startsWith(prefix),
  )

  // decode response data
  const responses = fileNames.map((file) => {
    const raw = readFileSync(path.join(PATH_TO_CACHE, file), 'utf-8')
    const decoded = Buffer.from(raw, 'base64').toString('utf-8')
    return JSON.parse(decoded)
  }) as Record<string, never>[]

  // generate schema
  let schema = jsonToZod(responses)

  // destruct and minify the schema
  schema = schema.replace('const schema = z.array(', '').slice(0, -3)

  // add the schema name
  schema = `// automatically generated schema, ${new Date().toISOString()}

import { z } from "zod"

const ${prefix}_SCHEMA = ${schema}

export default ${prefix}_SCHEMA`

  // safe schema to file
  mkdirSync(PATH_TO_SCHEMA, { recursive: true })

  const schemaPath = path.resolve(PATH_TO_SCHEMA, `${prefix}.schema.ts`)
  writeFileSync(schemaPath, schema)
}
