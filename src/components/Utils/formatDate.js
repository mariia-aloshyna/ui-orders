// Convert format date
export default function formatDate(value) {
  return value
    ? new Date(value).toDateString()
    : '';
}
