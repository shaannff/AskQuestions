import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Questions = () => {

  const {isAuthenticated,email}=useSelector((state)=>state.user)

  const API_URL ='http://localhost:7000/api/user'
  const token = localStorage.getItem('token')
  
  
  const [questions, setQuestions] = useState([]);
  const [showQuestionAdd, setShowQuestionAdd] = useState(false);
  const [showAnswer,setShowAnswer]=useState(false)
  const [questionText, setQuestionText] = useState('');
  const [answer,setAnswer]=useState('')
  const [err, setErr] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  
    useEffect(()=>{
      fetchQuestions()
      
    },[questions])


    const fetchQuestions=async()=>{
      try {
        const response = await fetch(`${API_URL}/getQuestions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
        })
        const data = await response.json()
        if(response.ok){
          console.log(data.data)
          setQuestions(data.data)
        }
        console.log(data)
      } catch (error) {
        console.log(error,'from the fetchquestions')
      }
    }

    const addQuestion = async()=>{
        try {
            const response = await fetch(`${API_URL}/addQuestion`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body:JSON.stringify({questionText,email})
            })

            const data = await response.json()
            console.log(data)
            if(!response.ok){
                setErr(data.message)
            }else{
                setShowQuestionAdd(false)
                setErr('')
                setQuestionText('');
                fetchQuestions()
            }
            
        } catch (error) {
            console.log(error,'error from the add question')
        }
    }

    const handleQuestionSubmission= async(e)=>{
          e.preventDefault()
          if(!questionText.trim()){
            setErr('question cannot be empty')
            return
          }
          addQuestion()
          console.log(questionText)
    }

    const addanswer=async(id)=>{
      try {

        const response=await fetch(`${API_URL}/addAnswer`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':token ? `Bearer ${token}`:''
          },
          body:JSON.stringify({id,answer,email})
        })

        const data = await response.json()
        if(response.status == 200){
          setShowAnswer(false)
          setAnswer('')
          setSelectedQuestionId(null)
        }
        console.log(data)
      } catch (error) {
        console.log(error,'from the addanswer')
      }
    }
       
    const handleAnswersubmission=async(e)=>{
      try {
        e.preventDefault()
        if(!answer.trim()){
          return setErr('answer should be valid')
        }
        console.log(selectedQuestionId)
         addanswer(selectedQuestionId)
      } catch (error) {
        console.log(error,'from the handle subbmission')
      }
    }
  return (
    <div className='max-w-3xl mx-auto bg-gray-100 mt-8 rounded-md overflow-auto scrollbar-hide'>

        <h2 className='place-self-center font-semibold mt-2'>Questions</h2>
        <h2 className='place-self-end font-semibold mt-2 mr-4 bg-gray-200 rounded-md' onClick={()=>setShowQuestionAdd(true)}>add question</h2>




        {questions.length === 0 ? (
          <p className="text-gray-600">No questions yet.</p>
        ) : (
          questions.map((q, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 bg-gray-100">
            {/* Display the question */}
            <p className="font-semibold text-lg">Q: {q.text}</p>
            <h2 className='place-self-end font-semibold mt-2 mr-3 bg-gray-200 rounded-md 'onClick={()=>{
              setShowAnswer(true);
              setSelectedQuestionId(q._id) }} >add answer</h2>
            
            {/* Display the answers if any */}
            {q.answers && q.answers.length > 0 ? (
              <div className="mt-2">
                <p className="font-medium">Answers:</p>
                <ul className="list-disc ml-5">
                  {q.answers.map((ans, ansIndex) => (
                    <li key={ansIndex} className="text-gray-700">
                      {ans.text}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No answers yet.</p>
            )}
          </div>
        ))
      )}
      {showQuestionAdd &&(

<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='relative bg-white p-6 rounded-md w-96'>
                <button className='absolute top-2 right-2 pr-4 text-gray-400 hover:text-gray-600 ' onClick={()=>setShowQuestionAdd(false)}>x</button>
                <h2 className='font-bold text-xl mb-6 place-self-center'>Add Question</h2>
                <form action="" onSubmit={handleQuestionSubmission}>
                <input type="text" placeholder='Question'  className="border p-2 w-full mb-4 rounded outline-none" onChange={(e)=>setQuestionText(e.target.value)} />
                {err && <p className='text-red-500 text-sm place-self-center mb-1'>{err}</p>}
            <div className='flex flex-row space-x-4'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 w-[40%] ml-24 ' type='submit'>add</button>
            </div>
                </form>
            </div>
        </div>
      )}
  {showAnswer&&(

<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='relative bg-white p-6 rounded-md w-96'>
                <button className='absolute top-2 right-2 pr-4 text-gray-400 hover:text-gray-600 ' onClick={()=>setShowAnswer(false)}>x</button>
                <h2 className='font-bold text-xl mb-6 place-self-center'>Add Answer</h2>
                <form action="" onSubmit={handleAnswersubmission}>
                <input type="text" placeholder='Question'  className="border p-2 w-full mb-4 rounded outline-none" onChange={(e)=>setAnswer(e.target.value)} />
                {err && <p className='text-red-500 text-sm place-self-center mb-1'>{err}</p>}
            <div className='flex flex-row space-x-4'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 w-[40%] ml-24 ' type='submit'>add</button>
            </div>
                </form>
            </div>
        </div>
  )}

    </div>
  )
}

export default Questions
