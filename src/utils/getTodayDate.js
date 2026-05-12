export default function getTodayDate(
  offset = 0
) {
  const date = new Date();

  date.setDate(
    date.getDate() + offset
  );

  return date
    .toISOString()
    .split("T")[0];
}