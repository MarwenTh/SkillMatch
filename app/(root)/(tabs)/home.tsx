import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className=" flex-1 bg-white py-2 px-5">
      <View className=" flex flex-row justify-between items-center">
        <View className=" bg-secondary-300 h-10 w-10 flex flex-row justify-center items-center rounded-lg">
          <FontAwesome size={23} name="bolt" color={"yellow"} />
        </View>
        <Text>SkillMatch</Text>
        <FontAwesome size={28} name="filter" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
