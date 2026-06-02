import React, { useState } from 'react';

function UserForm({ onUserAdded, currentRole }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Reader'); // Роль, которую создаем ДЛЯ НОВОГО юзера
  const [error, setError] = useState('');

  // ГЛАВНЫЙ ФИЛЬТР: Если на стенде выбран не Admin, форму вообще не показываем
  if (currentRole !== 'Admin') {
    return (
      <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '6px', border: '1px solid #f5c6cb', marginBottom: '20px', fontWeight: '500' }}>
        🚫 <strong>Доступ ограничен:</strong> Создание записей заблокировано для текущей сессии ({currentRole}).
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, age: Number(age), role }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Ошибка валидации бэкенда (NestJS DTO)');
      }

      // Если всё успешно — очищаем поля формы
      setName('');
      setEmail('');
      setAge('');
      
      // Вызываем триггер обновления списка в App.js
      onUserAdded(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ background: '#fff', padding: '25px', borderRadius: '6px', marginBottom: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e3e6f0' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#dc3545', fontSize: '18px' }}>➕ Регистрация нового пользователя в системе</h3>
      
      {error && (
        <p style={{ color: '#721c24', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '4px', fontSize: '13px', border: '1px solid #f5c6cb' }}>
          ❌ {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <input 
            type="text" 
            placeholder="Имя пользователя" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d3e2', boxSizing: 'border-box' }} 
          />
        </div>
        
        <div style={{ flex: '1', minWidth: '180px' }}>
          <input 
            type="email" 
            placeholder="Корпоративный Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d3e2', boxSizing: 'border-box' }} 
          />
        </div>
        
        <div style={{ width: '90px' }}>
          <input 
            type="number" 
            placeholder="Возраст" 
            value={age} 
            onChange={e => setAge(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d3e2', boxSizing: 'border-box' }} 
          />
        </div>
        
        <div style={{ width: '120px' }}>
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)} 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d3e2', backgroundColor: '#fff', height: '37px' }}
          >
            <option value="Admin">Admin</option>
            <option value="Reader">Reader</option>
            <option value="Guest">Guest</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={{ padding: '9px 20px', cursor: 'pointer', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          Сохранить в БД
        </button>
      </form>
    </div>
  );
}

export default UserForm;