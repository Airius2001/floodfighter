export function Footer() {
  const row: React.CSSProperties = {
    margin: "0 auto",
    padding: "0 16px",
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 14,
    color: "#eee",
  };
  return (
    <footer style={{ background: "#000" }}>
      <div style={row}>
        <p>© {new Date().getFullYear()} Flood Fighter</p>
        <p>Australia - Flood - Map-based Data</p>
      </div>
    </footer>
  );
}