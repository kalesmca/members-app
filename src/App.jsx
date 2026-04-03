import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./members.css";

import AppHeader        from "./AppHeader";
import MemberTable      from "./MemberTable";
import MemberFormModal  from "./MemberFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const emptyForm = { name: "", mobile: "", email: "" };

// ── Validation ─────────────────────────────────────────────
function validate(form) {
  const errors = {};
  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!form.mobile.trim()) {
    errors.mobile = "Mobile is required.";
  } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.mobile.trim())) {
    errors.mobile = "Enter a valid mobile number.";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

// ── App ────────────────────────────────────────────────────
export default function App() {
  const [members,           setMembers]           = useState([]);
  const [search,            setSearch]            = useState("");
  const [showForm,          setShowForm]          = useState(false);
  const [form,              setForm]              = useState(emptyForm);
  const [errors,            setErrors]            = useState({});
  const [editId,            setEditId]            = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId,          setDeleteId]          = useState(null);

  useEffect(()=>{
    fetch("http://localhost:8080/members").then(res => res.json()).then((data)=>{
      console.log("Members Data=", data);
      setMembers(data)
    }).catch((err)=>{
      console.log("Error=", err);
    })
  },[])

  // ── Form modal ──
  const openAdd = () => {
    setForm(emptyForm);
    setErrors({});
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (member) => {
    setForm({ name: member.name, mobile: member.mobile, email: member.email });
    setErrors({});
    setEditId(member.id);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const updateList =() =>{

  }
  const handleFormSubmit = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (editId !== null) {
      setMembers((prev) =>
        prev.map((m) => (m.id === editId ? { ...m, ...form } : m))
      );
    } else {
      setMembers((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowForm(false);
  };

  const updateForm =() =>{

  }

  // ── Delete modal ──
  const openDeleteConfirm = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    setMembers((prev) => prev.filter((m) => m.id !== deleteId));
    setShowDeleteConfirm(false);
  };

  return (
    <div className="page-wrapper">
      {/* ── Navbar ── */}
      <AppHeader />

      {/* ── Page Body ── */}
      <Container fluid className="py-4 px-3 px-md-4">
        <Row className="mb-3">
          <Col>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", margin: 0 }}>
              Manage your team members — add, edit, or remove entries below.
            </p>
          </Col>
        </Row>

        <MemberTable
          members={members}
          search={search}
          onSearch={setSearch}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={openDeleteConfirm}
        />
      </Container>

      {/* ── Add / Edit Modal ── */}
      <MemberFormModal
        show={showForm}
        onHide={() => setShowForm(false)}
        form={form}
        errors={errors}
        editId={editId}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        onUpdate={updateForm}
      />

      {/* ── Delete Confirm Modal ── */}
      <DeleteConfirmModal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
