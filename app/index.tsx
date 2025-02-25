import { View, Text, Image } from "react-native";
import React from "react";
import Images from "@/constants/Images";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Onboarding = () => {
  return (
    <View className="flex justify-center items-center h-full">
      <Image source={Images.onboard} className="w-full h-1/2" />
      <View className="p-10">
        <Text className="text-6xl">
          Your <Text className="text-[#ff735c]">finances</Text> in one place
        </Text>
        <Text className="text-xl mt-5 text-gray-500">
          Manage your finances anywhere anytime right at your fingertips
        </Text>
      </View>
      <View className="w-full px-10">
        <CustomButton
          label="Get Started"
          onPress={() => router.push("/home")}
          textStyles="text-white"
        />
      </View>
    </View>
  );
};

export default Onboarding;
