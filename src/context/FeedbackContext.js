import { v4 as uuidv4 } from "uuid"
import { createContext, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is feedback item 1',
      rating: 10
    },
    {
      id: 2,
      text: 'This is feedback item 2',
      rating: 9
    },
    {
      id: 3,
      text: 'This is feedback item 3',
      rating: 7
    }
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback]) // spread operator (it seems to me that here we take array of existing feedbacks and make a list of them with a help of spread operator and push the list to a new array)
  }

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
  }  //  ...item, ...updItem как я понимаю здесь раскрываются  item и updItem и перезаписываются свойства  item на updItem

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return <FeedbackContext.Provider 
  value={{
    feedback, // the same as feedback: feedback
    feedbackEdit,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback, 
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext