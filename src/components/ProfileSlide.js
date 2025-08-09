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

const ProfileSlide = ({ members, onDataChange }) => {
    const [selected, setSelected] = useState(); // 선택된 멤버 id
    const [selectedEmail, setSelectedEmail] = useState(); // 선택된 멤버 이메일
    console.log('members', members);
    console.log('selected',selected);
    console.log('selectedEmail', selectedEmail);

    const handlePress = (id, email) => {
        setSelected(id);
        setSelectedEmail(email);
        onDataChange(email);
    }

    // const sendDataToParent = () => {
    //     onDataChange(selectedEmail);
    // }


    return (
        <ProfileList horizontal={true}>
            {members && members.length > 0 && members.map((member) => (
                <Profile
                    key={member.id}
                    name={member.name}
                    leader={member.leader}
                    // sameName={member.sameName}
                    image={member.image?.uri}
                    // color={member.color}
                    selected={selected === member.id}
                    onPress={() => handlePress(member.id, member.email)}
                    normal={selected === undefined}
                />
            ))}
        </ProfileList>
    )
}

export default ProfileSlide
