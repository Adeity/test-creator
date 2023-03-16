"use client"
import {useState} from "react";
import './validity.css'
import {Base64} from "js-base64";

export default function Main() {
    const [elements, setElements] = useState([
        {
            type: "text",
            value: "Tohle je příklad toho, jak může vypadat test, kde uživatel musí něco "
        },
        {
            type: "input",
            value: "doplnit"
        },
        {
            type: "text",
            value: "."
        },
    ])

    const [url, setUrl] = useState(null)

    function handlePop() {
        const eSlice = elements.slice()
        eSlice.pop()
        setElements(eSlice)
    }

    function handleAddText() {
        const eSlice = elements.slice()
        eSlice.push({
            type: "text",
            value: "..."
        })
        setElements(eSlice)
    }

    function handleAddInput() {
        const eSlice = elements.slice()
        eSlice.push({
            type: "input",
            value: "..."
        })
        setElements(eSlice)
    }

    function handleChange(index, value) {
        console.log(value)
        const eSlice = elements.slice()
        eSlice[index].value = value
        setElements(eSlice)
    }

    function handleGenerateUrl() {
        const payloadString = JSON.stringify(elements)
        const base64encoded = Base64.encode(payloadString)

        setUrl(window.location.href + "test?p="+base64encoded)
    }

    async function handleCopyUrl() {
        await navigator.clipboard.writeText(url)

        alert("Bylo zkopírováno url pro dotazník.")
    }

    const r = elements.map((e, index) => {
        const popisPole = e.type === 'text' ? "Text" : "K doplnění"
        const borderClassa = e.type === 'text' ? "border-success" : "border-warning"
        return (
            <span key={index}>
                <span   className={"px-2"}>({popisPole})</span>
                <input type={"text"}   role={"textbox"} className={"mw-3 border px-2 " + borderClassa} onChange={(ev => handleChange(index, ev.target.value))} value={e.value}/>
            </span>
        )
    })
    return (
        <main>
            <h4>Vytvoření testu</h4>
            <h6>Přídání/odebrání polí</h6>
            <input className={"me-1"} type={"button"} value={"Přidat text"} onClick={handleAddText}/>
            <input className={"me-1"} type={"button"} value={"Přidat k doplnění"} onClick={handleAddInput}/>
            <input type={"button"} value={"Odebrat poslední"} onClick={handlePop}/>
            <div className={"py-3"}>
                {r}
            </div>

            <div>
                <input className={"mt-3"} type={"button"} value={"Vygenerovat odkaz"} onClick={handleGenerateUrl}/>
            </div>
            {
                url !== null &&
                (
                    <div className={"py-3"}>
                        <input className={"w-100"} disabled={true} value={url}/>
                        <input type={"button"} className={"button"} onClick={handleCopyUrl} value={"Zkopírovat"}/>
                    </div>
                )
            }
        </main>
    )
}