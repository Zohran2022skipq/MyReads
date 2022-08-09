import "./App.css";
import { useEffect, useState } from "react";
import * as BooksApi from "../src/BooksAPI";
import SerachBook from "./SearchBook";
import BookShelfChanger from "./BookShelfChanger";
import BookShelf from "./BookShelff";
import { Routes, Route, useNavigate} from 'react-router-dom'
import OpenSearch from "./OpenSearch";

function App() {
  const navigate=useNavigate();
  const [bookOnShelf, setBookOnShelf] = useState([]);
  useEffect(() => {
    const retrieveBooks = async () => {
      const res = await BooksApi.getAll();
      setBookOnShelf(res);
    }
    retrieveBooks();

  }, []);

  const updateState = (e, value) => {
    console.log(e.target.value)
    const updateShelf = async () => {
      const res = await BooksApi.update(value, e.target.value);
      const re = await BooksApi.getAll();
      setBookOnShelf(re);
      navigate("/");

    }

    updateShelf();

  }

  return (
    <>
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Routes>
            <Route exact path="/" element={
              <div>
                <BookShelf title="Currently Reading" comparator={"currentlyReading"} bookOnShelf={bookOnShelf} updateState={updateState} />
                <BookShelf title="Want to Read" comparator={"wantToRead"} bookOnShelf={bookOnShelf} updateState={updateState} />
                <BookShelf title="Read" comparator={"read"} bookOnShelf={bookOnShelf} updateState={updateState} />
                <OpenSearch />
              </div>
            } />
            <Route path="/addBook" element={<SerachBook updateState={updateState}  bookOnShelf={bookOnShelf}/>} />
          </Routes>
        </div>

      </div>

    </>
  );
}

export default App;

