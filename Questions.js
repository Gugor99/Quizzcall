import React from "react"
import {decode} from 'html-entities'

export default function Questions(props){
    const {question, correct_answer, incorrect_answers } = props
    const [answersArray, setAnswersArray] = React.useState([])
    
    React.useEffect(function() {         
        setAnswersArray(incorrect_answers)
        setAnswersArray(oldArr => [...oldArr, correct_answer])
        setAnswersArray(oldArr => oldArr.sort(() => 0.5 - Math.random()))
    }, [props.question])  
    
    
    const answerElements = answersArray.map((answ,index) => {
        return (<p className="answer" 
            key={index} 
            onClick={props.handleClick}
            id={answ}
            >{decode(answ)}
        </p>
        )})
    
    return(
        <section>
            <h2>{decode(question)}</h2>
            <div className="answers-cont">
                {answerElements}
            </div>
        </section>
    )
}