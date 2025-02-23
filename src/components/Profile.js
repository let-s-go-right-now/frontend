import React from 'react';
import styled from 'styled-components/native';
import LeaderBadge from '../assets/icons/user/leader_badge.png';
import { Image, TouchableOpacity } from 'react-native';

const ProfileWrapper = styled(TouchableOpacity)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: ${({selected}) => (selected ? 1 : 0.2)};
`

const ProfileImage = styled(Image)`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border-width: ${({selected}) => (selected ? '2.5px' : '0px')};
    border-color: ${({selected}) => (selected ? '#363638' : 'transparent')};
`

const Info = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 4px;
    margin-top: 8px;
`

const ColorBadge = styled.View`
    width: 5px;
    height: 5px;
    border-radius: 30px;
    background-color: ${({color}) => color};
`

const Name = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-SemiBold';
    color: #1D1D1F;
`

const Profile = ({
    name,
    leader,
    sameName,
    image,
    color,
    selected,
    onPress
}) => {
    return (
            <ProfileWrapper selected={selected} onPress={onPress}>
                <ProfileImage 
                    source={image} 
                    selected={selected}
                />
                <Info>
                    {sameName && <ColorBadge color={color}></ColorBadge>}
                    <Name>{name}</Name>
                    {leader && <Image source={LeaderBadge}/>}
                </Info>
            </ProfileWrapper>
    )
}

export default Profile
