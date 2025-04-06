import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  useCalculateBankBalance,
  useCalculateCashBalance,
  useGetTransactions,
} from "@/utils/database/dbUtils";
import StatusCard from "@/components/StatusCard";
import TransactionsCard from "@/components/TransactionsCard";

const home = () => {
  const { data: transactions, isPending } = useGetTransactions();

  const { data: cashBalance } = useCalculateCashBalance();

  const { data: bankBalance } = useCalculateBankBalance();

  console.log(transactions);

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, padding: 20, backgroundColor: "#ffffff" }}
      >
        <View className="flex flex-row justify-center gap-5 mt-5 mb-10 p-2">
          <StatusCard
            iconName="cash-outline"
            iconColor="red"
            bgColor="bg-red-100"
            name="Cash In Hand"
            value={cashBalance as number}
            containerStyles="items-center"
          />
          <StatusCard
            iconName="business-outline"
            iconColor="blue"
            bgColor="bg-lime-100"
            name="Cash In Bank"
            value={bankBalance as number}
          />
        </View>
        <Text className="text-2xl font-bold mb-5">All Transactions</Text>
        {isPending ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : transactions && transactions?.length > 0 ? (
          <FlatList
            data={transactions || []}
            keyExtractor={(item) => item.id?.toString() || ""}
            renderItem={({ item }) => (
              <TransactionsCard
                id={item.id as number}
                type={item.type}
                account={item.account}
                category={item.category}
                description={item.description ?? ""}
                amount={item.amount}
                date={item.date}
              />
            )}
          />
        ) : (
          <Text className="text-center text-gray-500 text-lg">
            No transactions found.
          </Text>
        )}
      </SafeAreaView>
    </>
  );
};

export default home;
