import logo from "@/assets/images/icon.png";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

const HomeHeader = () => {
  return (
    <View className="flex flex-row justify-between items-center bg-secondary-200 py-3 px-5">
      <View className="flex flex-row-reverse gap-x-1">
        <Text className="font-JakartaBold text-lg text-[#0891AB]">
          SkillMatch
        </Text>
        <Image
          source={logo}
          style={{ width: 27, height: 27, borderRadius: 50 }}
        />
      </View>
      <View className="flex flex-row gap-x-2">
        <View className="bg-gray-50/80 h-12 w-12 flex flex-row justify-center items-center rounded-full border border-gray-100">
          <FontAwesome size={20} name="bolt" color="#781aab" />
        </View>
        <Link href={"/(root)/filter"}>
          <View className="bg-blue-50 h-12 w-12 flex flex-row justify-center items-center rounded-lg border border-blue-100">
            <FontAwesome size={20} name="filter" color="#3b82f6" />
          </View>
        </Link>
        <Link href={"/(root)/search"}>
          <View className="bg-gray-50 h-12 w-12 flex flex-row justify-center items-center rounded-lg border border-gray-100">
            <FontAwesome size={20} name="search" color="#6b7280" />
          </View>
        </Link>
      </View>
    </View>
  );
};

export default HomeHeader;
