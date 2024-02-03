import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ajvKeywords from 'ajv-keywords';
import ajvErrors from 'ajv-errors';
import ajvMergePatch from 'ajv-merge-patch';

const ajvLib = ajvErrors(
  ajvKeywords(
    addFormats(
      new Ajv({
        allErrors: true,
        validateSchema: true,
        removeAdditional: true,
        ownProperties: true,
        logger: console,
        useDefaults: true,
        strict: true,
        strictNumbers: true,
        strictTypes: true,
        strictSchema: true,
        strictRequired: false,
        coerceTypes: true,
        code: { optimize: true },
      }),
      { mode: 'full' },
    ),
  ),
  { keepErrors: true },
);

ajvMergePatch(ajvLib);

const getSchema = (name: string) => {
  return ajvLib.getSchema(name);
};

const validateSchema = async (name: string, payload: any) => {
  try {
    return { data: await ajvLib.getSchema(name)(payload) };
  } catch (error) {
    return { error };
  }
};

const hasSchema = (name: string) => {
  return !!getSchema(name);
};

export { ajvLib, getSchema, hasSchema, validateSchema };
