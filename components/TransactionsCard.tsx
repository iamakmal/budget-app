import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useDeleteTransaction } from "@/utils/database/dbUtils";

interface Props {
  id: number;
  type: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  account: string;
}

const TransactionsCard = ({
  id,
  type,
  category,
  description,
  amount,
  date,
  account,
}: Props) => {
  const { mutate } = useDeleteTransaction();

  const getTypeColor = (type: string) => {
    return type === "income" ? "#10B981" : "#EF4444";
  };

  const getAccountIcon = (account: string) => {
    return account === "cash" ? "cash-outline" : "business-outline";
  };

  const getAccountBgColor = (account: string) => {
    return account === "cash" ? "#DCFCE7" : "#DBEAFE";
  };

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <View className="flex flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl shadow-md mb-4 w-full">
      <View
        style={{ backgroundColor: getAccountBgColor(account) }}
        className="rounded-full p-4"
      >
        <Icon name={getAccountIcon(account)} size={32} />
      </View>
      <View className="flex flex-1 flex-col justify-start ml-4">
        <Text className="text-xl font-semibold">{category}</Text>
        <Text className="text-base text-gray-500">{description}</Text>
      </View>
      <View className="flex flex-1 flex-col">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-bold">
            <Text className="text-base font-semibold">Rs.</Text>
            <Text style={{ color: getTypeColor(type) }}>{amount}</Text>
          </Text>
          <TouchableOpacity onPress={handleDelete} className="mb-2">
            <Icon name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text className="text-base text-gray-500">
          on {new Date(date || "").toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default TransactionsCard;
