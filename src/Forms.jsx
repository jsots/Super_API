import { useState, useEffect, useRef } from "react"
import axios from "axios"

function Forms() {
    const nameRef = useRef();
    const intRef = useRef();
    const strRef = useRef();
    const spdRef = useRef();
    const durRef = useRef();
    const pwrRef = useRef();
    const combRef = useRef();
    const alignRef = useRef();
    const pubRef = useRef();
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name: nameRef.current.value,
            powerstats: {
                intelligence: intRef.current.value,
                strength: strRef.current.value,
                speed: spdRef.current.value,
                durability: durRef.current.value,
                power: pwrRef.current.value,
                combat: combRef.current.value,
            },
            biography: {
                alignment:alignRef.current.value,
                publisher:pubRef.current.value,
            }
        }
        await axios.post("https://superhero-api.herokuapp.com/api/heroes", data)
        setMessage("Super has been submitted!");
        nameRef.current.value = "";
        intRef.current.value = "";
        strRef.current.value = "";
        spdRef.current.value = "";
        durRef.current.value = "";
        pwrRef.current.value = "";
        combRef.current.value = "";
        alignRef.current.value = "";
        pubRef.current.value = "";
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Enter Name"
                    ref={nameRef}
                ></input>
                <br/>
                <input 
                    placeholder="Enter Intelligence"
                    ref={intRef}
                ></input>
                <br/>
                <input 
                    placeholder="Enter Strength"
                    ref={strRef}
                ></input>
                <br/>
                <input 
                    placeholder="Enter Speed"
                    ref={spdRef}
                ></input>
                <br/>
                <input 
                    placeholder="Enter Durability"
                    ref={durRef}
                ></input>
                <br/>
                <input 
                    placeholder="Enter Power"
                    ref={pwrRef}
                ></input>
                <br/>
                <input 
                    placeholder="Enter Combat"
                    ref={combRef}
                ></input>
                <br/>
                <input 
                    placeholder="Enter Alignment"
                    ref={alignRef}
                ></input>
                <br/>
                <input 
                    placeholder="Enter Publication"
                    ref={pubRef}
                ></input>
                <br/>
                <input type="submit" value="submit"></input>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Forms