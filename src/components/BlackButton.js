import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Container = styled(TouchableOpacity)`
    background-color: ${({ready}) => ready ? 'rgba(29, 29, 31, 1)' : 'rgba(29, 29, 31, 0.2)'};
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

const BlackButton = ({ text, width, image, onPress, ready = true, style }) => {
    return (
        <Container width={width} onPress={onPress} ready={ready} style={[style]}>
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
    ready: PropTypes.bool,
}

export default BlackButton