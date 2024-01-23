import React from "react"
import data from "./data"
import Questions from './Questions'

export default function App(){
    const [importedData, setImportedData] = React.useState(data)////data)
    const [count, setCount] = React.useState(0)
    const [selectedAnswersArray, setSelectedAnswersArray] = React.useState([])
    const [show, setShow] = React.useState(false)
    const [access, setAccess] = React.useState(false)
    
    function setQuiz(){  
        setShow(false) 
        setCount(0)
        removeCss() 
        setSelectedAnswersArray([])
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res=> res.json())
        .then(data => {
            setImportedData(data)
        })
    
    }
    
    function start(){
        setQuiz()
        setAccess(old => !old)
    }
    
    

    function handleClick(targ, event){    
        event.target.classList.add("back") 
        event.target.parentElement.classList.add('block')     
        setCount(count => {
            return targ === event.target.id ? count + 1 : count
        })
        setSelectedAnswersArray(old => [...old, event.target.id])
    }
    
    function removeCss(){
        const radios = document.getElementsByClassName('answer')
        for (let radio of radios){
            radio.classList.remove('back', "red", "green")
            radio.parentElement.classList.remove("block")
        }
    }
    
    function check(){        
        importedData.results.map(question => {
            const rights = document.getElementById(question.correct_answer)
            rights.classList.add("green")
        })
        for (let sel of selectedAnswersArray){
            document.getElementById(sel).classList.add("red")
        }
        setShow(old => !old)
    }
    
    const questionElements = importedData.results.map((question, index) => { 
        return (<Questions key={index} 
                    {...question} 
                    handleClick={(event)=>handleClick(question.correct_answer, event)}
                    />
    )})
    
    return (
        <main>
            <img className="blob-4" src="./images/blob-4.png"/>
            {access ?
            <div className="quiz-container">
                {questionElements}
                <div className="footer">
                    {show && <h4>You scored {count}/5 correct {count > 1 ? "answers" : "answer"}</h4>}
                    {show ? <button id="next-btn" onClick={setQuiz}>Play again</button>:
                        <button onClick={check}>Check answers</button>}
                </div>
            </div> 
            :
            <div className="start-cont">
                <h1>Quizzical</h1>
                <button onClick={start}>Start Quiz</button>
            </div>}
            <img className="blob-5" src="./images/blob-5.png"/>
        </main>
    )
}