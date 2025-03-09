import React, { useState } from 'react';
import BottomTab from './BottomTab';
import LoginStack from './LoginStack';

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  console.log('Navigation 컴포넌트에서 setIsLogin:', setIsLogin);

  return (
    <>
      {isLogin ? <BottomTab setIsLogin={setIsLogin}/> : <LoginStack setIsLogin={setIsLogin}/>}
    </>
  );
};

export default Navigation;
