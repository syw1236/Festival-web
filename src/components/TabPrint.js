import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import festivalsData from '../data/festivalsData';
import Tab from '../components/Tab';
import Tab_Winter from './Tab_Winter';
const TabPrint = () => {

  return (
    <div>
       <Tab festivalsData={festivalsData} />
       <Tab_Winter festivalsData={festivalsData} />
    </div>
  );
}

export default TabPrint;
