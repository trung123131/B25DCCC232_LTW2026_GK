import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedBooks = localStorage.getItem('gk_books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    axios
      .get('/data/books.json', { signal: controller.signal })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_books', JSON.stringify(books));
    }
  }, [books, loading, error]);

  const handleAddBook = (newBookData) => {
    const maxId = books.reduce(
      (max, { id }) => (id > max ? id : max),
      0
    );
    const newBook = {
      id: maxId + 1,
      ...newBookData,
      available: true,
    };
    setBooks([...books, newBook]);
  };

  const handleToggleStatus = (bookId) => {
    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, available: !book.available } : book
    );
    setBooks(updatedBooks);
  };

  const handleDeleteBook = (bookId) => {
    const updatedBooks = books.filter(({ id }) => id !== bookId);
    setBooks(updatedBooks);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {loading ? (
          <>
            <Route index element={<p>Đang tải...</p>} />
            <Route path="*" element={<p>Đang tải...</p>} />
          </>
        ) : error ? (
          <>
            <Route index element={<p>Không tải được dữ liệu</p>} />
            <Route path="*" element={<p>Không tải được dữ liệu</p>} />
          </>
        ) : (
          <>
            <Route index element={<Home books={books} />} />
            <Route
              path="books"
              element={
                <BookList
                  books={books}
                  onToggleStatus={handleToggleStatus}
                  onDeleteBook={handleDeleteBook}
                />
              }
            />
            <Route
              path="books/new"
              element={<AddBook onAddBook={handleAddBook} />}
            />
            <Route
              path="books/:id"
              element={<BookDetail books={books} />}
            />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default App;