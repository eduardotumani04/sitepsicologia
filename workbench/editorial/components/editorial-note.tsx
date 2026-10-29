export function EditorialNote({ children, title = "Para revisão editorial" }: { children: React.ReactNode; title?: string }) {
  return (
    <aside className="editorial-note" aria-label={title}>
      <p className="editorial-note-title">{title}</p>
      <div>{children}</div>
    </aside>
  );
}
