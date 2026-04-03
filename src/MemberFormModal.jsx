import { Modal, Form, Button, InputGroup } from "react-bootstrap";

export default function MemberFormModal({
  show,
  onHide,
  form,
  errors,
  editId,
  onChange,
  onSubmit,
  onUpdate
}) {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      {/* Header */}
      <div className="modal-header-custom d-flex align-items-center justify-content-between">
        <span className="modal-title-text">
          {editId ? "✏️  Edit Member" : "👤  Add New Member"}
        </span>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onHide}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <Modal.Body style={{ padding: "1.5rem" }}>
        <Form noValidate>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Full Name</Form.Label>
            <InputGroup>
              <InputGroup.Text className="input-icon">👤</InputGroup.Text>
              <Form.Control
                name="name"
                className="form-control-custom input-no-left-border"
                placeholder="e.g. Arjun Krishnan"
                value={form.name}
                onChange={onChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Mobile */}
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Mobile Number</Form.Label>
            <InputGroup>
              <InputGroup.Text className="input-icon">📱</InputGroup.Text>
              <Form.Control
                name="mobile"
                className="form-control-custom input-no-left-border"
                placeholder="e.g. +91 98400 12345"
                value={form.mobile}
                onChange={onChange}
                isInvalid={!!errors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-1">
            <Form.Label className="form-label-custom">Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text className="input-icon">✉️</InputGroup.Text>
              <Form.Control
                name="email"
                type="email"
                className="form-control-custom input-no-left-border"
                placeholder="e.g. arjun@example.com"
                value={form.email}
                onChange={onChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1rem 1.5rem",
          gap: "0.6rem",
        }}
      >
        <Button
          variant="light"
          onClick={onHide}
          style={{
            borderRadius: 10,
            fontWeight: 600,
            fontSize: "0.88rem",
            padding: "0.5rem 1.2rem",
          }}
        >
          Cancel
        </Button>
        {
          editId ? (<Button className="btn-submit" onClick={onUpdate}>
          {"Save Changes" }
        </Button>): (<Button className="btn-submit" onClick={onSubmit}>
          {"Add Member"}
        </Button>)
        }
        
        
      </Modal.Footer>
    </Modal>
  );
}
