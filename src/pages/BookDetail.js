import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetail = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookId = Number(id);
  const book = books.find((item) => item.id === bookId);

  if (!book) {
    return (
      <div>
        <p>Không tìm thấy sách</p>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  const { title, author, year, category, available } = book;

  return (
    <div>
      <p>{`Tên sách: ${title}`}</p>
      <p>{`Tác giả: ${author}`}</p>
      <p>{`Năm xuất bản: ${year}`}</p>
      <p>{`Thể loại: ${category}`}</p>
      <p>{`Trạng thái: ${available ? 'Có sẵn' : 'Đang mượn'}`}</p>
      <button type="button" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default BookDetail;