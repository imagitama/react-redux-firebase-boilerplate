import { useState, useEffect } from 'react'
import { firestore } from 'firebase/app'

const removeIdFromDocData = docData =>
  Object.entries(docData)
    .filter(([key]) => key !== 'id')
    .reduce(
      (newObj, [key, value]) => ({
        ...newObj,
        [key]: value
      }),
      {}
    )

const mapRefValuesToRefs = docWithRefValues =>
  Object.entries(docWithRefValues)
    .map(([key, value]) => {
      if (typeof value === 'string' && value.includes('ref')) {
        const brokenUp = value.split('/')
        const collectionName = brokenUp[0].split(':')[1] // remove ref
        const documentId = brokenUp[1]

        const doc = firestore()
          .collection(collectionName)
          .doc(documentId)

        return [key, doc]
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

const secondsToDate = seconds => new Date(seconds * 1000)

const mapTimestampsToDates = docWithTimestamps =>
  Object.entries(docWithTimestamps)
    .map(([key, value]) => {
      if (value.seconds) {
        return [key, secondsToDate(value.seconds)]
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

export default (collectionName, restoreDataJson) => {
  const [isLoading, setIsLoading] = useState(null)
  const [isErrored, setIsErrored] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  const getData = async () => {
    if (!collectionName || !restoreDataJson) {
      console.warn(
        'Cannot database restore: no collection name or data provided!'
      )
      return
    }

    setIsLoading(true)
    setIsErrored(null)
    setIsSuccess(null)

    try {
      const restoreData = JSON.parse(restoreDataJson)

      await Promise.all(
        restoreData.map(async docData => {
          await firestore()
            .collection(collectionName)
            .doc(docData.id)
            .set(
              mapTimestampsToDates(
                mapRefValuesToRefs(removeIdFromDocData(docData))
              ),
              {
                merge: true
              }
            )
        })
      )

      setIsLoading(false)
      setIsErrored(false)
      setIsSuccess(true)
    } catch (err) {
      setIsErrored(true)
      setIsLoading(false)
      setIsSuccess(false)
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [collectionName]) // do not subscribe to restoreData to avoid re-restores

  return [isLoading, isErrored, isSuccess]
}
