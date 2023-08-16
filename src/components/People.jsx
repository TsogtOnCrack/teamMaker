import { useDebugValue, useEffect } from "react"
import { Person } from "./Person"


export const People = ({list}) =>{
    // const DATA = JSON.parse(localStorage.getItem("data"))

    const handleChange = response =>{

        console.log(response)
        localStorage.setItem(response.name, response.skill)
        
    }

    return <div className="w-[50vw] max-h-[70vh] overflow-y-scroll flex flex-col pl-14">

        {list.map((el)=>{
            
            return <Person handleChange={handleChange} data = {el}></Person>
            })}
            

    </div>
}