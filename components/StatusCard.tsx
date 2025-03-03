import { View, Text } from "react-native";
import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";

interface StatusCardProps {
  iconName: keyof typeof Icon.glyphMap;
  iconColor: string;
  bgColor: string;
  name: string;
  value: number | string;
  textStyles?: string;
  containerStyles?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  iconName,
  iconColor,
  bgColor,
  name,
  value,
  textStyles,
  containerStyles,
}) => {
  return (
    <View
      className={`flex flex-row gap-5 ${bgColor} rounded-3xl w-64 p-5 justify-center items-start ${containerStyles}`}
    >
      <View className="flex">
        <Icon name={iconName} size={48} color={iconColor} />
      </View>
      <View className="flex flex-col">
        <Text className="text-2xl">{name}</Text>
        <Text className={`text-2xl font-bold ${textStyles}`}>
          <Text className="text-base font-semibold">Rs.</Text>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default StatusCard;
