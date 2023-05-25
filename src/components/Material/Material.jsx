export const Material = ({ item, onDelete, onUpdate }) => {
  const { id, title, link } = item;

  return (
    <>
      <p>
        <b>Title:</b> {title}
      </p>
      <p>
        <b>Link:</b> {link}
      </p>

      <button type="button" onClick={() => onUpdate({ id, title: Date.now() })}>
        Edit
      </button>

      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </>
  );
};
