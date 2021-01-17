import React from 'react';
import { BET, MONEY, WINS } from '../../constants';
import "./Card.scss";

function Card({bet, price, wins, avatar, name, level, isWin}) {
  return (<div className={`card ${isWin ? "card-win" : "card-lose"}`}>
    <div className="userInfo">
      <div className="avatar">
        <img src={avatar} alt={"avatar"} />
      </div>
      <div className="info">
        <div className="name">{name}</div>
        <div className="level">Level {level}</div>
      </div>
    </div>
    <div className="scores">
      <div>{WINS}&nbsp;&nbsp;{wins}</div>
      <div>{BET}&nbsp;&nbsp;{bet}</div>
      <div>{MONEY}&nbsp;&nbsp;{price}</div>
    </div>
    <div className={`status ${isWin ? "status-win" : "status-lose"}`}>{`${isWin ? "WINNER" : "LOSE"}`}</div>
  </div>);
}

export default Card;
