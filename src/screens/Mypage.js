import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { GrayButton } from '../components';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import DefaultImg from '../assets/icons/user/profile.png';
import HeartFull from '../assets/icons/user/heart_full.png';
import Money from '../assets/icons/user/money.png';
import Calender from '../assets/icons/user/calender.png';
import Transport from '../assets/icons/user/transport.png';

const MypageWrapper = styled.View`
	display: flex;
	width: 375px;
	padding: 0 16px;
	margin: 0 auto;
`

const Top = styled.View`
	display: flex;
	width: 343px;
	flex-direction: row;
	align-items: center;
	height: 44px;
	margin-top: 24px;
	justify-content: space-between;
`

const Profile = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const ProfileImg = styled(Image)`
	width: 44px;
	height: 44px;
	margin-right: 12px;
	margin-left: 6px;
`

const Name = styled.Text`
	font-family: 'SUIT-Bold';
	font-size: 20px;
	color: #1D1D1F;
`

const Header = styled.Text`
	color: #363638;
	font-family: 'SUIT-ExtraBold';
	font-size: 19px;
	margin: 26px 0;
`

const PostWrapper = styled.ScrollView.attrs(() => ({
	horizontal: false,
}))`
	padding: 0;
	width: 343px;
	gap: 18px;
	margin-bottom: 142px;
`

const Post = styled.TouchableOpacity`
	width: 343px;
`

const Info = styled.View`
	display: flex;
	align-items: center;
	flex-direction: row;
	align-items: center;
`

const InfoImg = styled(Image)`
	width: 14px;
	height: 14px;
	margin-right: 3px;
`

const InfoText = styled.Text`
	color: #999999;
	font-size: 13px;
	font-family: 'SUIT-Medium';
`

const InfoLine = styled.Text`
	color: #CCCCCC;
	font-size: 15px;
	font-family: 'SUIT-Medium';
	margin: 0 6px;
`

const Title = styled.Text`
	font-size: 15px;
	color: #363638;
	font-family: 'SUIT-Bold';
`

const Bottom = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 4px;
	margin-bottom: 18px;
	padding-bottom: 20px;
	border-bottom-color: #EEEEEE;
	border-bottom-width: 1px;
	border-bottom-style: solid;
`

const Mypage = ({ navigation }) => {
	const [imageUri, setImageUri] = useState(null);
	const [name, setName] = useState('');

	const width = Dimensions.get('window').width;
	
	const PostList= [
		{
			id: 1,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '하루만에 끝내는 대구 근대골목 투어',
		},
		{
			id: 2,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '북한강 따라 즐기는 자연, 지금 당장 가평에서!',
		},
		{
			id: 3,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '8시간 만에 완성하는 레트로 감성 군산 여행',
		},
		{
			id: 4,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '포항에서 맛보고 즐기는 문화 여행',
		},
		{
			id: 5,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '속초 가면 무조건 가봐야 할 찐 맛집 추천',
		},
		{
			id: 6,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '강릉 감성 폭발! 바다 보면서 커피 한 잔 어때?',
		},
		{
			id: 7,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '순천만의 자연과 한옥의 정취를 느끼는 여행',
		},
		{
			id: 8,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '강릉 감성 폭발! 바다 보면서 커피 한 잔 어때?',
		},
		{
			id: 9,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '순천만의 자연과 한옥의 정취를 느끼는 여행',
		},
		{
			id: 10,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '강릉 감성 폭발! 바다 보면서 커피 한 잔 어때?',
		},
		{
			id: 11,
			money: 35,
			start: '12.12',
			end: '12.14',
			transport: '대중교통',
			title: '순천만의 자연과 한옥의 정취를 느끼는 여행',
		},
	]
	
    return (
		<View style={{flex: 1, backgroundColor: '#FFFFFF', width: '100%'}} >
			<MypageWrapper>
				<Top>
					<Profile>
						<ProfileImg source={imageUri ? {uri: imageUri} : DefaultImg}/>
						<Name>{name}</Name>
					</Profile>
					<TouchableOpacity onPress={() => navigation.navigate('Mypage2')}>
						<GrayButton 
							text="프로필 관리"
							width={86}
							height={31}
							fontSize={15}
							fontColor="#838383"
							bgColor="#FBFBFB"
						/>
					</TouchableOpacity>
				</Top>
				<Header>좋아요 한 목록</Header>
				<PostWrapper>
					{PostList.map((post) => (
						<Post key={post.id}>
							<Info>
								<InfoImg source={Money}/>
								<InfoText>{post.money}만원/인</InfoText>
								<InfoLine>|</InfoLine>
								<InfoImg source={Calender}/>
								<InfoText>{post.start}-{post.end}</InfoText>
								<InfoLine>|</InfoLine>
								<InfoImg source={Transport}/>
								<InfoText>{post.transport}</InfoText>
							</Info>
							<Bottom>
								<Title>{post.title}</Title>
								<Image source={HeartFull} style={{width: 22, height: 22}}/>
							</Bottom>
						</Post>
					))}					
				</PostWrapper>
				<LinearGradient
					colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
					style={{
						width: width,
						height: 50,
						position: 'absolute',
						bottom: 142,
					}}
				/>
			</MypageWrapper>
		</View>
    )
}

export default Mypage
