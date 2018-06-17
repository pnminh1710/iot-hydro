import { db } from './firebase';

export const doCreateCategory = (id, data) =>
  db.ref(`categories/${id}`).set({
    ...data
  });

export const getCategory = (id) => 
  db.ref(`categories/${id}`).once('value');
