// Tab.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Tab.css'; // Import the CSS file

const Tab = ({ festivalsData }) => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '낮보다 밤이 좋은', content: '#야경 #빛' },
    { name: '새해복 많이많이', content: '#해돋이 #새해' },
    { name: '먹거리 축제', content: '#음식 #먹거리' },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  function includesAnyKeyword(festival) {
    const keywords = ['한우', '곶감', '쌀', '김장', '포도', '고추', '누들'];
    const lowercaseName = festival.name.toLowerCase();

    return keywords.some(keyword => lowercaseName.includes(keyword));
  }

  const filteredFestivals = festivalsData.filter((festival) => {
    if (currentTab === 0) {
      return festival.name.toLowerCase().includes('빛');
    } else if (currentTab === 1) {
      return festival.name.toLowerCase().includes('해맞이');
    } else if (currentTab === 2) {
      return includesAnyKeyword(festival);
    }
    return false;
  });

  return (
    <div className="purple-background">
      <div>
        <ul className="tab-menu">
          {menuArr.map((el, index) => (
            <li
              key={index}
              className={index === currentTab ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <div className="desc">
          <p>{menuArr[currentTab].content}</p>
          {/* Display related data based on the selected tab */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredFestivals.map((item) => (
              <div className="festival-card" key={item.id}>
                {/* Render the relevant data properties */}
                <p>{item.name}</p>
                <Link to={`/festival_detail/${item.id}`}>
                  <img src={item.poster} alt={item.name} />
                </Link>
                <p>{item.location}</p>
                {/* Add other properties as needed */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;
