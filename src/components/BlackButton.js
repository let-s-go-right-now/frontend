import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Container = styled(TouchableOpacity)`
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

const BlackButton = ({ text, width, image, onPress }) => {
    return (
        <Container width={width} onPress={onPress}>
            {image && image}
            <Title>{text}</Title>
        </Container>
    )
}

BlackButton.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    image: PropTypes.string,
    onPress: PropTypes.func,
}

export default BlackButton
