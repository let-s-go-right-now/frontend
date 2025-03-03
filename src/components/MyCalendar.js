import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import BlackButton from "./BlackButton";

const MyCalendar = ({ onButtonPress }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    const { dateString } = day;

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateString);
      setEndDate(null);
      setMarkedDates({ 
        [dateString]: { startingDay: true, color: "#111111", textColor: "white" } 
      });
    } else {
      setEndDate(dateString);
      const range = getDateRange(startDate, dateString);
      const updatedMarkedDates = range.reduce((acc, date, index, arr) => {
        if (index === 0) {
          acc[date] = { startingDay: true, color: "#111111", textColor: "white" };
        } else if (index === arr.length - 1) {
          acc[date] = { endingDay: true, color: "#111111", textColor: "white" };
        } else {
          acc[date] = { color: "#EEEEEE", textColor: "#111111" };
        }
        return acc;
      }, {});

      setMarkedDates(updatedMarkedDates);
    }
  };

  const getDateRange = (start, end) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    let dates = [];

    while (startDate <= endDate) {
      dates.push(startDate.toISOString().split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };

  return (
    <View style={styles.container}>
      <Calendar
        markingType="period"
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          selectedDayBackgroundColor: "#111111",
          todayTextColor: "#111111",
          dayTextColor: "#111111",
          arrowColor: "#111111",
          monthTextColor: "#111111",
        }}
        // 한국어로 변경하기 위한 설정
        locale="ko" // 한국어 설정
        monthFormat={'yyyy년 MM월'} // 월 포맷
        dayNames={['일', '월', '화', '수', '목', '금', '토']} // 요일 이름
        monthNames={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']} // 월 이름
        style={styles.calendarContainer}
      />
      <BlackButton style={styles.blackbutton}
        text="선택 완료"
        width={343}
        onPress={() => onButtonPress(startDate, endDate)} // 상위 컴포넌트로 전달
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop:-70,
  },
  calendarContainer: {
    transform: [{ scale: 0.9 }]
  },
  selectedText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default MyCalendar;
