import React from "react";
import "./Item.scss";

function Item({ selected = false, name, level, avatar, bet, wins, lost, price, onClick, item}){
  return (<div className="item">
    <div className="select">
      <input type="checkbox" checked={selected} onChange={()=>onClick(item)}/>
    </div>
    <div className="name">{name}</div>
    <div className="level">{level}</div>
    <div className="avatar"><img src={avatar} alt="avatar" /></div>
    <div className="bet">{bet}</div>
    <div className="wins">{wins}</div>
    <div className="lost">{lost}</div>
    <div className="price">{price}</div>
  </div>);
}

export default Item;
