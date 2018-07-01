import { db } from './firebase';

export const doCreateCategory = (id, data) =>
  db.ref(`categories/${id}`).set({
    id,
    ...data,
  });
export const getAllCategories = () => 
  db.ref('categories').once('value');

export const getCategory = (id) => 
  db.ref(`categories/${id}`).once('value');

export const doCreateProductsList = () => {
  const now = new Date();
  const manufacturingDate = now.setDate(now.getDate() + now.getDay());
  const expiryDate = 7;
  for (let i = 1; i <=200; i++) {
    const weight = Math.floor((Math.random() * 600) + 400);
    db.ref(`products/${i}`).set({
      id: i,
      name: 'Rau Mâm Xôi',
      type: 'Rau xanh',
      code: `RMX${i}`,
      weight,
      manufacturingDate,
      expiryDate,
    });
  }
}

export const getAllProducts = () => 
  db.ref(`products`).once('value');

export const getProducts = (url) => 
  db.ref(url).once('value');
