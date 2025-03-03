import { PieChart } from "react-native-gifted-charts";
import styled from "styled-components/native";

const ChartWrapper = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 36px;
`

const LabelWrapper = styled.View`
    display: flex;
    gap: 15px;
    margin-top: 22px;
    margin-bottom: 60px;
`

const Label = styled.View`
    display: flex;
    width: 327px;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    gap: 15px;
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

const Percent = styled.Text`
    font-size: 13px;
    font-family: 'SUIT-SemiBold';
    color: #ABABAB;
`

const Price = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    color: #363638;
`

const PieChartComponent = () => {

    const pieData = [
        {id: 1, value: 468000, color: 'rgba(29, 29, 31, 1)', text: '교통', category: '교통', percent: 30, price: 468000},
        {id: 2, value: 390000, color: 'rgba(29, 29, 31, 0.7)', text: '숙박', category: '숙박', percent: 25, price: 390000},
        {id: 3, value: 312000, color: 'rgba(29, 29, 31, 0.5)', text: '식사', category: '식사', percent: 20, price: 312000},
        {id: 4, value: 156000, color: 'rgba(29, 29, 31, 0.3)', text: '관광 ', category: '관광', percent: 10, price: 156000},
        {id: 5, value: 156000, color: 'rgba(29, 29, 31, 0.2)', text: '쇼핑', category: '쇼핑', percent: 10, price: 156000},
        {id: 6, value: 78000, color: 'rgba(29, 29, 31, 0.1)', text: '기타', category: '기타', percent: 5, price: 78000},
    ];
    
    return(
        <ChartWrapper>
            <PieChart
                showText
                textColor="white"
                radius={140}
                textSize={17}
                data={pieData}
                labelsPosition="mid"
                focusScale={2}
                style={{
                    borderWidth: 1,
                    borderColor: 'red',
                    margin: 0,
                    padding: 0,
                }}
            />
            <LabelWrapper>
                {pieData.map((data) => {
                    return (
                        <Label key={data.id}>
                            <Wrapper>
                                <Color color={data.color}></Color>
                                <Category>{data.category}</Category>
                                <Percent>{data.percent}%</Percent>
                            </Wrapper>
                            <Price>{data.price.toLocaleString()}원</Price>
                        </Label>                    
                    )
                })}
            </LabelWrapper>
    </ChartWrapper>
    )
};

export default PieChartComponent;