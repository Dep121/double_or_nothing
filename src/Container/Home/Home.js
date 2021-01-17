import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Item from "../../Components/Item/Item";
import Pagination from "../../Components/Pagination";
import SelectedItem from "../../Components/SelectetdItem/SelectedItem";
import { BET, MONEY, PLAYERLIMIT, WINS } from "../../constants";
import { userDataAtom } from "../state";
import "./Home.scss";

function Home(){

  const [data, setData] = useAtom(userDataAtom);
  const [error, setError] = useState();
  const history = useHistory();
  let selectedPlayers = data.filter((ele)=>ele.selected === true).length;

  async function getItems() {
    const res = fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json");
    const resp = await (await res).json();
    const newData = resp.map(ele => ({
      ...ele,
      Price: parseInt(ele.Price),
      Bet: parseInt(ele.Bet),
    }));
    setData(newData);
  }
  useEffect(()=>{
    if(data.length === 0) {
      getItems();
    }
  },[]);

  const Header = (
    <div className="tableHeading">
      <div className="select">SELECT</div>
      <div className="name">PLAYER NAME</div>
      <div className="level">LEVEL</div>
      <div className="avatar">AVATAR</div>
      <div className="bet">{BET}&nbsp;&nbsp;&nbsp;&nbsp;BET</div>
      <div className="wins">{WINS}&nbsp;&nbsp;&nbsp;&nbsp;WINS</div>
      <div className="lost">LOST</div>
      <div className="price">{MONEY}&nbsp;&nbsp;&nbsp;&nbsp;PRICE</div>
    </div>
  );

  useEffect(()=>{
    setError(false);
  }, [data]);

  const handleItemClick = async (clickItem) => {
    const newList = data.map(ele => {
      if(ele.Name === clickItem.Name) {
        clickItem.selected = !clickItem.selected;
        return clickItem;
      } else {
        return ele;
      }
    });

    const newSelectedPlayers = newList.filter((ele)=>ele.selected === true).length;
    if(newSelectedPlayers === PLAYERLIMIT + 1) {
      alert(`Please choose only ${PLAYERLIMIT} players`);
      return;
    }

    selectedPlayers = newSelectedPlayers;
    setData(newList);
  }

  const listItem = data.map((ele) => (
    <Item
      key={ele.Name}
      item={{...ele}}
      onClick={handleItemClick}
      selected={ele.selected}
      name={ele.Name}
      level={ele.level ? ele.level : 0}
      avatar={ele["Profile Image"]}
      bet={ele.Bet}
      wins={ele.wins ? ele.wins : 0}
      lost={ele.lost ? ele.lost : 0}
      price={ele.Price}
    />
  ));

  return(<div className="home">
    <div className="left">
      <div className="leftHeading">Playing {PLAYERLIMIT}</div>
      <div className="users">
        {
          data.map(ele => {
            if(ele.selected) {
              return <SelectedItem
              key={ele.Name}
              profileImage={ele["Profile Image"]}
              name={ele.Name}
              wins={ele.wins}
              bets={ele.Bet}
              price={ele.Price}
              />
            }
          })
        }
      </div>
      <div className="btn" onClick={()=>{
        if(selectedPlayers === PLAYERLIMIT) {
          history.push("/bet");
        } else {
          setError(true);
        }
      }} >START</div>
      {
        error && <div className="error"> Please Select {PLAYERLIMIT} Players </div>
      }
    </div>
    <div className="right">
      
      <Pagination header={Header} list={listItem} itemsPerPage={10} />
    </div>
  </div>)
}

export default Home;
