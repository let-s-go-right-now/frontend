import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
const Title = styled.Text`
    font-size: 30px;
`

const App = () => {
    return (
        <Container>
            <Title>당장가자</Title>
        </Container>
    )
}



export default App;