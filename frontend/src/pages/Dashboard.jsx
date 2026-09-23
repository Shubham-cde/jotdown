// FULL FILE — TAGS ENABLED
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import {
  getNotes,
  getTrashNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/notesService";
import NoteComposer from "../components/notes/NoteComposer";
import { FileText, Star, Tag, Trash2, LogOut } from "lucide-react";
import logo from "../assets/logo.png";
import { Search } from "lucide-react";




const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [trash, setTrash] = useState([]);

  const [loading, setLoading] = useState(true);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [draftTags, setDraftTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const [view, setView] = useState("notes");
  const [saving, setSaving] = useState(false);
  const [undo, setUndo] = useState(null);
  const [query, setQuery] = useState("");

  const titleRef = useRef(null);
  const { logout } = useContext(AuthContext);
const navigate = useNavigate();

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "link",
];

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
  const handleClickOutside = () => {
    if (openNoteId) {
      closeNote();
    }
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, [openNoteId]);

  const fetchNotes = async () => {
  const data = await getNotes();
  setNotes([...data].reverse());

  const trashData = await getTrashNotes();
  setTrash([...trashData].reverse());

  setLoading(false);
};


  const handleCreateNote = async (noteData) => {
    const newNote = await createNote(noteData);
    setNotes((prev) => [newNote, ...prev]);
  };

  const openNote = (note) => {
    setOpenNoteId(note._id);
    setDraftTitle(note.title);
    setDraftContent(note.content || "");
    setDraftTags(note.tags || []);
    setTimeout(() => titleRef.current?.focus(), 0);
  };

  const closeNote = (e) => {
    setOpenNoteId(null);
    setDraftTitle("");
    setDraftContent("");
    setDraftTags([]);
    setTagInput("");
  };
const saveNote = async () => {
  if (!draftTitle.trim()) return;

  setSaving(true);

  const finalTags = tagInput.trim()
    ? [...draftTags, tagInput.trim()]
    : draftTags;

  const updated = await updateNote(openNoteId, {
    title: draftTitle,
    content: draftContent,
    tags: finalTags,
  });

  console.log("UPDATED NOTE:", updated);

  setNotes((prev) =>
    prev.map((n) => (n._id === openNoteId ? updated : n))
  );

  setSaving(false);
  closeNote();
};

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (draftTags.includes(tagInput.trim())) return;
    setDraftTags([...draftTags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (tag) => {
    setDraftTags(draftTags.filter((t) => t !== tag));
  };

  const togglePin = async (note, e) => {
    e.stopPropagation();
    const updated = await updateNote(note._id, {
      isPinned: !note.isPinned,
    });
    setNotes((prev) =>
      prev.map((n) => (n._id === note._id ? updated : n))
    );
  };
  const toggleFavorite = async (note, e) => {
  e.stopPropagation();

  const updated = await updateNote(note._id, {
    isFavorite: !note.isFavorite,
  });

  console.log(updated);

  setNotes((prev) =>
    prev.map((n) => (n._id === note._id ? updated : n))
  );
};
const handleRestore = async (note, e) => {
  e.stopPropagation();

  const updated = await updateNote(note._id, {
    isDeleted: false,
  });

  setTrash((prev) =>
    prev.filter((n) => n._id !== note._id)
  );

  setNotes((prev) => [updated, ...prev]);
};

  const handleDelete = (note, e) => {
    e.stopPropagation();
    setNotes((prev) => prev.filter((n) => n._id !== note._id));
setTrash((prev) => [note, ...prev]);


    const timer = setTimeout(async () => {
      await deleteNote(note._id);
      setUndo(null);
    }, 3000);

    setUndo({ ...note, timer });
  };

  const filteredNotes = useMemo(() => {
  let base = [];

  switch (view) {
    case "notes":
      base = notes;
      break;

    case "favorites":
      base = notes.filter((n) => n.isFavorite);
      break;

    case "tags":
  base = notes.filter(
    (n) =>
      Array.isArray(n.tags) &&
      n.tags.some((tag) => tag.trim() !== "")
  );
  break;

    case "trash":
      base = trash;
      break;

    default:
      base = notes;
  }

  if (activeTag) {
    base = base.filter((n) => n.tags?.includes(activeTag));
  }

  base = [...base].sort((a, b) => {
  if (a.isPinned === b.isPinned) return 0;
  return a.isPinned ? -1 : 1;
});

if (!query.trim()) return base;

  const q = query.toLowerCase();

  return [...base]
  .sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  })
  .filter(
    (n) =>
      n.title?.toLowerCase().includes(q) ||
      n.content?.toLowerCase().includes(q)
  );
}, [notes, trash, query, view, activeTag]);

    const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <div className="app-shell">
      <aside
  className="sidebar glass"
  style={{ display: "flex", flexDirection: "column", height: "100%" }}
>
  <div>
    <div
  className="logo"
  style={{
    display: "flex",
    alignItems: "center",
    gap: 0,
    marginBottom: 20,
  }}
>
  <img
    src={logo}
    alt="logo"
    style={{
  width: 88,
  height: 88,
  objectFit: "contain",
  background: "transparent",
  filter: "drop-shadow(0 0 10px rgba(124,92,255,0.35))",
}}


  />
 <span
  style={{
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 22,   // bigger so you SEE the font change
    letterSpacing: 2,
    color: "#ffffff",
  }}
>
  JOTDOWN
</span>





</div>


    <nav
      className="nav"
      style={{ display: "flex", flexDirection: "column", gap: 6 }}
    >
      {[
        { id: "notes", icon: FileText },
        { id: "favorites", icon: Star },
        { id: "tags", icon: Tag },
        { id: "trash", icon: Trash2 },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            className={`nav-btn ${view === item.id ? "active" : ""}`}
            onClick={() => setView(item.id)}
            style={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Icon size={16} />
            {item.id}
          </button>
        );
      })}
    </nav>
  </div>
{/* Bottom Signout */}
<button
  className="nav-btn"
  onClick={handleLogout}
  style={{
      marginTop: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <LogOut size={16} />
    Signout
  </button>
</aside>



      <main className="main">
        <div className="topbar">
          <div style={{ position: "relative", flex: 1 }}>
  <Search
    size={16}
    style={{
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      opacity: 0.6,
    }}
  />

  <div style={{ position: "relative", width: "100%" }}>
  <Search
    size={18}
    style={{
      position: "absolute",
      left: 14,
      top: "50%",
      transform: "translateY(-50%)",
      color: "#cfcfff",
      opacity: 0.85,
      pointerEvents: "none",
    }}
  />

  <input
    className="search glass"
    placeholder="Search..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
</div>

</div>

        </div>

        {view === "notes" && (
  <div style={{ marginBottom: 28 }}>
    <NoteComposer onCreate={handleCreateNote} />
  </div>
)}

{activeTag && (
  <div className="tag-filter glass">
    Filtering by #{activeTag}
    <button onClick={() => setActiveTag(null)}>Clear</button>
  </div>
)}

<div className="notes-grid">
  {filteredNotes.length === 0 ? (
    <p className="muted">
      {view === "trash"
        ? "Trash is empty"
        : `No ${view} notes found`}
    </p>
  ) : (
    filteredNotes.map((note) => {
      const isOpen = note._id === openNoteId;

      


      return (
        <div
  key={note._id}
  className="card note-card"
  onClick={(e) => {
    e.stopPropagation();

    if (!isOpen) {
      openNote(note);
    }
  }}
>
          {isOpen ? (
            <>
              <input
                ref={titleRef}
                className="input"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
              />

              <div
  className="editor-wrapper"
  onClick={(e) => e.stopPropagation()}
>
  <ReactQuill
    theme="snow"
    value={draftContent}
    onChange={setDraftContent}
    modules={modules}
    formats={formats}
  />
</div>

              <div className="tag-editor">
                {draftTags.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ✕
                  </span>
                ))}

                <input
                  className="tag-input"
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && addTag()
                  }
                />
              </div>

              <div className="actions">
                <button
  className="btn-primary"
  onClick={(e) => {
  e.stopPropagation();
  saveNote();
}}
  disabled={saving}
>
  Save
</button>

                <button
  onClick={(e) => {
    e.stopPropagation();
    closeNote();
  }}
>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="note-header">
                <h3>{note.title}</h3>

                <div className="note-actions">
                  <span
                    className="icon"
                    onClick={(e) => toggleFavorite(note, e)}
                  >
                    {note.isFavorite ? "⭐" : "☆"}
                  </span>

                  <span
                    className="icon"
                    onClick={(e) => togglePin(note, e)}
                  >
                    {note.isPinned ? "📌" : "📍"}
                  </span>

                  {view === "trash" ? (
  <span
    className="icon"
    onClick={(e) => handleRestore(note, e)}
  >
    ♻️
  </span>
) : (
  <span
    className="icon"
    onClick={(e) => handleDelete(note, e)}
  >
    🗑
  </span>
)}
                </div>
              </div>

             <div
   className="note-content muted"
  dangerouslySetInnerHTML={{ __html: note.content }}
/>

              <div className="note-tags">
                {note.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTag(tag);
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
                </div>
      );
    })
  )}
</div>
      </main>
    </div>
  );
};

export default Dashboard;
