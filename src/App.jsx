import logo from "./logo.svg";
import "./App.css";
import { People } from "./components/People";
import { Teams } from "./components/Teams";
import { useEffect, useState } from "react";
import { Slider, formLabelClasses, sliderClasses } from "@mui/material";
import { computeHeadingLevel } from "@testing-library/react";

const DATA = [
  { name: "Tsogt", skill: 42 },
  { name: "Tsogt2", skill: 69 },
  { name: "Tsogt3", skill: 42 },
  { name: "Tsogt4", skill: 42 },
  { name: "Tsogt5", skill: 69 },
  { name: "Tsogt6", skill: 69 },
];

const INITIAL_TEAM_COUNT = 4;

const INITIAL_SPLIT_TYPE = "Tsogt"

const sortData = (data) => {
  //sorts based on skill
  // data = [{name: String, skill: Num}, ...]

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data.length - i - 1; j++) {
      if (Number(data[j].skill) < Number(data[j + 1].skill)) {
        var temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }

  return data;
};

const sum = (arr) => {
  let s = 0;
  arr.map((el) => {
    s = s + el;
  });

  return s;
};

const greedyAlgorithm = (groupCount, list) => {
  list = [...sortData(list)]

  const findSmallest = (arr) => {
    let min = [999];

    arr.map((el) => {
      if (sum(el) < sum(min)) {
        min = el;
      }
    });

    return min;
  };

  let ansNum = []; // initialize answer array
  for (let i = 0; i < groupCount; i++) {
    ansNum.push([]);
  }

  let ans = []; // initialize answer array
  for (let i = 0; i < groupCount; i++) {
    ans.push([]);
  }

  list.map((el) => {
    const smallestSumArray = findSmallest(ansNum);

    for (let j = 0; j < ansNum.length; j++) {
      if (ansNum[j] === smallestSumArray) {
        ansNum[j].push(el.skill);
        ans[j].push(el.name);
        break;
      }
    }
  });

  return ans;
};
const tsogtAlgorithm = (groupCount, list) => {
  list = [...sortData(list)];

  let ans = []; // initialize answer array
  for (let i = 0; i < groupCount; i++) {
    ans.push([]);
  }

  //grouping part
  let ind = -1;
  for (let i = 0; i < list.length; i++) {
    if (i % groupCount === 0) {
      ind++;
    }

    let j = i - ind * groupCount;

    if (ind % 2 === 0) {
      j = groupCount - j - 1;
    }

    ans[j].push(list[i].name);
  }

  return ans;
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function App() {
  const [split, setSplit] = useState(false);
  const [splitType, setSplitType] = useState("");

  const [data, setData] = useState([]);
  const [people, setPeople] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamCount, setTeamCount] = useState();

  const [tempTeamCount, setTempTeamCount] = useState();
  const [teamUpdater, setTeamUpdater] = useState(0);

  const handlePeopleChange = (response) => {
    let tempData = [...data]
    tempData.map((el, i) => {
      if (el.name == response.name) {
        console.log("found",el.name , response.name )
        el = response
      }
    });
    setData(tempData)
    // MakeTeams(splitType);
  
  };

  const makeTeamList = (count) => {
    if (count === undefined) {
    } else {
      let array = [];

      for (let i = 0; i < count; i++) {
        array.push(i);
      }
      setTeams(array);
    }
  };

  const MakeTeams = (type) => {
    console.log("activated")
    let groupedTeams = [];
    if (type === "Tsogt") {

      console.log(tsogtAlgorithm(
        Number(localStorage.getItem("TEAMCOUNT")),
        data
      ))

      groupedTeams = [...tsogtAlgorithm(
        Number(localStorage.getItem("TEAMCOUNT")),
        data
      )]
    }

    if (type === "Greedy") {
      groupedTeams = [...greedyAlgorithm(
        Number(localStorage.getItem("TEAMCOUNT")),
        data
      )]
    }

    console.log("=======+>>>>>>>>>>>>",groupedTeams)

    groupedTeams.map((el, i) => {
      localStorage.setItem(String(i), JSON.stringify(el));
    });
    setTeamUpdater(teamUpdater + 1);
  };

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
    setPeople(peopleAr);

    //FOR THE TEAMS

    localStorage.setItem("TEAMCOUNT", INITIAL_TEAM_COUNT);

    for (let i = 0; i < INITIAL_TEAM_COUNT; i++) {
      // setting up empty teams
      const numTurnedString = String(i + 1);
      localStorage.setItem(numTurnedString, JSON.stringify([]));
    }

    localStorage.setItem("SPLITYPE", INITIAL_SPLIT_TYPE)

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
    setPeople(peopleList);

    //teamssssssssssssssssss

    setTeamCount(Number(localStorage.getItem("TEAMCOUNT")));
    makeTeamList(Number(localStorage.getItem("TEAMCOUNT")));

    setSplitType(localStorage.getItem("SPLITTYPE"))
  }, []);

  useEffect(() => {
    makeTeamList(teamCount);
  }, [teamCount]);

  useEffect(() => {
    MakeTeams(splitType);
    console.log("recieving")
  }, [data, splitType, teamCount]);



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
          <div className="flex flex-col ">
            <div
              className="flex  cursor-pointer flex-row items-center justify-between w-[120px] ml-32 bg-white rounded-md text-black px-2 py-1 "
            >
              <div
                className={`absolute  h-[24px]  rounded-xl bg-green-600 ${
                  splitType == "Tsogt" ? "-ml-1 w-[50px]" : "ml-12 w-[60px]"
                } duration-300`}
              ></div>
              <div
                className="z-20"
                onClick={() => {
                  setSplitType("Tsogt");
                  localStorage.setItem("SPLITTYPE", "Tsogt")
                }}
              >
                Tsogt
              </div>
              <div
                className="z-20"
                onClick={() => {
                  setSplitType("Greedy");
                  localStorage.setItem("SPLITTYPE", "Greedy")
                }}
              >
                Greedy
              </div>
            </div>
            <People handlePeopleChange={handlePeopleChange} list = {data} />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row w-64">
              <input
                className="text-black"
                type="text"
                placeholder="Enter team count"
                onChange={(e) => {
                  setTempTeamCount(e.target.value);
                }}
                value={tempTeamCount}
              />

              <button
                onClick={() => {
                  setTeamCount(tempTeamCount);
                  localStorage.setItem("TEAMCOUNT", tempTeamCount);
                }}
                className="bg-green-400 hover:bg-green-500 duration-300 px-2 rounded-r-sm"
              >
                set!
              </button>
              <p className="mx-3">{teamCount}</p>
            </div>

            <Teams teamsList={teams} />
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
