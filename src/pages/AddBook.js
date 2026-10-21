import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddBook = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || String(year).trim() === '' || !category) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const yearNumber = Number(year);
    if (
      !Number.isInteger(yearNumber) ||
      yearNumber < 1900 ||
      yearNumber > 2026
    ) {
      setErrorMsg('Năm xuất bản phải từ 1900 đến 2026');
      return;
    }

    onAddBook({
      title: title.trim(),
      author: author.trim(),
      year: yearNumber,
      category,
    });

    navigate('/books', { replace: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tên sách</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Tác giả</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Năm xuất bản</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Thể loại</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Thêm</button>
      </form>

      {errorMsg && <p className="error-text">{errorMsg}</p>}
    </div>
  );
};

export default AddBook;