import React from "react";
import StackNavigator from "./Stack";
import { Report, Calculation, Finish } from '../screens';

const ReportList = [
    {
        id: 1,
        name: 'Report',
        component: Report,
        options: { headerShown: false, mode: 'light'},
    },
    {
        id: 2,
        name: 'Calculation',
        component: Calculation,
        options: { title: '금액 정산하기', mode: 'light'},
    },
    {
        id: 3,
        name: 'Finish',
        component: Finish,
        options: { headerShown: false, mode: 'light'},
    },
]

const ReportStack = () => {
    return (
        <StackNavigator ScreenList={ReportList}/>
    )
}

export default ReportStack
