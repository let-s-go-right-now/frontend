import React, { useState } from 'react';
import styled from 'styled-components/native';
import Profile from './Profile';

const ProfileList = styled.ScrollView.attrs(() => ({
    horizontal: true,
    contentContainerStyle: {
        flexDirection: 'row',
        gap: 18,
        paddingHorizontal: 16,
    },
}))`
    min-width: 100%;
    padding: 0;
    height: 87px;
`

const Members = [
    {
        id: 1,
        name: '박시우',
        leader: true,
        sameName: false,
        image: require('../assets/icons/user/박시우.png'),
        color: '#55C1E5',
    },
    {
        id: 2,
        name: '이우경',
        leader: false,
        sameName: true,
        image: require('../assets/icons/user/이우경.png'),
        color: '#7D7BFF',
    },
    {
        id: 3,
        name: '이우경',
        leader: false,
        sameName: true,
        image: require('../assets/icons/user/이우경.png'),
        color: '#8EE555',
    },
    {
        id: 4,
        name: '이우경',
        leader: false,
        sameName: true,
        image: require('../assets/icons/user/이우경.png'),
        color: '#FF7EB6',
    },
    {
        id: 5,
        name: '임서현',
        leader: false,
        sameName: true,
        image: require('../assets/icons/user/임서현.png'),
        color: '#BA60FF'
    },
    {
        id: 6,
        name: '임서현',
        leader: false,
        sameName: true,
        image: require('../assets/icons/user/임서현.png'),
        color: '#FFC918'
    },
]

const ProfileSlide = () => {
    const [selected, setSelected] = useState(1);

    return (
        <ProfileList horizontal={true}>
            {Members.map((member) => (
                <Profile
                    key={member.id}
                    name={member.name}
                    leader={member.leader}
                    sameName={member.sameName}
                    image={member.image}
                    color={member.color}
                    selected={selected === member.id}
                    onPress={() => setSelected(member.id)}
                />
            ))}
        </ProfileList>
    )
}

export default ProfileSlide
