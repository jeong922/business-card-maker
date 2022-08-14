import { getDatabase, off, onValue, ref, remove, set } from 'firebase/database';

class TodoRepository {
  constructor(app) {
    this.db = getDatabase(app);
  }

  syncTodo(userId, onUpdate) {
    const query = ref(this.db, `${userId}/todos`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => off(query);
  }

  saveTodo(userId, todo) {
    set(ref(this.db, `${userId}/todos/${todo.id}`), todo);
  }

  removeTodo(userId, todo) {
    remove(ref(this.db, `${userId}/todos/${todo.id}`));
  }
}

export default TodoRepository;
