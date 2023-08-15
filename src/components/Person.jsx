import { Slider } from "@mui/material"
import { useState } from "react"

export const Person = ({ children }) => {

    const [value, setValue] = useState(12)


    const handleSliderChange = (event, newValue) =>{
        setValue(newValue)

    }


    return <div className="my-3 bg-blue-500 rounded-lg min-h-[42px] min-w-[30vw]  w-fit flex flex-row items-center justify-between px-3">
        <p className="max-w-[40%] overflow-scroll">{children.name}</p>

        <div className="flex flex-row items-center ">

            <p className="mx-1"> Skill points:</p>

            {value}

            <div className="w-[100px] ml-4 mt-1">
                <Slider onChange ={handleSliderChange} defaultValue={value} />
            </div>

        </div>

    </div>


}