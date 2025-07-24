import "/styles/dialogWin.css";
export function Dialog ( isOpen, onClose) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>U finded them all</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}