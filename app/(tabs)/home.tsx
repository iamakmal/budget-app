import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import {
  useCalculateBankBalance,
  useCalculateCashBalance,
  useGetTransactions,
} from "@/utils/database/dbUtils";
import { initDatabase } from "@/utils/database/dbConfig";
import StatusCard from "@/components/StatusCard";

const home = () => {
  useEffect(() => {
    initDatabase();
  }, []);

  const { data: transactions } = useGetTransactions();

  const { data: cashBalance } = useCalculateCashBalance();

  const { data: bankBalance } = useCalculateBankBalance();

  return (
    <>
      <View className="flex flex-row justify-center gap-5 mt-5 mb-10">
        <StatusCard
          iconName="cash-outline"
          iconColor="red"
          bgColor="bg-[#FFCBD5]"
          name="Cash In Hand"
          value={cashBalance as number}
          containerStyles="items-center"
        />
        <StatusCard
          iconName="business-outline"
          iconColor="blue"
          bgColor="bg-[#DEE4FE]"
          name="Cash In Bank"
          value={bankBalance as number}
        />
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id?.toString() || ""}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.type}: {item.amount}
            </Text>
            <Text>
              {item.category} - {item.description}
            </Text>
            <Text>
              {item.date} ({item.account})
            </Text>
          </View>
        )}
      />
    </>
  );
};

export default home;
