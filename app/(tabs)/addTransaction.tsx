import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { useAddTransaction } from "@/utils/database/dbUtils";

const AddTransaction = () => {
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState<"cash" | "bank">("cash");

  const { mutate } = useAddTransaction();

  const handleSubmit = () => {
    const date = new Date().toISOString();
    mutate({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
      account,
    });
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <View>
      <Picker
        selectedValue={type}
        onValueChange={(value: string) =>
          setType(value as "income" | "expense")
        }
      >
        <Picker.Item label="Income" value="income" />
        <Picker.Item label="Expense" value="expense" />
      </Picker>
      <CustomInputField
        placeholder="Amount"
        value={amount}
        handleChangeText={setAmount}
        keyboardType="numeric"
      />
      <CustomInputField
        placeholder="Category"
        value={category}
        handleChangeText={setCategory}
      />
      <CustomInputField
        placeholder="Description"
        value={description}
        handleChangeText={setDescription}
      />
      <Picker
        selectedValue={account}
        onValueChange={(value) => setAccount(value as "cash" | "bank")}
      >
        <Picker.Item label="Cash" value="cash" />
        <Picker.Item label="Bank" value="bank" />
      </Picker>
      <CustomButton label="Add Transaction" onPress={handleSubmit} />
    </View>
  );
};

export default AddTransaction;
