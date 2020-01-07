import { getOptions } from 'loader-utils';

// import validateOptions from 'schema-utils';

// import schema from './options.json';

export const raw = true;

export default function loader(source) {
  const options = getOptions(this);

    source = source.replace(/\[name\]/g, options.name);

    return `export default ${JSON.stringify(source)}`;
}

 

 