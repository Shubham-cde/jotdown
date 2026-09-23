import { useState, useRef } from "react";

export default function NoteComposer({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() && !content.trim()) return;

    await onCreate({
      title: title.trim() || "Untitled",
      content: content.trim(),
    });

    setTitle("");
    setContent("");
  }

  function handleTitleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      contentRef.current?.focus();
    }
  }

  return (
    <form className="composer glass-strong" onSubmit={handleSubmit}>
      {/* Title */}
      <input
        type="text"
        placeholder="Untitled note..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleTitleKeyDown}
        className="composer-title"
      />

     

      {/* Content */}
      <textarea
        ref={contentRef}
        placeholder="Start writing your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="composer-content"
      />

      {/* Footer */}
      <div className="composer-footer">
        <span className="muted">Press Enter to move • Ctrl+Enter to save</span>
        <button type="submit" className="btn-primary">
          Add Note
        </button>
      </div>
    </form>
  );
}
