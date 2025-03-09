// useTabBarNone 컴포넌트: 하단바를 숨기고 이후에는 나타나지 않도록 설정하는 훅
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const useTabBarNone = () => {
  const navigation = useNavigation();

  // 화면이 그려지기 전 여부를 판독하기 위해 useLayoutEffect 사용
  useLayoutEffect(() => {
    const parentNavigator = navigation.getParent();
    
    if (parentNavigator) {
      parentNavigator.setOptions({
        // 하단바를 숨기기
        tabBarStyle: {
          display: "none",
        },
      });
    }

    return () => {
      // 다른 스크린으로 이동할 때 하단바를 다시 표시하지 않음
      if (parentNavigator) {
        parentNavigator.setOptions({
          tabBarStyle: {
            display: "none",
          },
        });
      }
    };
  }, [navigation]);
};

export default useTabBarNone;
