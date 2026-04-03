import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmModal({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Body style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🗑️</div>
        <h5
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Delete Member?
        </h5>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.88rem",
            marginBottom: "1.25rem",
          }}
        >
          This action cannot be undone.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="light"
            onClick={onHide}
            style={{
              borderRadius: 10,
              fontWeight: 600,
              fontSize: "0.88rem",
            }}
          >
            Cancel
          </Button>
          <Button className="btn-danger-confirm" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
