import { useState } from "react"
import { Team } from "./Team"

const numOfTeams = 4
let TeamsArray = []

const makeTeams = ()=>{

    for(let i = 0; i < numOfTeams; i ++ ){
        TeamsArray.push({id: i, members: []})
    }

}

makeTeams()

export const Teams = () =>{

    const [teamsList, setTeamsList] = useState(TeamsArray)

    return <div className="w-[50vw] max-h-[70vh] flex flex-wrap overflow-y-scroll bg-slate-400">
        
        {teamsList.map((el)=>{

            return <Team>{el.id}</Team>
        })}


    </div>
}

