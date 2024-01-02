import React, { useContext, useState } from "react";
import { MagazineContext } from "../contexts/MagazineContext";

const NewBookForm = () => {
  // @ts-ignore
  const { dispatch } = useContext(MagazineContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_BOOK", payload: { title, author } });
    setTitle("");
    setAuthor("");
  };

  return (
    <form>
      <input
        type="text"
        placeholder="book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="book author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input type="submit" value="Add book" onClick={handleSubmit} />
    </form>
  );
};

export default NewBookForm;
