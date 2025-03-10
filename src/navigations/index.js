import React, { useState } from 'react';
import BottomTab from './BottomTab';
import LoginStack from './LoginStack';

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <>
      {isLogin ? <BottomTab setIsLogin={setIsLogin}/> : <LoginStack setIsLogin={setIsLogin}/>}
    </>
  );
};

export default Navigation;
