import React, { useEffect, useState } from 'react';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001') // 先ほど8001に変更したならこちらも変更する
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>React + PHPの連携テスト</h1>
      <p>バックエンドからのメッセージ：{backendMessage}</p>
    </div>
  );
}

export default App;
