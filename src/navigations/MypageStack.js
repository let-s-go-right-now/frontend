import React from "react";
import StackNavigator from "./Stack";
import { Mypage } from "../screens";
import { Mypage2 } from "../screens";

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
]

const MypageStack = () => {
    return (
            <StackNavigator ScreenList={MypageList}/>

    )
}

export default MypageStack
