export const betweenDate = (dates: Date[], date: Date): [number, number] => {
  let minIndex = 0,
    maxIndex = 0,
    minDate = dates[0].getTime() - date.getTime(),
    maxDate = dates[0].getTime() - date.getTime();
  for (let i = 0; i < dates.length; ++i) {
    const currentDate = dates[i];
    if (
      currentDate.getTime() - date.getTime() > 0 &&
      (currentDate.getTime() - date.getTime() < maxDate || maxDate <= 0)
    ) {
      maxIndex = i;
      maxDate = currentDate.getTime() - date.getTime();
    }

    if (
      date.getTime() - currentDate.getTime() > 0 &&
      (date.getTime() - currentDate.getTime() < minDate || minDate <= 0)
    ) {
      minIndex = i;
      minDate = date.getTime() - currentDate.getTime();
    }
  }

  return [minIndex, maxIndex];
};
