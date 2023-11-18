import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import festivalsData from '../data/festivalsData';
import Tab from '../components/Tab';
const TabPrint = () => {

  return (
    <div>
       <Tab festivalsData={festivalsData} />
    </div>
  );
}

export default TabPrint;
