import React from 'react';

const Home = ({ books }) => {
  const totalBooks = books.length;

  const borrowedBooks = books.reduce(
    (count, { available }) => (!available ? count + 1 : count),
    0
  );

  const latestYear =
    books.length === 0
      ? 0
      : books.reduce((max, { year }) => (year > max ? year : max), 0);

  return (
    <div>
      <h1>Thư viện sách</h1>
      <p>{`Tổng số sách: ${totalBooks}`}</p>
      <p>{`Số sách đang cho mượn: ${borrowedBooks}`}</p>
      <p>{`Năm xuất bản mới nhất: ${latestYear}`}</p>
    </div>
  );
};

export default Home;