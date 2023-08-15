import { Person } from "./Person"


export const People = ({list}) =>{

    return <div className="w-[50vw] max-h-[70vh] overflow-y-scroll flex flex-col pl-14">

        {list.map((el)=>{
            
            return <Person>{localStorage.getItem("el")}</Person>
            })}

    </div>
}