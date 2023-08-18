import { Team } from "./Team";
import { useEffect, useState } from "react";

export const Teams = ({ teamsList }) => {

  return (
    <div className="w-[50vw] max-h-[60vh] h-fit flex flex-wrap overflow-y-scroll">
      {teamsList &&
        teamsList.map((el) => {
          const array = JSON.parse(localStorage.getItem(String(el)));

          let sum = 0

            array.map((el)=>{
                sum = sum + Number( localStorage.getItem(String(el)))
            })

          return (
            <Team teams={array}>
              {el + 1} : {sum}
            </Team>
          );
        })}
    </div>
  );
};
