import { useState, useEffect } from 'react'
import firebase from 'firebase'

const secondsToDate = seconds => {
  const t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(seconds)
  return t
}

const mapDates = doc => {
  const entries = Object.entries(doc)

  const newDoc = entries.reduce((finalDoc, [key, value]) => {
    return {
      ...finalDoc,
      [key]:
        value && value.hasOwnProperty('seconds')
          ? secondsToDate(value.seconds)
          : value
    }
  }, {})

  return newDoc
}

const getDataFromReference = async record => {
  const result = await record.get()
  return result.data()
}

const mapReferences = async doc => {
  const newDoc = { ...doc }

  const results = await Promise.all(
    Object.entries(newDoc).map(async ([key, value]) => {
      if (value && value instanceof firebase.firestore.DocumentReference) {
        return [key, await getDataFromReference(value)]
      }
      return [key, await Promise.resolve(value)]
    })
  )

  results.forEach(([key, value]) => (newDoc[key] = value))

  return newDoc
}

export default (collectionName, documentId = null, searchTerm = '') => {
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const [results, setResults] = useState(documentId ? null : [])

  const getData = async () => {
    setIsLoading(true)

    try {
      const collection = firebase.firestore().collection(collectionName)

      let query

      if (documentId) {
        const doc = await collection.doc(documentId).get()
        const data = await doc.data()

        const mappedDoc = await mapReferences(
          mapDates({
            ...data,
            id: data.id
          })
        )

        setIsLoading(false)
        setResults(mappedDoc)
        return
      }

      if (searchTerm) {
        query = await collection
          .where('keywords', 'array-contains', searchTerm)
          .get()
      } else {
        query = await collection.get()
      }

      setIsLoading(false)

      const docs = query.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .map(mapDates)
      const docsWithReferences = await Promise.all(docs.map(mapReferences))

      setResults(docsWithReferences)
    } catch (err) {
      setIsErrored(true)
      setIsLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [searchTerm])

  return [isLoading, isErrored, results]
}
