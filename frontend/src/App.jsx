import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/todos') //ポートを8080に変更済み
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  }, []);

  const addTodo = () => {
    fetch('http://localhost:8001/todos', { // ポートを8080に合わせている
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    })
    .then(res => res.json())
    .then(newTodo => {
      setTodos([...todos, newTodo]);
      setInput('');
    })
    .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>React + PHPのTODOアプリ</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
      />
      <button onClick={addTodo}>追加</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
