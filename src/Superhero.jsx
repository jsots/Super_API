import { useState, useEffect, useRef } from "react";
import axios from "axios"

function Superhero() {
    const [hero, setHero] = useState([])
    const [index, setIndex] = useState(0)
    const nameRef = useRef();
    const intRef = useRef();
    const strRef = useRef();
    const spdRef = useRef();
    const durRef = useRef();
    const pwrRef = useRef();
    const combRef = useRef();
    const alignRef = useRef();
    const pubRef = useRef();

    const fetchHeroData = async () => {
        try {
            const res = await axios.get("https://superhero-api.herokuapp.com/api/heroes");
            setHero(res.data);
        } catch (error) {
            console.error("Failed to fetch supers", error)
        }
    }

    useEffect(() => {
        fetchHeroData();
    }, [])

    const handleNextClick = () => {
        if (index === hero.length - 1) {
            setIndex(0)
        } else {
            setIndex((prev) => prev + 1)
        }
    }

    const handlePrevClick = () => {
        if (index === 0 ) {
            setIndex(hero.length-1)
        } else {
            setIndex((prev) => prev - 1)
        }
    }

    const handleEdit = async(e) => {
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
        await axios.put(`https://superhero-api.herokuapp.com/api/heroes/${hero[index]._id}`, data)
        nameRef.current.value = "";
        intRef.current.value = "";
        strRef.current.value = "";
        spdRef.current.value = "";
        durRef.current.value = "";
        pwrRef.current.value = "";
        combRef.current.value = "";
        alignRef.current.value = "";
        pubRef.current.value = "";
        fetchHeroData();
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await axios.delete(`https://superhero-api.herokuapp.com/api/heroes/${hero[index]._id}`)
    }

    return (
        <div>
            <h1>Welcome to the World of Supers</h1>
            <div className="container">
                <button className="prev" onClick={handlePrevClick}>Prev</button>
                <div className="hero-container">
                    <div className="hero-container">
                        <p>Name: {hero[index]?.name}</p>
                        <p>Intelligence: {hero[index]?.powerstats.intelligence}</p>
                        <p>Strength: {hero[index]?.powerstats.strength}</p>
                        <p>Speed: {hero[index]?.powerstats.speed}</p>
                        <p>Durability: {hero[index]?.powerstats.durability}</p>
                        <p>Power: {hero[index]?.powerstats.power}</p>
                        <p>Combat: {hero[index]?.powerstats.combat}</p>
                        <p>Alignment: {hero[index]?.biography.alignment}</p>
                        <p>Publisher: {hero[index]?.biography.publisher}</p>
                    </div>
                </div>
                <button className="next" onClick={handleNextClick}>Next</button>
                <div>
                    <p>Notice any errors? Update the info below!</p>
                    <form onSubmit={handleEdit}>
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
                    <p>Delete the current Super by clicking the button below.</p>
                    <form onSubmit={handleDelete}>
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Superhero