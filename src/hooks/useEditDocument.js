import { useState } from 'react'
import firebase from 'firebase/app'

export default (collectionName, documentId) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)

  const save = async fields => {
    setIsSuccess(null)
    setIsSaving(true)

    try {
      await firebase
        .firestore()
        .collection(collectionName)
        .doc(documentId)
        .set(fields, { merge: true })

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
