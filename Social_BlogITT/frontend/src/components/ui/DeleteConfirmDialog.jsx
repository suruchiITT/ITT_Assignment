import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

export default function DeleteConfirmDialog({ open, title, message, loading, onCancel, onConfirm }) {
  useEffect(() => {
    if (!open || loading) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, onCancel, open]);

  if (!open) return null;

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && !loading) {
      onCancel();
    }
  }

  return (
    <div className="delete-dialog-overlay" role="presentation" onMouseDown={handleBackdropClick}>
      <section className="delete-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title">
        <div className="delete-dialog-head">
          <span className="delete-dialog-icon" aria-hidden="true">
            <AlertTriangle size={22} />
          </span>
          <button className="icon-btn delete-dialog-close" onClick={onCancel} disabled={loading} title="Close">
            <X size={18} />
          </button>
        </div>
        <h2 id="delete-dialog-title">{title}</h2>
        <p>{message}</p>
        <div className="delete-dialog-actions">
          <button className="secondary-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="danger-btn" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </section>
    </div>
  );
}
