import React, { useState } from "react";
import { useMemo } from "react";

function App() {
  const [menuChange, setMenuChange] = useState<boolean>(false);

  const orderInfo = [
    { name: "이명호", drink: "블루베리스무디", option: "" },
    { name: "박상종", drink: "블루베리스무디", option: "" },
    { name: "김덕형", drink: "아보카도", option: "설탕 반만" },
  ];

  const orderInfoListItem = orderInfo.map((data, index) => (
    <div key={index}>
      {`Name: ${data.name} Drink: ${data.drink} Option: ${data.option}`}
    </div>
  ));

  const changeOrderInfoListItem = orderInfo.map((data, index) => (
    <div key={index}>
      <div>
        <span> Name : </span> <input />
        <span> Drink: </span> <input />
        <span> Option : </span> <input />
      </div>
    </div>
  ));

  const onMenuChange = () => setMenuChange(!menuChange);

  return (
    <>
      <button onClick={onMenuChange}>변경</button>
      {menuChange && changeOrderInfoListItem}
      {!menuChange && orderInfoListItem}
    </>
  );
}

export default App;
