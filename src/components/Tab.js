import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TabMenu = styled.ul`
  color: black; /* Set text color for tabs */
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;
  margin-top: 10px;
  margin-left: 100px; /* Add margin on the left */
  margin-right: 100px; /* Add margin on the right */

  .submenu {
    display: flex;
    width: calc(100% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 0px 0px 0px 0px;
    border: 2px solid white;
    cursor: pointer;
  }

  .focused {
    background-color: rgb(255, 255, 255);
    color: rgb(21, 20, 20);
  }
`;

const Desc = styled.div`
  text-align: center;
`;

const FestivalCard = styled.div`
  /* Adjust the styling of the festival card as needed */
  margin: 5px;
  padding: 5px;
  text-align: center;

  img {
    width: 200px;
    height: 200px;
  }
`;

// Set the overall background color for the component
const PurpleBackground = styled.div`
  background-color: #d8c4e9; /* Light purple color */
`;

const Tab = ({ festivalsData }) => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '낮보다 밤이 좋은', content: '#야경 #빛' },
    { name: '새해복 많이많이', content: '#해돋이 #새해' },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  const filteredFestivals = festivalsData
    .filter((festival) => {
      if (currentTab === 0) {
        // Filter festivals where the name contains '빛'
        return festival.name.toLowerCase().includes('빛');
      } else if (currentTab === 1) {
        // Filter festivals where the name contains '해돋이' (case-insensitive)
        return festival.name.toLowerCase().includes('해맞이');
      }
      return false;
    });

  return (
    <PurpleBackground>
      <div>
        <TabMenu>
          {menuArr.map((el, index) => (
            <li
              key={index}
              className={index === currentTab ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </TabMenu>
        <Desc>
          <p>{menuArr[currentTab].content}</p>
          {/* Display related data based on the selected tab */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredFestivals.map((item) => (
              <FestivalCard key={item.id}>
                {/* Render the relevant data properties */}
                <p>{item.name}</p>
                <Link to={`/festival_detail/${item.id}`}>
                  <img src={item.poster} alt={item.name} />
                </Link>
                <p>{item.location}</p>
                {/* Add other properties as needed */}
              </FestivalCard>
            ))}
          </div>
        </Desc>
      </div>
    </PurpleBackground>
  );
};

export default Tab;
