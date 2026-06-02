import React from 'react';

function UserList({ users }) {
  return (
    <div className="card">
      <h3>Список всех пользователей (API: GET /users)</h3>
      {users.length === 0 ? (
        <p style={{ color: '#888' }}>Пользователи пока не зарегистрированы.</p>
      ) : (
        <div>
          {users.map(user => (
            <div key={user.id} className="user-item">
              <strong>{user.name}</strong> ({user.email}) 
              {user.age && <span>, Возраст: {user.age}</span>}
              <span className={`badge ${user.role.toLowerCase()}`}>{user.role}</span>
              <div style={{ fontSize: '12px', color: '#888' }}>ID: {user.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;