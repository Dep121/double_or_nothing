import React from "react";
import "./SelectedItem.scss";
import { MONEY, MEDAL, BET, WINS } from "../../constants";

function SelectedItem({profileImage, name, wins, bets, price}){
  return (
    <div className="selectedItem">
      <div className="image">
        <div>{MEDAL}</div>
        <img src={profileImage} alt="profile" />
      </div>
      <div className="mid">
        <div>{name}</div>
        <div className="wins_bets">
          <span> {WINS} {wins ? wins : 0}</span>
          <span> {BET} {bets}</span>
        </div>
      </div>
      <div className="price"> {`${MONEY} ${price}`} </div>
    </div>
  )
}

export default SelectedItem;