import { getDatabase, off, onValue, ref, remove, set } from 'firebase/database';
class Repository {
  constructor(app) {
    this.db = getDatabase(app);
  }

  syncItems(userId, onUpdate, directory) {
    const query = ref(this.db, `${userId}/${directory}`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => off(query);
  }

  saveItem(userId, item, directory) {
    set(ref(this.db, `${userId}/${directory}/${item.id}`), item);
  }

  removeItem(userId, item, directory) {
    remove(ref(this.db, `${userId}/${directory}/${item.id}`));
  }
}

export default Repository;
