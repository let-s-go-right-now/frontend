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

const data = [
    { id: 1, name: "박시우", population: 468000, color: "rgba(29, 29, 31, 1)", legendFontColor: "#7F7F7F", legendFontSize: 14, },
    { id: 2, name: "이우경", population: 448000, color: "rgba(29, 29, 31, 0.5)", legendFontColor: "#7F7F7F", legendFontSize: 14},
    { id: 3, name: "임서현", population: 468000, color: "rgba(29, 29, 31, 0.2)", legendFontColor: "#7F7F7F", legendFontSize: 14},
];

const MiniPieChart = () => {
    return (
        <ChartWrapper>
            <PieChart
                data={data}
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
                {data.map((data) => {
                    return (
                        <Label key={data.id}>
                            <Wrapper>
                                <Color color={data.color}></Color>
                                <Category>{data.name}</Category>
                            </Wrapper>
                            <Price>{data.population.toLocaleString()}원</Price>
                        </Label>                    
                    )
                })}
            </LabelWrapper>
        </ChartWrapper>
    );
};

export default MiniPieChart;
