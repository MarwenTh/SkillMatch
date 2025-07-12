import HomeBody from "@/components/Home/HomeBody";
import HomeHeader from "@/components/Home/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HomeHeader />
      <HomeBody />
    </SafeAreaView>
  );
};

export default Home;
