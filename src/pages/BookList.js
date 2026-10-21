import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import BookTable from '../components/BookTable';

const BookList = ({ books, onToggleStatus, onDeleteBook }) => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  const filteredBooks = books.filter(({ title, category: bookCategory }) => {
    const matchTitle = title
      .toLowerCase()
      .includes(debouncedKeyword.trim().toLowerCase());
    const matchCategory =
      category === 'Tất cả' || bookCategory === category;
    return matchTitle && matchCategory;
  });

  const isSearching = keyword !== debouncedKeyword;

  return (
    <div>
      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
        isSearching={isSearching}
      />

      <p>{`Tìm thấy ${filteredBooks.length} cuốn sách`}</p>

      {filteredBooks.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <BookTable
          books={filteredBooks}
          onToggleStatus={onToggleStatus}
          onDeleteBook={onDeleteBook}
        />
      )}
    </div>
  );
};

export default BookList;