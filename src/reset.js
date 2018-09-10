/**
 * reset config
 * @param {*} obj
 */
function reset(obj) {
  switch (typeof obj) {
    case 'string': return 'string';
    case 'number': return 0;
    case 'boolean': return false;
    case 'object': {
      if (obj instanceof Array) {
        return obj.map(reset);
      }
      if (obj instanceof Object) {
        const newObj = {};
        Reflect.ownKeys(obj).forEach((key) => {
          newObj[key] = reset(obj[key]);
        });
        return newObj;
      }
      return null;
    }
    default: return null;
  }
}

export default reset;
