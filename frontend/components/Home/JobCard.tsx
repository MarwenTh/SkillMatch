import React from "react";
import { Animated, Image, Text, View } from "react-native";

const JobCard = ({ job, animatedStyle, panHandlers, children }) => {
  if (!job) return null;

  return (
    <Animated.View
      {...(panHandlers || {})}
      style={[
        {
          width: "92%",
          height: "100%",
          position: "absolute",
        },
        animatedStyle,
      ]}
      className="rounded-3xl px-7 py-8 flex items-center justify-center bg-[#f5f6fa]"
    >
      {children}
      <View className="bg-white rounded-xl p-3 mb-6 shadow-md">
        {job.employer_logo ? (
          <Image
            source={{ uri: job.employer_logo }}
            className="w-14 h-14 rounded-lg"
            resizeMode="contain"
          />
        ) : null}
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-1 text-center">
        {job.job_title}
      </Text>
      <Text className="text-lg text-blue-700 font-semibold mb-1">
        {job.employer_name}
      </Text>
      <Text className="text-base text-gray-500 mb-1">
        {job.job_city || job.job_country}
      </Text>
      <Text className="text-base text-teal-600 font-semibold mb-3">
        {job.job_salary || ""}
      </Text>
      <View className="flex-row flex-wrap justify-center gap-2 mt-2">
        {job.job_tags &&
          job.job_tags.map((tag) => (
            <View key={tag} className="bg-blue-100 rounded-md px-3 py-1 m-1">
              <Text className="text-xs text-blue-700 font-medium">{tag}</Text>
            </View>
          ))}
      </View>
    </Animated.View>
  );
};

export default JobCard;
