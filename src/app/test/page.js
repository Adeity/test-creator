"use client"
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import {Base64} from "js-base64";
import '../validity.css'

export default function Home() {
    const searchParams = useSearchParams()
    const encodedSearchParams = searchParams.get('p')
    const decoded = Base64.decode(encodedSearchParams)
    console.log("decoded: ",decoded)
    const payload = JSON.parse(decoded)

    const [answers, setAnswers] = useState(payload)
    const [numberOfFaults, setNumberOfFaults] = useState(null)
    const [showResult, setShowResult] = useState(false)

    function handleInputChange(e, index) {
        const answersCpy = answers.slice()
        answersCpy[index].userInput = e.target.value
        setAnswers(answersCpy)
    }

    function handleValidChange(index, valid) {
        const answersCpy = answers.slice()
        answersCpy[index].valid = valid
        setAnswers(answersCpy)
    }

    function handleClick() {
        let numOfFaults = 0
        answers.forEach((e, index) => {
            if (e.type === 'input') {
                if (e.value !== e.userInput) {
                    handleValidChange(index, false)
                    numOfFaults++
                } else {
                    handleValidChange(index, true)
                }
            }
        })
        setShowResult(true)
        setNumberOfFaults(numOfFaults)
    }
    function getAnswerText(actual, expected) {
        if (actual === expected) {
            return <span className={"valid"}>{actual}</span>
        } else {
            return (
                <>
                    <span className={"invalid"}>
                        {actual}&nbsp;
                    </span>
                    <span className={"valid"}>
                        {expected}
                    </span>
                </>
            )
        }
    }

    const r1 = []
    const r2 = []
    answers.forEach((e, index) => {
        if (e.type === 'text') {
            r1.push(<span key={index}>{e.value} </span>)
            r2.push(<span key={index}>{e.value} </span>)
        } else if (e.type === 'input') {
            r1.push(
                <input required={true} key={index} onChange={(event) => handleInputChange(event, index)}/>
            )
            const text = getAnswerText(e.userInput, e.value)
            r2.push(text)
        }
    })
    return (
        <main>
            <h4>Doplňte text</h4>
            <div>
                {r1}
            </div>
            <div>
                <br/>
                <input type={"button"} onClick={handleClick} value={"Zkontrolovat"}/>
            </div>
            {showResult && (
                <>
                    <h4>Vyhodnocení</h4>
                    Počet chyb: {numberOfFaults}
                    <h5>Text:</h5>
                    <div>
                        {r2}
                    </div>
                </>
            )}
        </main>
    )
}
