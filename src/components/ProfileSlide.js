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

const ProfileSlide = ({ members }) => {
    const [selected, setSelected] = useState(1);
    console.log(members)

    return (
        <ProfileList horizontal={true}>
            {members && members.length > 0 && members.map((member) => (
                <Profile
                    key={member.id}
                    name={member.name}
                    leader={member.leader}
                    // sameName={member.sameName}
                    image={member.image}
                    // color={member.color}
                    selected={selected === member.id}
                    onPress={() => setSelected(member.id)}
                />
            ))}
        </ProfileList>
    )
}

export default ProfileSlide
