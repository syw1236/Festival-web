// Tab_Winter.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Tab_Winter.css'; // Import the CSS file

const Tab_Winter = ({ festivalsData }) => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '봄 축제', content: '#철쭉 #꽃' },
    { name: '여름 축제', content: '#물놀이 #더위사냥' },
    { name: '가을 축제', content: '#단풍 #알록달록' },
    { name: '2023을 장식할 겨울 축제', content: '#눈 #2023' },
    // { name: '먹거리 축제', content: '#음식 #먹거리' },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  const filteredFestivals = festivalsData.filter((festival) => {
    const tab0Keywords = ['철쭉'];
    const tab1Keywords = ['물'];
    const tab2Keywords = ['단풍', '가을'];
    const tab3Keywords = ['눈꽃'];

    if (currentTab === 0) {
      return tab0Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(tab0Keywords)
      );
    } else if (currentTab === 1) {
      return tab1Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(tab1Keywords)
      );
    } else if (currentTab === 2) {
      return tab2Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(tab2Keywords)
      );
    } else if (currentTab === 3) {
      return tab2Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(tab3Keywords)
      );
    }
    return false;
  });

  return (
    <div className="winter-background">
      <ul className="winter-tab-menu">
        {menuArr.map((el, index) => (
          <li
            key={index}
            className={
              index === currentTab ? 'winter-submenu focused' : 'winter-submenu'
            }
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </ul>
      <div className="winter-desc">
        <p>{menuArr[currentTab].content}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredFestivals.map((item) => (
            <div className="winter-festival-card" key={item.id}>
              <p>{item.name}</p>
              <Link to={`/festival_detail/${item.id}`}>
                <img src={item.poster} alt={item.name} />
              </Link>
              <p>{item.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tab_Winter;
