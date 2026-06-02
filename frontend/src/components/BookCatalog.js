import React, { useState, useEffect } from 'react';

const INITIAL_BOOKS = [
  { id: 'b1', title: 'Преступление и наказание', author: 'Ф. Достоевский', genre: 'Классика' },
  { id: 'b2', title: 'Мастер и Маргарита', author: 'М. Булгаков', genre: 'Фантастика' },
  { id: 'b3', title: '1984', author: 'Дж. Оруэлл', genre: 'Антиутопия' },
  { id: 'b4', title: 'Идиот', author: 'Ф. Достоевский', genre: 'Классика' }
];

function BookCatalog({ currentRole }) {
  const [favorites, setFavorites] = useState([]);

  // Загружаем избранное из LocalStorage при монтировании
  useEffect(() => {
    const storedFavs = localStorage.getItem('favorite_books');
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  const toggleFavorite = (bookId) => {
    let updated;
    if (favorites.includes(bookId)) {
      updated = favorites.filter(id => id !== bookId);
    } else {
      updated = [...favorites, bookId];
    }
    setFavorites(updated);
    localStorage.setItem('favorite_books', JSON.stringify(updated));
  };

  return (
    <div className="card" style={{ gridColumn: '1 / -1' }}>
      <h2>Каталог книг (Тема варианта)</h2>
      <p>Текущая категория доступа: <strong>{currentRole}</strong></p>
      
      {currentRole === 'Guest' ? (
        <p style={{ color: '#ff9800' }}>Вы просматриваете каталог как Гость. Зарегистрируйтесь или переключитесь на роль Reader, чтобы добавлять книги в Избранное.</p>
      ) : null}

      <div className="books-grid">
        {INITIAL_BOOKS.map(book => {
          const isFav = favorites.includes(book.id);
          return (
            <div key={book.id} className="book-card">
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{book.title}</h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>Автор: {book.author}</p>
                <span style={{ fontSize: '12px', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{book.genre}</span>
              </div>
              {currentRole !== 'Guest' && (
                <button 
                  className={`fav-btn ${isFav ? 'active' : ''}`} 
                  onClick={() => toggleFavorite(book.id)}
                >
                  {isFav ? '★ В избранном' : '☆ Добавить в избранное'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default BookCatalog;
