import React from "react";
import { View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import styled from 'styled-components/native';

const ChartWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 36px 0 60px 0;
    padding: 0 8px;
`

const LabelWrapper = styled.View`
    display: flex;
    gap: 15px;
`

const Label = styled.View`
    display: flex;
    width: 165px;
    flex-direction: row;
    justify-content: space-between;
    gap: 12px;
`

const Wrapper = styled.View`
    display: flex;
    align-items: center;
    gap: 5px;
    flex-direction: row;
`

const Color = styled.View`
    background-color: ${({color}) => color};
    width: 12px;
    height: 12px;
    border-radius: 6px;
`

const Category = styled.Text`
    font-size: 17px;
    font-family: 'SUIT-Medium';
    color: #363638;
`

const Price = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    color: #363638;
`

const MiniPieChart = ({ memberData }) => {
    const colorData = [
        'rgba(29, 29, 31, 1)',
        'rgba(29, 29, 31, 0.7)',
        'rgba(29, 29, 31, 0.5)',
        'rgba(29, 29, 31, 0.3)',
        'rgba(29, 29, 31, 0.2)',
        'rgba(29, 29, 31, 0.1)'
    ]

    const formattedData = memberData.map((data, index) => {
        return {
            id: index+1,
            name: data.memberName,
            population: data.amount || 0,
            color: colorData[index%colorData.length],
            legendFontColor: '#7F7F7F',
            legendFontSize: 14,
        }
    })
    console.log('formattedData',formattedData);

    return (
        <ChartWrapper>
            <PieChart
                data={formattedData}
                width={157}
                height={134}
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                hasLegend={false}
            />
            <LabelWrapper>
                {memberData.map((data, index) => {
                    return (
                        <Label key={index}>
                            <Wrapper>
                                <Color color={colorData[index%colorData.length]}></Color>
                                <Category>{data.memberName}</Category>
                            </Wrapper>
                            <Price>{(data.amount ?? 0).toLocaleString()}원</Price>
                        </Label>                    
                    )
                })}
            </LabelWrapper>
        </ChartWrapper>
    );
};

export default MiniPieChart;
