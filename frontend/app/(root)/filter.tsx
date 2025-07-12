import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Temporary",
];
const jobLevels = ["Entry", "Mid", "Senior", "Lead"];

const Filter = ({ navigation }) => {
  const navigate = useRouter();
  const [remote, setRemote] = useState(false);
  const [fetchOutside, setFetchOutside] = useState(false);
  // Placeholder handlers for navigation
  const handleNavigate = (type) => {
    navigate.push({
      pathname: "/(root)/dynamic-filter",
      params: { type: String(type) },
    });
  };
  const handleClear = () => {
    // Reset logic here if needed
  };

  const toggleSwitch = () => setRemote((prev) => !prev);
  const toggleFetchOutside = () => setFetchOutside((prev) => !prev);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigate.back()}>
          <FontAwesome name="arrow-left" size={22} color="#222" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">Job Filter</Text>
        <TouchableOpacity onPress={handleClear}>
          <Text className="text-blue-600 font-semibold">Clear</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 px-4 py-2">
        {/* Job Titles */}
        <Text className="text-base font-semibold text-gray-700 mb-1 mt-2">
          Job Titles
        </Text>
        <TouchableOpacity
          className="flex-row items-center bg-blue-100 px-4 py-3 rounded-lg mb-4"
          onPress={() => handleNavigate("jobTitle")}
        >
          <FontAwesome name="plus" size={18} color="#2563eb" />
          <Text className="ml-2 text-blue-700 font-semibold">
            Add Job Title
          </Text>
        </TouchableOpacity>
        {/* Remote Option */}
        <View className="flex-row items-center">
          <Text className="text-base font-semibold text-gray-700 mr-4">
            Remote
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={remote ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={remote}
          />
          <Text className="ml-3 text-gray-500">{remote ? "Yes" : "No"}</Text>
        </View>
        {/* Fetch Jobs from Outside the Application */}
        <View className="flex-row items-center ">
          <Text className="text-base font-semibold text-gray-700 mr-4 ">
            External Job Sources
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={fetchOutside ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleFetchOutside}
            value={fetchOutside}
          />
          <Text className="ml-3 text-gray-500">
            {fetchOutside ? "Yes" : "No"}
          </Text>
        </View>
        {/* Job Types */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Job Types
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {jobTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className={`px-3 py-1 rounded-full border bg-gray-100 border-gray-300 mr-2 mb-2`}
            >
              <Text className="text-gray-700">{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Job Levels */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Job Levels
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {jobLevels.map((level) => (
            <TouchableOpacity
              key={level}
              className={`px-3 py-1 rounded-full border bg-gray-100 border-gray-300 mr-2 mb-2`}
            >
              <Text className="text-gray-700">{level}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Job Requirements */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Job Requirements
        </Text>
        <TouchableOpacity
          className="flex-row items-center bg-blue-100 px-4 py-3 rounded-lg mb-4"
          onPress={() => handleNavigate("jobRequirements")}
        >
          <FontAwesome name="plus" size={18} color="#2563eb" />
          <Text className="ml-2 text-blue-700 font-semibold">
            Add Job Requirements
          </Text>
        </TouchableOpacity>
        {/* Min Salary */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Min Salary
        </Text>
        <TouchableOpacity
          className="flex-row items-center bg-blue-100 px-4 py-3 rounded-lg mb-4"
          onPress={() => handleNavigate("salary")}
        >
          <FontAwesome name="plus" size={18} color="#2563eb" />
          <Text className="ml-2 text-blue-700 font-semibold">
            Add Salary Range (DT)
          </Text>
        </TouchableOpacity>
        {/* Locations */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Locations
        </Text>
        <TouchableOpacity
          className="flex-row items-center bg-blue-100 px-4 py-3 rounded-lg mb-4"
          onPress={() => handleNavigate("locations")}
        >
          <FontAwesome name="plus" size={18} color="#2563eb" />
          <Text className="ml-2 text-blue-700 font-semibold">Add Location</Text>
        </TouchableOpacity>
        {/* Countries */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Countries
        </Text>
        <TouchableOpacity
          className="flex-row items-center bg-blue-100 px-4 py-3 rounded-lg mb-4"
          onPress={() => handleNavigate("countries")}
        >
          <FontAwesome name="plus" size={18} color="#2563eb" />
          <Text className="ml-2 text-blue-700 font-semibold">Add Country</Text>
        </TouchableOpacity>
        {/* Job Sources */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Job Sources
        </Text>
        <TouchableOpacity
          className="flex-row items-center bg-blue-100 px-4 py-3 rounded-lg mb-8"
          onPress={() => handleNavigate("jobSource")}
        >
          <FontAwesome name="plus" size={18} color="#2563eb" />
          <Text className="ml-2 text-blue-700 font-semibold">
            Add Job Source
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Filter;
