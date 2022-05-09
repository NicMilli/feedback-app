import {createContext, useState} from 'react'
import { v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState ([{
        id: 1,
        text: 'Context item1',
        rating: 10,
    }])

    const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false,
    })

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to permanently delete this item')){
          setFeedback(feedback.filter((item) => item.id !== id))
        }
      }

      const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
          setFeedback([newFeedback, ...feedback])
      }

      //Set item to be edited
      const editFeedback = (item) => {
        setFeedbackEdit({
          item,
          edit: true,
        })
      }
    
    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        // feedbackEdit is the state and editFeedback is the function updating that piece of state
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext