import { v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import AboutPage from './pages/AboutPage'
import AboutLink from './components/AboutLink'

function App() {
    const [feedback, setFeedback] = useState
    (FeedbackData)

    const deleteFeedback = (id) => {
      if(window.confirm('Are you sure you want to permanently delete this item')){
        setFeedback(feedback.filter((item) => item.id !== id))
      }
    }

    const addFeedback = (newFeedback) => {
      newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    return (
    <Router>
      <Header />    
        <div className='container'>
          <Routes>
          <Route exact path='/' element={
            <>
              <FeedbackForm handleAdd={addFeedback} /> 
              <FeedbackStats feedback={feedback} />
              <FeedbackList feedback={feedback} 
              handleDelete={deleteFeedback}/>
              <AboutLink />
            </>
          }
          ></Route>

            <Route path='/about' element={<AboutPage />} />
            </Routes>

        </div>
    </Router>

    )
}

export default App