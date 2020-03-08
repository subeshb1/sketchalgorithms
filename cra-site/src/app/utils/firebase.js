import { curry, Task } from ".";

// Safe

//  collectionRef :: Ref -> String -> Ref
export const collectionRef = curry((parent, collName) =>
  parent.collection(collName)
);
// docRef :: collectionRef  -> String -> docRef
export const docRef = curry((parent, doc) => parent.doc(doc));
//emptyDoc :: collectionRef -> emptyDocRef
export const emptyDocRef = parent => parent.doc();
// getDoc :: docRef -> Task docRef
export const getDoc = docRef =>
  new Task((rej, res) =>
    docRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          throw new TypeError(`Document does not exist! ${doc.id}`);
        }
        res(doc);
      })
      .catch(rej)
  );
// getCollectionRef :: collRef -> Task [docRef]
export const getCollectionDoc = (collRef, option = {}) =>
  new Task((rej, res) =>
    collRef
      .get(option)
      .then(querySnapshot => {
        res(querySnapshot);
      })
      .catch(rej)
  );
// setData :: Ref -> id -> data -> Task Ref
export const setDoc = curry(
  (docRef, data, ...merge) =>
    new Task((rej, res) =>
      docRef
        .set(data, merge.length && merge[0] && { merge: true })
        .then(res)
        .catch(rej)
    )
);

export const addDoc = curry(
  (ref, data) =>
    new Task((rej, res) =>
      ref
        .add(data)
        .then(res)
        .catch(rej)
    )
);
export const updateDoc = curry(
  (ref, data) =>
    new Task((rej, res) =>
      ref
        .update(data)
        .then(res)
        .catch(rej)
    )
);

export const deleteDoc = docRef =>
  new Task((rej, res) => docRef.delete().then(res, rej));

export const transaction = (firestore, transactionTask) =>
  new Task((rej, res) =>
    firestore
      .runTransaction(transaction => {
        return new Promise((res, rej) => {
          transactionTask(transaction).fork(rej, res);
        });
      })
      .then(res)
      .catch(rej)
  );

export const transactionGet = curry(
  (docRef, transaction) =>
    new Task((rej, res) =>
      transaction
        .get(docRef)
        .then(doc => {
          if (!doc.exists) {
            throw new TypeError(`Document does not exist! ${doc.id}`);
          }
          res(doc);
        })
        .catch(rej)
    )
);

export const snapshotToArr = x =>
  x.docs.map(x => ({
    id: x.id,
    ...x.data()
  }));

//Realtime
export const snapShot = (ref, options = {}) =>
  new Task((rej, res) => ref.onSnapshot(options, res, rej));

// Query
export const query = curry((filter, comparison, value, collectionRef) =>
  collectionRef.where(filter, comparison, value)
);

export const orderBy = curry((filter, order, collectionRef) =>
  collectionRef.orderBy(filter, order)
);
export const limit = curry((val, collRef) => collRef.limit(val));
// Ill handle the day  I get the problem
export const startAt = curry((val, collRef) => collRef.startAt(...val));
export const startAfter = curry((val, collRef) => collRef.startAfter(...val));
export const endAt = curry((val, collRef) => collRef.endAt(...val));
export const endBefore = curry((val, collRef) => collRef.endBefore(...val));
