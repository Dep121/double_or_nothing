import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { userDataAtom } from "../state";
import "./Bet.scss";

function Bet() {

  const [data, setData] = useAtom(userDataAtom);
  const [num, setNum] = useState(false);
  const history = useHistory();

  useEffect(()=>{
    const winners = filteredData
      .filter((ele) => ele.Bet === num)
      .map((ele) => ({ ...ele, Price: ele.Price * 2, wins: isFinite(ele.wins) ? ele.wins + 1 : 1 }));

    const losers = filteredData
      .filter((ele) => ele.Bet !== num)
      .map((ele) => ({ ...ele, lost: isFinite(ele.lost) ? ele.lost + 1 : 1 }));

    console.table(winners);

    const updateData = data.map(ele => {
      const winner = winners.find(w => w.Name === ele.Name);
      if (winner) return winner;

      const loser = losers.find(l => l.Name === ele.Name);
      if (loser) return loser;

      return ele;
    });

    setData(updateData);
  }, [num]);

  useEffect(() => {
    let randomNum = Math.floor(Math.random() * 0) + 1;

    setNum(randomNum);
  }, [])

  const filteredData = data.filter(ele => ele.selected === true);

  return (<div className="betC">
    <div className="upper">
      {
        filteredData.slice(0, 5).map(ele => (
          <Card
            key={ele.Name}
            bet={ele.Bet}
            price={ele.Price}
            wins={ele.wins ? ele.wins : 0}
            avatar={ele["Profile Image"]}
            name={ele.Name}
            level={ele.level ? ele.level : 0}
            isWin={ele.Bet === num}
          />
        ))
      }
    </div>
    <div className="mid">
      <div className="number">
        {num}
      </div>
    </div>
    <div className="lower">
      {
        filteredData.slice(5, 9).map(ele => (
          <Card
            key={ele.Name}
            bet={ele.Bet}
            price={ele.Price}
            wins={ele.wins}
            avatar={ele["Profile Image"]}
            name={ele.Name}
            level={ele.level}
            isWin={ele.Bet === num}
          />
        ))
      }
    </div>
    <div className="btn" onClick={() => { history.goBack(); }} >BACK</div>
  </div>);
}

export default Bet;
