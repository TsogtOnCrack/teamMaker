import logo from './logo.svg';
import './App.css';
import { People } from './components/People';
import { Teams } from './components/Teams';
import { useEffect, useState } from 'react';


const DATA = [

  { "name": "Tsogt", "skill": 12 },
  { "name": "Tsogt2", "skill": 12 },
  { "name": "Tsogt3", "skill": 12 },
  { "name": "Tsogt4", "skill": 12 },
  { "name": "Tsogt5", "skill": 12 },
  { "name": "Tsogt6", "skill": 12 },
  { "name": "Tsogt7", "skill": 12 },
  { "name": "Tsogt8", "skill": 12 },
  { "name": "Tsogt9", "skill": 12 },
  { "name": "Tsogt10", "skill": 12 },
  { "name": "Tsogt11", "skill": 12 },
  { "name": "Tsogt12", "skill": 12 },
  { "name": "Tsogt13", "skill": 12 },
  { "name": "Tsogt14", "skill": 12 },
  { "name": "Tsogt15", "skill": 12 },
  { "name": "Tsogt16", "skill": 12 },
  { "name": "Tsogt17", "skill": 12 },
  { "name": "Tsogt18", "skill": 12 },
  { "name": "Tsogt19", "skill": 12 },

]

function App() {
  
  const [data, setData] = useState(DATA)
  const [people, setPeople] = useState(["cehck"])

  //innitialize local storage
  useEffect(() => {
    data.map((el) => {
      localStorage.setItem(el.name, el.skill)
      setPeople(...people, el.name)
    })

    console.log(people)
  }, [])





  return (

    <div className=' bg-indigo-600 w-screen h-screen text-white flex flex-col items-center'>

      <h1 className='text-[64px] font-serif my-8 uppercase'>Make your teams!</h1>

      <div className='flex flex-row w-full'>

        <People list = {people}/>
        <Teams />

      </div>

    </div>
  );
}

export default App;











// const UpdateCount = () => {
//   setCount(Number(localStorage.getItem("count")))
// }

// useEffect(() => {
//   UpdateCount()
// }, [])


{/* <div className=' cursor-pointer' onClick={()=>{
        localStorage.setItem("count", Number(localStorage.getItem("count")) + 1)
        setCount(count + 1)

      }} >locac mem test, {count}</div>

      <div onClick={()=>{
        localStorage.setItem("count", 0)
        UpdateCount()
      }}> reset</div> */}


