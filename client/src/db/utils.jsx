import { db } from './firebase'

/**
 *
 * @param {*} userId
 * @returns
 */
export const getUserDoc = async userId => {
  return await db.collection('users').doc(userId).get()
}

/**
 *
 * @param {*} userId
 * @param {*} collection
 * @param {*} data
 */
export const addRecord = async (userId, collection, data) => {
  await db.collection('users').doc(userId).collection(collection).add(data)
}

/**
 *
 * @param {*} userId
 * @param {*} collection
 * @param {*} recordId
 * @param {*} data
 */
export const updateRecord = async (userId, collection, recordId, data) => {
  await db
    .collection('users')
    .doc(userId)
    .collection(collection)
    .doc(recordId)
    .update(data)
}

/**
 *
 * @param {*} userId
 * @param {*} collection
 * @param {*} recordId
 */
export const deleteRecord = async (userId, collection, recordId) => {
  await db
    .collection('users')
    .doc(userId)
    .collection(collection)
    .doc(recordId)
    .delete()
}
