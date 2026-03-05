export function totalthem(dataArrays) {
  const totals = { Manuscripts: 0, Books: 0, Articles: 0, Users: 0, Subjects: 0 };
  dataArrays.forEach((arrayItem) => {
    Object.entries(arrayItem).forEach(([key, value]) => {
      if (key in totals) totals[key] += value;
    });
  });
  return totals;
}

// Calculates Documents = Manuscripts + Books + Articles
export function calcTotalDocuments(dataArray) {
  return (
    (dataArray["Manuscripts"] || 0) +
    (dataArray["Books"]       || 0) +
    (dataArray["Articles"]    || 0)
  );
}