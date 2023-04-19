export const sortBy = (fromArray, propString, sortString = "asc") => {
  const newArray = Array.from(fromArray);
  if (sortString === "asc") {
    newArray.sort((a, b) => {
      if (propString in a && propString in b) {
        if (isNaN(a[propString]) === false && isNaN(b[propString]) === false) {
          return Number(a[propString]) - Number(b[propString]);
        } else if (
          typeof a[propString] === "string" &&
          typeof b[propString] === "string"
        ) {
          const propA = a[propString].toLowerCase();
          const propB = b[propString].toLowerCase();
          let propRes = 0;

          if (propA < propB) {
            propRes = -1;
          } else if (propA > propB) {
            propRes = 1;
          }
          return propRes;
        }
      }
    });
  } else if (sortString === "desc") {
    newArray.sort((a, b) => {
      if (propString in a && propString in b) {
        if (isNaN(a[propString]) === false && isNaN(b[propString]) === false) {
          return Number(b[propString]) - Number(a[propString]);
        } else if (
          typeof a[propString] === "string" &&
          typeof b[propString] === "string"
        ) {
          const propA = a[propString].toLowerCase();
          const propB = b[propString].toLowerCase();
          let propRes = 0;

          if (propB < propA) {
            propRes = -1;
          } else if (propB > propA) {
            propRes = 1;
          }
          return propRes;
        }
      }
    });
  }
  return newArray;
};

export const sort = sortBy;

export const order = (fromArray, newProp = "order") => {
  const newArray = Array.from(fromArray);
  return newArray.map((item, index) => {
    if (typeof item === "object" && item !== null) {
      item[newProp] = Number(index) + 1;
    }
    return item;
  });
};
