export const remove = (fromObject, ...propKey) => {
  const newObject = Object.assign({}, fromObject);
  for (const key of propKey) {
    if (key in newObject) {
      delete newObject[key];
    }
  }

  return newObject;
};

export const removeBy = (fromObject, ...propVal) => {
  const newObject = {};
  const newSet = new Set(propVal.map((i) => String(i)));
  for (const key of Object.keys(fromObject)) {
    if (!newSet.has(String(fromObject[key]))) {
      newObject[key] = fromObject[key];
    }
  }

  return newObject;
};

export const removeByKey = remove;

export const removeByVal = removeBy;
