export function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {date} Gianni Gabriel</p>
    </footer>
  );
}
