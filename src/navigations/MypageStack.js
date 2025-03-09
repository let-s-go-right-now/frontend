import React from "react";
import StackNavigator from "./Stack";
import { Mypage } from "../screens";
import { Mypage2 } from "../screens";
import LoginStack from "./LoginStack";
const MypageList = [
    {
        id: 1,
        name: "Mypage",
        component: Mypage,
        options: { headerShown: false, mode: 'light' },
    },
    {
        id: 2,
        name: "Mypage2",
        component: Mypage2,
        options: { title: '프로필 관리', mode: 'light'},
    },
    {
        id: 3,
        name: "LoginStack",
        component: LoginStack,
        options: {headerShown: false, mode: 'light'},
    },
]

const MypageStack = ({ setIsLogin }) => {
    return (
        <StackNavigator 
            ScreenList={MypageList.map(screen => ({
                ...screen,
                component: screen.name === "Mypage2" 
                    ? (props) => <Mypage2 {...props} setIsLogin={setIsLogin} /> 
                    : screen.component
            }))}
        />
    )
}

export default MypageStack
