import React from 'react';

DateTime.defaultProps = {
  options: {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
};
// parameters tham manage every single type of the date and set a default value
export default function DateTime({
  date,
  options: { weekday, year, month, day, hour, minute, second },
}) {
    // get the current locale to show the datetime based on the user locale
  var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

  const getDate = () =>
    new Intl.DateTimeFormat(currentLocale, {
      year,
      month,
      weekday,
      day,
      hour,
      minute,
      second,
    }).format(Date.parse(date));

  return <>{getDate()}</>;
}