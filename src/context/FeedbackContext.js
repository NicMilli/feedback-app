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
      setFeedbackEdit({   
        item:id,
        edit: false
    })
        if(window.confirm('Are you sure you want to permanently delete this item')){
          setFeedback(feedback.filter((item) => item.id !== id))
        }
      }

      const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
          setFeedback([newFeedback, ...feedback])
      }

      //Update feedback
      const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => (item.id === id ? {
          ...item, ...updItem} : item))
          )
          // Fix a bug in course code where the app gets stuck in edit mode
          setFeedbackEdit({   
            item:{},
            edit: false
        })
      }

      //Set item to be edited - changed so that clicking while in edit mode will exit edit mode
      const editFeedback = (item) => {
        if(feedbackEdit.edit === true){
          setFeedbackEdit({
            item,
            edit: false, 
          })
        } else {
        setFeedbackEdit({
          item,
          edit: true,
        })}
      }

      //Adding function to handle cancelling an edit
      const editCancel = (itm) => {
        setFeedbackEdit({
          itm,
          edit: false, 
        })
      }
    
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        editCancel
        // feedbackEdit is the state and editFeedback is the function updating that piece of state
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext