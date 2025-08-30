export function Footer() {
  const row: React.CSSProperties = {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 16px",
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 14,
    color: "#4b5563",
  };
  return (
    <footer style={{ borderTop: "1px solid #e5e7eb", background: "#fff" }}>
      <div style={row}>
        <p>© {new Date().getFullYear()} Flood Fighter</p>
        <p>Australia - Flood - Map-based data</p>
      </div>
    </footer>
  );
}