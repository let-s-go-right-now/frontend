import React, { useState, useCallback, useRef } from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';
import { ExpenditureList } from '../../components';

const CompletedDetail = ({ route }) => {
    const { id } = route.params;
    const expenditures = [
        {
          title: "강릉까지 택시",
          category: "교통",
          cost: "12,800원",
          date: "12.22 14:29",
        },
        {
          title: "강릉까지 택시",
          category: "교통",
          cost: "12,800원",
          date: "12.22 14:29",
        },
        {
          title: "강릉까지 택시",
          category: "교통",
          cost: "12,800원",
          date: "12.22 14:29",
        },
        {
          title: "강릉까지 택시",
          category: "교통",
          cost: "12,800원",
          date: "12.22 14:29",
        },
      ];
    

  return (
    <>
       {/* 지출 내역 */}
       <ExpenditureList data={expenditures} />
    </>
  );
};

const styles = StyleSheet.create({

});

export default CompletedDetail;
