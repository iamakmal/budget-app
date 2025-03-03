import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { Ionicons as Icon } from "@expo/vector-icons";

interface CustomInputFieldProps {
  value: string;
  type?: string;
  error?: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  containerStyles?: string;
  onBlur?: (e: any) => void;
  keyboardType?: KeyboardTypeOptions;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  value,
  type = "text",
  error,
  placeholder,
  handleChangeText,
  containerStyles,
  onBlur,
  keyboardType,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <View
        className={`flex-row bg-gray-100 w-full h-16 px-4 rounded-2xl justify-between items-center ${
          isFocused ? "border-2 border-primary" : "border border-gray-100"
        }`}
      >
        <TextInput
          className="text-xl"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          keyboardType={keyboardType}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={!showPassword ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      <Text className="text-lg pl-3 text-red-500">{error}</Text>
    </View>
  );
};

export default CustomInputField;
