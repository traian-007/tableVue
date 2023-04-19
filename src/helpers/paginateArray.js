export const paginate = (fromArray, pageActive = 1, limitPerPage = 10) => {
  const newArray = Array.from(fromArray);
  const startPaginate =
    Number(limitPerPage) * Number(pageActive) - (Number(limitPerPage) - 1);
  const endPaginate = Number(limitPerPage) * Number(pageActive);

  return newArray.slice(
    startPaginate - 1,
    endPaginate <= newArray.length ? endPaginate : newArray.length
  );
};

export const pages = (lengthOfArray, limitPerPage = 10) => {
  const arrayLength = Array.isArray(lengthOfArray)
    ? lengthOfArray.length
    : lengthOfArray;
  const divideLength = Number(arrayLength) / Number(limitPerPage);

  const pageNumber = Math.ceil(divideLength);
  return pageNumber;
};

export const pageInfo = (fromArray, pageActive = 1, limitPerPage = 10) => {
  const newArray = Array.from(fromArray);
  const startPaginate =
    Number(limitPerPage) * Number(pageActive) - (Number(limitPerPage) - 1);
  const endPaginate = Number(limitPerPage) * Number(pageActive);

  return {
    from: newArray.length >= 1 ? startPaginate : 0,
    start: newArray.length >= 1 ? startPaginate : 0,
    to: endPaginate <= newArray.length ? endPaginate : newArray.length,
    end: endPaginate <= newArray.length ? endPaginate : newArray.length,
    of: newArray.length,
    length: newArray.length,
  };
};

export const pagination = (
  totalPages,
  pageActive = 1,
  positionOfEllipsis = 0
) => {
  const newArray = [];
  const maxPages =
    Number(totalPages) < Number(pageActive)
      ? Number(totalPages)
      : Number(pageActive);
  const minPages = Number(pageActive) < 1 ? 1 : Number(pageActive);
  const pageAddition = maxPages + Number(positionOfEllipsis);
  const pageSubtraction = minPages - Number(positionOfEllipsis);
  if (Number(positionOfEllipsis) === 0) {
    for (let i = 1; i <= Number(totalPages); i++) {
      newArray.push(String(i));
    }
  } else {
    if (minPages > 1) {
      for (let i = pageSubtraction; i < minPages; i++) {
        newArray.push(String(i));
      }
    }

    for (let i = maxPages; i <= pageAddition; i++) {
      newArray.push(String(i));
    }
  }
  const filterNegative = newArray.filter((num) => Number(num) > 0);
  const filterMax = filterNegative.filter(
    (num) => Number(num) <= Number(totalPages)
  );
  if (pageAddition < Number(totalPages) && Number(positionOfEllipsis) !== 0) {
    filterMax.push("...");
  }
  if (pageSubtraction > 1 && Number(positionOfEllipsis) !== 0) {
    filterMax.unshift("...");
  }

  return filterMax;
};
