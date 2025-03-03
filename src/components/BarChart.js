import styled from "styled-components/native";

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

const BarChartComponent = () => {

    const barData = [
        {
            id: 1,
            label: '1일차',
            value: 467000,
            height: 0.735,
        },
        {
            id: 2,
            label: '2일차',
            value: 635000,
            height: 1,
        },
        {
            id: 3,
            label: '3일차',
            value: 458000,
            height: 0.721,
        },
    ];

    return (
        <ChartWrapper horizontal={true}>
        {barData.map((data) => (
            <Container key={data.id}>
                <Chart height={data.height}></Chart>
                <Label>{data.label}</Label>
                <Value>{data.value}</Value>
            </Container>
        ))}
        </ChartWrapper>
    );
};

export default BarChartComponent;