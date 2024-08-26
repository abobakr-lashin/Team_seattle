import React, { useEffect, useState } from "react";
import "./Discover.css";

const CounterBox = ({ targetValue, title }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < targetValue) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return targetValue;
        }
      });
    }, 100); // سرعة العد (كل 50 ميلي ثانية لتغيير الرقم)

    return () => clearInterval(interval);
  }, [targetValue]);

  return (
    <div className="couterAll">

    <div className="counter-box">
    +{count}
      <div className="title">{title}</div>
    </div>
    </div>

    
  );


};

export default CounterBox;
