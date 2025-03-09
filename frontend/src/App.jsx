useEffect(() => {
  fetch('http://localhost:8080/todos')
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error(err));
}, []);

const addTodo = () => {
  fetch('http://localhost:8080/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: input })
  })


// useEffect(() => {
//   fetch('http://localhost:8001/todos')  // ← URLを変更
//     .then(res => res.json())
//     .then(data => setTodos(data))
//     .catch(err => console.error(err));
// }, []);

// const addTodo = () => {
//   fetch('http://localhost:8001/todos', {  // ← URLを変更
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ text: input })
//   })
  .then(res => res.json())
  .then(newTodo => {
    setTodos([...todos, newTodo]);
    setInput('');
  })
  .catch(err => console.error(err));
};
