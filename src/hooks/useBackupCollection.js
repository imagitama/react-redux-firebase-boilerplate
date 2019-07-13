import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

const convertReferencesToValues = recordWithReferences =>
  Object.entries(recordWithReferences)
    .map(([key, value]) => {
      if (value.id) {
        return [key, `ref:${value.path}`]
      }
      return [key, value]
    })
    .reduce(
      (newObj, [key, value]) => ({
        ...newObj,
        [key]: value
      }),
      {}
    )

export default collectionName => {
  const [isLoading, setIsLoading] = useState(null)
  const [isErrored, setIsErrored] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [results, setResults] = useState(null)

  const getData = async () => {
    if (!collectionName) {
      console.warn('Cannot database backup: no collection name provided')
      return
    }

    setIsLoading(true)
    setIsErrored(null)
    setIsSuccess(null)

    try {
      const result = await firebase
        .firestore()
        .collection(collectionName)
        .get()

      const resultDocs = result.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .map(convertReferencesToValues)

      setIsLoading(false)
      setIsErrored(false)
      setIsSuccess(true)
      setResults(resultDocs)
    } catch (err) {
      setIsErrored(true)
      setIsLoading(false)
      setIsSuccess(false)
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [collectionName])

  return [isLoading, isErrored, isSuccess, results]
}
