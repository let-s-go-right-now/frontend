import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
    background-color: #1D1D1F;
    height: 50px;
    width: ${(props) => props.width}px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; 
    gap: 4px;
`

const Title = styled.Text`
    font-size: 17px;
    color: #FFFFFF;
    font-family: 'SUIT-Bold';
    line-height: 23.8px;
`

const BlackButton = ({ text, width, image }) => {
    return (
        <Container width={width}>
            {image && image}
            <Title>{text}</Title>
        </Container>
    )
}

BlackButton.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    image: PropTypes.string,
}

export default BlackButton
