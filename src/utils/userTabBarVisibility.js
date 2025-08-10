// 하단바를 숨기거나 나타나게 하는 로직 Component 입니다.
// 필요시 import 후, 해당 Component에서
// useTabBarVisibility(true/false); 로 사용할 수 있습니다
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const useTabBarVisibility = (visible) => {
  const navigation = useNavigation();

// 화면이 그려지기 전 여부를 판독해야 하기 때문에 useLAyoutEffect를 사용한다.
  useLayoutEffect(() => {
  // 변경하려는 Screen을 담은 변수
    const parentNavigator = navigation.getParent();
    if (parentNavigator) {
      parentNavigator.setOptions({
      // 실제 사용하고 있는 하단바 스타일
        tabBarStyle: visible
          ? {
              width: 200,
              height: 42,
              elevation: 0,
            }
          : {
              display: 'none',
            },
      });
    }

// 다른 스크린으로 이동 시 다시 Tab Bar가 보임
    return () => {
      if (parentNavigator) {
        parentNavigator.setOptions({
          tabBarStyle: {
            width: 200,
            height: 42,
            elevation: 0,
          },
        });
      }
    };
  }, [navigation, visible]);
};

export default useTabBarVisibility;