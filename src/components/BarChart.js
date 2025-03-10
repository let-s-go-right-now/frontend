import { useEffect, useState } from "react";
import styled from "styled-components/native";

const ExtraTitle = styled.Text`
    color: #000000;
    font-size: 20px;
    font-family: 'SUIT-ExtraBold';
`

const ChartWrapper = styled.ScrollView.attrs(() => ({
    horizontal: true,
    contentContainerStyle: {
        flexDirection: 'row',
        gap: 0,
        paddingHorizontal: 0,
    },
}))`
    flex: 1;
    padding: 28px 0 0 0;
    margin: 0 auto;
`

const Container = styled.View`
    display: flex;
    align-items: center;
    width: 83px;
    margin-top: auto;
`

const Chart = styled.View`
    width: 50px;
    color: gray;
    margin-bottom: 16px;
    height: ${({height}) => (height*176)}px;
    background-color: ${({height}) => height===1 ? '#1D1D1F' : 'rgba(54, 54, 54, 0.1)'};
`

const Label = styled.Text`
    font-size: 15px;
    color: #888888;
    font-family: 'SUIT-SemiBold';
    margin-bottom: 9px;
`

const Value = styled.Text`
    font-size: 15px;
    color: #363638;
    font-family: 'SUIT-SemiBold';
`

const BarChartComponent = ({ barData=[] }) => {
    const [maxDay, setMaxDay] = useState(1);
    const [maxValue, setMaxValue] = useState(0);
    const filteredData = barData.filter(item => item.day >= 1);

    const getMaxData = () => {
        try {
            console.log('BarChartComponent의 barData', barData);
            let maxDay = filteredData[0]?.day || 1;
            let maxValue = filteredData[0].totalAmount || 0;
            console.log('filteredData',filteredData);
            for (let i=0;i<filteredData.length;i++) {
                if (maxValue < filteredData[i].totalAmount) {
                    maxValue = filteredData[i].totalAmount;
                    maxDay = i+1;
                }
            }
            setMaxDay(maxDay);
            setMaxValue(maxValue);
            console.log('maxDay', maxDay);
            console.log('maxValue', maxValue);
        } catch (error) {
            console.log('barData')
        }        
    }

    useEffect(() => {
        getMaxData();
    }, )


    return (
        <>
            <ExtraTitle>{maxDay}일차에 가장 많이 썼어요</ExtraTitle>
            <ChartWrapper horizontal={true}>
            {filteredData.length > 0 && filteredData.map((data, index) => (
                <Container key={index}>
                    <Chart height={data.totalAmount/maxValue}></Chart>
                    <Label>{data.day}일차</Label>
                    <Value>{data.totalAmount.toLocaleString()}원</Value>
                </Container>
            ))}
            </ChartWrapper>
        </>
    );
};

export default BarChartComponent;