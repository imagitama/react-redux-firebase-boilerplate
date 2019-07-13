import { useEffect, useState } from 'react'
import { firestore } from 'firebase/app'

export default (collectionName, documentId) => {
  const [document, setDocument] = useState(null)

  useEffect(() => {
    const doc = firestore()
      .collection(collectionName)
      .doc(documentId)

    setDocument(doc)
  }, [])

  return [document]
}
