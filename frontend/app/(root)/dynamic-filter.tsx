import InputField from "@/components/InputField";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DynamicFilter = () => {
  const navigate = useRouter();
  const params = useLocalSearchParams();
  const type = params?.type || "Filter";

  const handleClear = () => {
    // Clear logic here
  };
  const handleDone = () => {
    // Done logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigate.back()}>
          <FontAwesome name="arrow-left" size={22} color="#222" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">{type}</Text>
        <TouchableOpacity onPress={handleClear}>
          <Text className="text-blue-600 font-semibold">Clear</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-4 py-6">
        <InputField
          label={`Search ${type}`}
          placeholder={`Type to search or add a ${String(type).toLowerCase()}`}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={30}
      >
        <TouchableOpacity
          className="bg-blue-600 mx-4 mb-6 py-4 rounded-xl items-center"
          onPress={handleDone}
        >
          <Text className="text-white font-bold text-lg">Done</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DynamicFilter;
