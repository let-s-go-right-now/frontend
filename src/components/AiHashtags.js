// location, details, cost 있을 때

import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Cost from '../assets/icons/ai/cost.png';
import Search from '../assets/icons/ai/search.png';

const Wrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 347px;
`

const Line = styled.View`
    margin-left: 4px;
    border-left-color: #1D1D1F;
    border-left-width: 1px;
    border-left-style: dashed;
    height: 100%;
    width: 11px;
`

const Content = styled.View`
    padding: 12px;
    flex: 1;
`

const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Title = styled.Text`
    font-size: 19px;
    font-family: 'SUIT-Bold';
    color: #363638;
    margin-right: 9px;
`

const MoneyImg = styled(Image)`
    width: 14px;
    height: 14px;
    margin-right: 4px;
`

const Money = styled.Text`
    font-size: 12px;
    font-family: 'SUIT-Bold';
    color: #999999;
`

const SearchWrapper = styled(TouchableOpacity)`
    background-color: #F2F6FF;
    padding: 4px;
    gap: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const SearchImg = styled(Image)`
    width: 10px;
    height: 10px;
`

const SearchText = styled.Text`
    font-size: 11px;
    font-family: 'SUIT-Light';
    color: #5588F4;
`

const Desc = styled.Text`
    font-size: 15px;
    font-family: 'SUIT-Medium';
    color: #363638;
`

const HashtagsWrapper = styled.View`
    background-color: #F7F7F7;
    padding: 4px 5px;
    display: flex;
    flex-direction: row;
    gap: 2px;
    width: auto;
    align-self: flex-start;
    margin-bottom: 10px;
`

const Hashtag = styled.Text`
    font-size: 11px;
    font-family: 'SUIT-Medium';
    color: #999999;
`

const AiHashtags = ({ location, details, cost=null, link="https://naver.com", hashtags }) => {
    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    };
    
    return (
        <Wrapper>
            <Line></Line>
            {/* <Text>{hashtags}</Text> */}
            <Content>
                <RowWrapper style={{justifyContent: 'space-between', marginBottom: 6}}>
                    <RowWrapper>
                        <Title>{location}</Title>
                        {link!==null && (
                            <SearchWrapper onPress={() => openURL(link)}>
                                <SearchImg source={Search}/>
                                <SearchText>찾아보기</SearchText>
                            </SearchWrapper>                        
                        )}
                    </RowWrapper>
                    {cost!==null && (
                        <RowWrapper>
                            <MoneyImg source={Cost} />
                            <Money>{cost.toLocaleString()}원</Money>
                        </RowWrapper>                         
                    )}
                </RowWrapper>
                <HashtagsWrapper>
                    {hashtags && hashtags.map((hashtag, index) => (
                        <Hashtag key={index}>{hashtag}</Hashtag>
                    ))}
                </HashtagsWrapper>
                <Desc>{details}</Desc>
            </Content>
        </Wrapper>
    )
}

AiHashtags.propTypes = {
    location: PropTypes.string.isRequired,
    details: PropTypes.string,
    cost: PropTypes.number,
    link: PropTypes.string,
}

export default AiHashtags
