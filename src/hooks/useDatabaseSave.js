import { useState } from 'react'
import firebase from 'firebase'

export default (collectionName, documentId = null) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)

  const save = async fields => {
    setIsSuccess(null)
    setIsSaving(true)

    try {
      const collection = firebase.firestore().collection(collectionName)

      if (documentId) {
        await collection.doc(documentId).set(fields, { merge: true })
      } else {
        await collection.add(fields)
      }

      setIsSuccess(true)
      setIsSaving(false)
    } catch (err) {
      setIsSuccess(false)
      setIsSaving(false)
      console.error(err)
    }
  }

  return [isSaving, isSuccess, save]
}
