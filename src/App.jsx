import logo from "./logo.svg";
import "./App.css";
import { People } from "./components/People";
import { Teams } from "./components/Teams";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";

const DATA = [
  { name: "Tsogt", skill: 42 },
  { name: "Tsogt2", skill: 69 },
  { name: "Tsogt3", skill: 42 },
  { name: "Tsogt4", skill: 42 },
  { name: "Tsogt5", skill: 69 },
  { name: "Tsogt6", skill: 69 },
];

const INITIAL_TEAM_COUNT = 4;

function App() {
  const [split, setSplit] = useState(false);
  const [splitType, setSplitType] = useState("Tsogt");

  const [data, setData] = useState([]);
  const [people, setPeople] = useState([]);
  const [teamCount, setTeamCount] = useState(0);

  const initializeLocalStorage = () => {
    localStorage.clear();

    //FOR THE PEOPLE

    let tempArr = [];
    DATA.map((el) => {
      localStorage.setItem(el.name, el.skill);
      tempArr.push(el.name);
    });

    localStorage.setItem("PEOPLE", JSON.stringify(tempArr));

    //state = PPl
    setData(DATA);

    let peopleAr = [];
    DATA.map((el) => {
      peopleAr.push(el.name);
    });
    console.log(peopleAr);
    setPeople(peopleAr);

    //FOR THE TEAMS

    localStorage.setItem("TEAMCOUNT", INITIAL_TEAM_COUNT);

    for (let i = 0; i < INITIAL_TEAM_COUNT; i++) {
      // setting up empty teams

      const numTurnedString = String(i + 1);
      localStorage.setItem(numTurnedString, JSON.stringify([]));
    }

    window.location.reload(false); //had to refresh becuase MUI slider component can't change value once initialized
  };

  useEffect(() => {
    // initialize the states

    let tempAr = [];
    const peopleList = JSON.parse(localStorage.getItem("PEOPLE"));

    for (let i = 0; i < peopleList.length; i++) {
      tempAr.push({
        name: peopleList[i],
        skill: localStorage.getItem(peopleList[i]),
      });
    }

    setData(tempAr);
    setPeople(people.list);

    setTeamCount(Number(localStorage.getItem("TEAMCOUNT")));
  }, []);

  return (
    <div className=" bg-indigo-600 w-screen h-screen text-white flex flex-col items-center">
      <h1 className="text-[64px] font-serif my-8 uppercase">
        Make your teams!
      </h1>

      <div className="flex flex-col w-full items-center">
        <button
          onClick={() => {
            initializeLocalStorage();
          }}
          className="px-2 py-1 bg-red-400 hover:text-[16px] hover:bg-red-500 my-6 duration-300 rounded-md w-fit"
        >
          RESET/SETUP
        </button>

        <div className="flex flex-row justify-between items-center">
          <People list={data} />

          <div className="flex flex-col">
            <div className="flex flex-row w-64">
              <Slider
                onChange={(event, newValue) => {
                  setTeamCount(newValue);
                }}
                defaultValue={teamCount}
                min={0}
                max={20}
              ></Slider>
              <p className="mx-3">{teamCount}</p>
            </div>

            <Teams numOfTeams={teamCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// { "name": "Tsogt7", "skill": 12 },
// { "name": "Tsogt8", "skill": 12 },
// { "name": "Tsogt9", "skill": 12 },
// { "name": "Tsogt10", "skill": 12 },
// { "name": "Tsogt11", "skill": 12 },
// { "name": "Tsogt12", "skill": 12 },
// { "name": "Tsogt13", "skill": 12 },
// { "name": "Tsogt14", "skill": 12 },
// { "name": "Tsogt15", "skill": 12 },
// { "name": "Tsogt16", "skill": 12 },
// { "name": "Tsogt17", "skill": 12 },
// { "name": "Tsogt18", "skill": 12 },
// { "name": "Tsogt19", "skill": 12 },

// const UpdateCount = () => {
//   setCount(Number(localStorage.getItem("count")))
// }

// useEffect(() => {
//   UpdateCount()
// }, [])

{
  /* <div className=' cursor-pointer' onClick={()=>{
        localStorage.setItem("count", Number(localStorage.getItem("count")) + 1)
        setCount(count + 1)

      }} >locac mem test, {count}</div>

      <div onClick={()=>{
        localStorage.setItem("count", 0)
        UpdateCount()
      }}> reset</div> */
}

// const setUpLocalStorage = () =>{ // initialize DATA into local storage, clear previous local storage

//   localStorage.clear()
//   setPeople([])

//   let tempAr = [] // setup List of people
//   for (let i = 0; i < DATA.length; i++ ){
//     tempAr.push(DATA[i].name)
//   }
//   setPeople(tempAr)

//   DATA.map((el)=>{
//     localStorage.setItem(el.name, el.skill)
//   })

//   // console.log(people, "people")
//   // console.log(localStorage.getItem("Tsogt12"))

//   localStorage.setItem("PEOPLE", JSON.stringify(people))
// }

// useEffect(()=>{ // catch up the states to equal local storage ||| this happens every refresh

//   setData([])

//   console.log(JSON.parse(localStorage.getItem("PEOPLE")), "PEOPLEPEOPLEPEOPLEPEOPLEPEOPLE")

//   people.map((el)=>{

//     console.log(el,"el")

//     let tempArr = data
//     let tempSkill = localStorage.getItem(el)
//     tempArr.push({"name" : el, "skill": tempSkill})

//     setData (tempArr)
//   })

//   console.log(data)
//   console.log(localStorage.getItem("Tsogt12"), "in Effect")

// },[people])
