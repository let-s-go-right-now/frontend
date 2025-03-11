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

const PieChartComponent = ({ pieData=[] }) => {

    const colorData = [
        'rgba(29, 29, 31, 1)',
        'rgba(29, 29, 31, 0.7)',
        'rgba(29, 29, 31, 0.5)',
        'rgba(29, 29, 31, 0.3)',
        'rgba(29, 29, 31, 0.2)',
        'rgba(29, 29, 31, 0.1)'
    ]

    const data =  pieData.map((data, index) => {
        let category;
        switch (data.categoryName) {
            case 'TRANSPORTATION':
                category = '교통';
                break;
            case 'MEALS':
                category = '식사';
                break;
            case 'SHOPPING':
                category = '쇼핑';
                break;
            case 'SIGHTSEEING':
                category = '관광';
                break;
            case 'ACCOMMODATION':
                category = '숙소';
                break;
            case 'ETC':
                category = '기타';
                break;
            default:
                category = '기타';
        }

        return {
            id: index + 1,
            value: data.totalAmount,
            color: colorData[index % colorData.length], // 색상 배열을 순환
            text: category,
            category: category,
            percentage: Math.round(data.percentage),
            totalAmount: data.totalAmount
        }
    });
    
    return(
        <ChartWrapper>
            <PieChart
                showText
                textColor="white"
                radius={140}
                textSize={17}
                data={data}
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
                {data.length > 0 && data.map((item, index) => {
                    return (
                        <Label key={index}>
                            <Wrapper>
                                <Color color={colorData[index]}></Color>
                                <Category>{item.text}</Category>
                                <Percent>{Math.round(item.percentage)}%</Percent>
                            </Wrapper>
                            <Price>{item.totalAmount.toLocaleString()}원</Price>
                        </Label>                    
                    )
                })}
            </LabelWrapper>
    </ChartWrapper>
    )
};

export default PieChartComponent;