import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ImgSlide } from "../components";
import { GeneralOptionButton } from "../components";
import image1 from "../assets/slides/image1.png";
import image2 from "../assets/slides/image2.png";
import image3 from "../assets/slides/image3.png";
import image4 from "../assets/slides/image4.png";
import image5 from "../assets/slides/image5.png";
import image6 from "../assets/slides/image6.png";

const TravelOngoing = () => {
  const [images] = useState([image1, image2, image3, image4, image5, image6]);
  const [itemsToShow] = useState(3); // 한 번에 보여줄 이미지 개수
  const [scale] = useState(100);
  
  // 옵션과 이미지 경로 추가
  const options = [
    { id: 1, text: "강릉뿌시기" },
    { id: 2, text: "별보러가자" },
    { id: 3, text: "캠핑하러가자"},
    { id: 4, text: "한강피크닉"},
    { id: 5, text: "여수밤바다"},
  ];

  const [selectedId, setSelectedId] = useState(1);

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GeneralOptionButton
            text={item.text}
            OptionImage={selectedId === item.id ? item.image_clicked : item.image}
            onPress={() => setSelectedId(item.id)}
            isSelected={selectedId === item.id}
            style={styles.optionButton}
          />
        )}
        style={styles.flatList} // FlatList 스타일 적용
      />
      <ImgSlide images={images} itemsToShow={itemsToShow} scale={scale} 
      style={styles.imgslide}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    paddingHorizontal: 10,
  },
  flatList: {
    width: 200, // FlatList 너비 200으로 설정
  },
  imgslide:{
    flex: 1,
  }
});

export default TravelOngoing;
