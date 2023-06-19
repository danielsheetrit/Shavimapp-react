export function getCurrentTimeAndDate(days: string[]) {
  const date = new Date();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // month starts from 0 in JavaScript
  const dayOfWeek = days[date.getDay()];
  const dateString = `${day}/${month} ${dayOfWeek}`;

  return { time, date: dateString };
}
