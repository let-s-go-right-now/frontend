import React from 'react';
import { Image, TextInput, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';


const TravelCreate = ({navigation}) => {
  const handleCreateTravel = () => {
    // 여행 만들기 버튼 클릭 시 TravelInvite 화면으로 이동
    navigation.navigate('TravelInvite');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput 
          style={styles.travelNameInput} 
          placeholder="여행 이름을 입력하세요" 
        />
        <View style={styles.dateInputWrapper}>
          <View>
            <Text style={styles.sectionText}>출발</Text>
            <View>
              <TextInput style={styles.dateInput} placeholder="출발 날짜" />
              <Image source={require('../assets/icons/main/calender-icon.png')} style={styles.calendarIcon} />
            </View>
          </View>
          <View>
            <Text style={styles.sectionText}>도착</Text>
            <View>
              <TextInput style={styles.dateInput} placeholder="도착 날짜" />
              <Image source={require('../assets/icons/main/calender-icon.png')} style={styles.calendarIcon} />
            </View>
          </View>
        </View>

      </View>

      <Text style={styles.sectionText}>어떤 여행인가요?</Text>
      <TextInput style={styles.memoInput} placeholder="메모를 입력하세요" multiline />
      
      <TouchableOpacity style={styles.button} onPress={handleCreateTravel}>
        <Text style={styles.buttonText}>여행 만들기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TravelCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#FBFBFB',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  labelText: {
    fontFamily: 'theme.fonts.extrabold',
    fontSize: 23,
    color: '#BBBBBB',
    marginBottom: 15,
  },
  sectionText: {
    fontWeight:'medium',
    fontSize: 15,
    color: '#1D1D1F',
    marginBottom: 10,
  },
  dateInputWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
    flex:1,
  },
  dateInput: {
    width: 311,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    fontWeight:'regular',
    fontSize: 15,
    borderWidth: 0.5,
    borderColor:'#EEEEEE',
    marginBottom:20,
  },
  calendarIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
    width: 20,
    height: 20,
    zIndex:1
  },
  memoInput: {
    width: 351,
    height: 140,
    backgroundColor: '#fff',
    paddingLeft: 10,
    fontWeight:'regular',
    fontSize: 15,
    borderWidth: 0.5,
    borderColor:'#EEEEEE',
    marginBottom: 20,
  },
  button: {
    width: 351,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'theme.fonts.extrabold',
    fontSize: 17,
    color: 'white',
  },
  travelNameInput: {
    fontFamily: 'theme.fonts.extrabold',
    fontSize: 23,
    borderColor: '#BBBBBB',
    height: 50,
    marginBottom: 15,
  },
});
