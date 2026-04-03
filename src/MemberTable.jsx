import { Table, Badge, Button } from "react-bootstrap";

export default function MemberTable({ members, search, onSearch, onAdd, onEdit, onDelete }) {
  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.mobile.includes(search)
  );

  return (
    <div className="card-shell">
      {/* ── Header Bar ── */}
      <div className="card-header-bar">
        <div className="d-flex align-items-center gap-2">
          <h2 className="section-title">Members</h2>
          <Badge className="badge-count">{filtered.length}</Badge>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <input
            type="text"
            className="form-control search-input"
            placeholder="🔍  Search members…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button className="btn-add" onClick={onAdd}>
            <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>＋</span>
            Add Member
          </Button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="table-responsive">
        <Table className="member-table" hover borderless>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="empty-state">
                    <div className="empty-icon">👥</div>
                    {search
                      ? "No members match your search."
                      : "No members yet. Click 'Add Member' to get started."}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((m, i) => (
                <tr key={m.id}>
                  <td
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.82rem",
                      width: 48,
                    }}
                  >
                    {i + 1}
                  </td>
                  <td>
                    <div className="name-cell">
                      <span className="avatar">
                        {m.name.charAt(0).toUpperCase()}
                      </span>
                      <span style={{ fontWeight: 600, color: "#1e293b" }}>
                        {m.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: "monospace", letterSpacing: "0.03em" }}>
                      {m.mobile}
                    </span>
                  </td>
                  <td>
                    <a
                      href={`mailto:${m.email}`}
                      style={{
                        color: "var(--brand)",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {m.email}
                    </a>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => onEdit(m)}
                        title="Edit"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => onDelete(m.id)}
                        title="Delete"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
