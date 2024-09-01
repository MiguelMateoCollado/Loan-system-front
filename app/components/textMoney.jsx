import React from "react";
import MoneyFormater from "../resources/MoneyFormater";
const TextMoney = ({ children }) => {
  return MoneyFormater.from(children, { symbol: "$" });
};

export default TextMoney;
