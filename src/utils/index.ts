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

export const todayFormattedDate = () => {
  const currentDate = new Date();
  // returns ex. => 06062023
  return (
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    ("0" + currentDate.getDate()).slice(-2) +
    currentDate.getFullYear()
  );
};

export function debounce(
  targetFunction: (...args: any[]) => void,
  delay: number
) {
  let timerId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    const executeTargetFunction = () => {
      // Clear the timer so the function can be called again
      if (timerId) {
        clearTimeout(timerId);
      }

      // Execute the target function with all arguments passed in
      targetFunction(...args);
    };

    // If there's a pending function execution, cancel it
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set a new timer for the function execution
    timerId = setTimeout(executeTargetFunction, delay);
  };
}
