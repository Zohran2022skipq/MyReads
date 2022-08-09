import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "../src/BooksAPI";
const SerachBook = ({ updateState,bookOnShelf }) => {

  const [searchText, setSearchText] = useState("");
  const [resultBooks, setResultBooks] = useState([]);

  console.log(resultBooks);

  const onChangeHandle = async (e) => {
    setSearchText(e)
  }

  useEffect(() => {
    const getSearch = async () => {
      const res = await BooksApi.search(searchText, 100);
      bookOnShelf.map((v,ind)=>
        {
          if(v.id===res[ind].id)
          {
            console.log("Mojood Hy");
          }
        })
        
      setResultBooks(res);
    }
    if(searchText.length>0)
      getSearch();
    else
      setResultBooks([]);
    
    
  }, [searchText])


  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">

          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input type="text" value={searchText} onChange={(e) => onChangeHandle(e.target.value)} placeholder="Search by title, author, or ISBN" />
          </div>

        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              resultBooks.length ?resultBooks.map(book => {

                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                              `url(${book.imageLinks.thumbnail})`,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf}  onChange={e => updateState(e, book)}>
                            <option value="none"  disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading"  >
                              Currently Reading
                            </option>
                            <option value="wantToRead"  >Want to Read</option>
                            <option value="read" >Read</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.writer}</div>
                    </div>
                  </li>
                )
              }):<></>
            }
          </ol>
        </div>
      </div>

    </div>
  );
}

export default SerachBook;