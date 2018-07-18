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

export const getProductIndex = () =>
  db.ref(`productIndex`).once('value');

export const setProductIndex = (id) =>
  db.ref(`productIndex`).set(id);

export const doCreateProductsList = (data) => {
  getProductIndex()
    .then((snapshot) => {
      console.log(snapshot.val());
      const start = parseInt(snapshot.val(), 10);
      const totalProducts = parseInt(data.totalProducts, 10);
      for (let i = 0; i < totalProducts; i++) {
        db.ref(`products/${i + start}`).set({
          id: i + start,
          name: data.name,
          type: data.type,
          code: `${data.defaultCode}-${i}`,
          manufacturingDate: data.manufacturingDate,
          expiryDate: parseInt(data.expiryDate, 10),
          url: `https://iot-hydro.firebaseapp.com/products/${i + start}`,
        });
      }
      setProductIndex(start + parseInt(data.totalProducts, 10));
    });
}

export const getAllProducts = () =>
  db.ref(`products`).once('value');

export const getProducts = (url) =>
  db.ref(url).once('value');

export const getStep = () =>
  db.ref('currentStep').once('value');

export const setStep = (step) =>
  db.ref('currentStep').set(step);

export const doCreateProject = (id, data) =>
  db.ref(`projects/${id}`).set({
    id,
    ...data,
  });

export const doCreateSettings = (id, data) =>
  db.ref(`settings/${id}`).set({
    id,
    ...data,
  });

export const setDefaultSettings = (data) =>
  db.ref('defaultSettings').set(data);

export const getIndexSettings = () =>
  db.ref('settingsIndex').once('value');

export const setIndexSettings = (id) =>
  db.ref('settingsIndex').set(id);

export const getCurrentProject = () =>
  db.ref('currentProject').once('value');