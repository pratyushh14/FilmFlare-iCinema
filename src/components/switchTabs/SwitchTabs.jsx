import React, { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, tabsHandler }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTabHandler = (tab, index) => {
    setCurrentTab(index);
    if (window.innerWidth >= 768) setLeft(index * 100);
    else setLeft(index * 70);

    tabsHandler(tab, index);
  };

  return (
    <>
      {data?.[0] && (
        <div className="switchTabs">
          <div className="tabItems">
            {data?.map((tab, index) => (
              <span
                key={index}
                className={`tabItem ${currentTab === index ? "active" : ""}`}
                onClick={() => activeTabHandler(tab, index)}
              >
                {tab}
              </span>
            ))}

            <div className="movingBG" style={{ left }} />
          </div>
        </div>
      )}
    </>
  );
};

export default SwitchTabs;
