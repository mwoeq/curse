import React, { useState, useEffect, useCallback } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import BookCatalog from './components/BookCatalog';

function App() {
  // Состояние текущей роли на отладочном стенде
  const [role, setRole] = useState('Admin');
  // Состояние списка пользователей, загруженных с бэкенда
  const [users, setUsers] = useState([]);

  // Функция запроса пользователей к NestJS API
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) throw new Error('Ошибка при получении списка пользователей');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Ошибка на уровне клиента при работе с API:', error);
    }
  }, []);

  // Запрашиваем данные из БД только если активен контекст Администратора
  useEffect(() => {
    if (role === 'Admin') {
      fetchUsers();
    }
  }, [role, fetchUsers]);

  // Коллбэк, который вызывается из UserForm после успешного POST-запроса
  const handleUserAdded = () => {
    fetchUsers();
  };

  return (
    <div className="app-container" style={{ padding: '30px', backgroundColor: '#f4f6f9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* ========================================================================= */}
      {/* СИСТЕМНЫЙ СТЕНД ДЛЯ ЗАЩИТЫ КУРСОВОГО ПРОЕКТА */}
      {/* ========================================================================= */}
      <div style={{ background: '#212529', color: '#f8f9fa', padding: '12px 20px', borderRadius: '6px', marginBottom: '30px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <span style={{ fontWeight: '500' }}>🛠️ ИНЖЕНЕРНЫЙ СТЕНД ОТЛАДКИ: Моделирование контекста безопасности</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px', color: '#adb5bd' }}>Активная роль в сессии: </label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '4px', border: '1px solid #495057', backgroundColor: '#343a40', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
          >
            <option value="Admin">Admin (Администратор)</option>
            <option value="Reader">Reader (Читатель)</option>
            <option value="Guest">Guest (Гость)</option>
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ДИНАМИЧЕСКИЕ ИНТЕРФЕЙСНЫЕ МЕНЮ (СТРОГО ПО МАТРИЦЕ ДОСТУПА ИЗ ТАБЛИЦЫ 1) */}
      {/* ========================================================================= */}
      
      {/* Контекст №1: АРМ Администратора */}
      {role === 'Admin' && (
        <header style={{ marginBottom: '25px', borderLeft: '5px solid #dc3545', backgroundColor: '#fff', padding: '20px', borderRadius: '0 6px 6px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#dc3545', margin: 0, fontSize: '22px' }}>🔒 АРМ Администратора Безопасности</h2>
          <p style={{ margin: '8px 0 0 0', color: '#6c757d', fontSize: '14px' }}>
            <strong>Доступные бизнес-модули:</strong> Регистрация учетных записей, Валидация входных данных NestJS DTO, Просмотр системных логов.
          </p>
          <div style={{ marginTop: '10px', display: 'inline-block', backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>
            🚫 Доступ к каталогу книг и выставлению оценок ЗАБЛОКИРОВАН
          </div>
        </header>
      )}

      {/* Контекст №2: Портал Читателя */}
      {role === 'Reader' && (
        <header style={{ marginBottom: '25px', borderLeft: '5px solid #007bff', backgroundColor: '#fff', padding: '20px', borderRadius: '0 6px 6px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#007bff', margin: 0, fontSize: '22px' }}>📖 Личный кабинет читателя | Цифровая Библиотека</h2>
          <p style={{ margin: '8px 0 0 0', color: '#6c757d', fontSize: '14px' }}>
            <strong>Доступные бизнес-модули:</strong> Интерактивный каталог литературы, Синхронизация Избранного с LocalStorage.
          </p>
          <div style={{ marginTop: '10px', display: 'inline-block', backgroundColor: '#cce5ff', color: '#004085', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>
            🚫 Доступ к панели администратора и API управления пользователями ЗАБЛОКИРОВАН
          </div>
        </header>
      )}

      {/* Контекст №3: Режим Гостя */}
      {role === 'Guest' && (
        <header style={{ marginBottom: '25px', borderLeft: '5px solid #6c757d', backgroundColor: '#fff', padding: '20px', borderRadius: '0 6px 6px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#6c757d', margin: 0, fontSize: '22px' }}>👁️ Ознакомительный гостевой доступ</h2>
          <p style={{ margin: '8px 0 0 0', color: '#6c757d', fontSize: '14px' }}>
            <strong>Доступные бизнес-модули:</strong> Просмотр каталога книг (Режим «Только чтение»).
          </p>
          <div style={{ marginTop: '10px', display: 'inline-block', backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
            ⚠️ Функции изменения данных, добавления пользователей и оценки книг ПОЛНОСТЬЮ ОТКЛЮЧЕНЫ
          </div>
        </header>
      )}

      {/* ========================================================================= */}
      {/* ОТРИСОВКА ИЗОЛИРОВАННОГО КОНТЕНТА В ЗАВИСИМОСТИ ОТ ТЕКУЩЕЙ РОЛИ */}
      {/* ========================================================================= */}
      <main style={{ marginTop: '20px' }}>
        {/* Контент Администратора: передаем текущую роль внутрь формы через пропсы */}
        {role === 'Admin' && (
          <div style={{ display: 'block' }}>
            <UserForm onUserAdded={handleUserAdded} currentRole={role} /> 
            <div style={{ marginTop: '20px' }}>
              <UserList users={users} />
            </div>
          </div>
        )}

        {/* Контент Читателя или Гостя */}
        {(role === 'Reader' || role === 'Guest') && (
          <BookCatalog currentRole={role} />
        )}
      </main>
    </div>
  );
}

export default App;