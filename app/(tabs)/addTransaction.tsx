import { SafeAreaView, View, StyleSheet, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { useAddTransaction } from "@/utils/database/dbUtils";

const AddTransaction = () => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");
  const [focusedField, setFocusedField] = useState<null | string>(null);

  const { mutate } = useAddTransaction();

  const handleSubmit = () => {
    const date = new Date().toISOString();
    console.log(type, amount, category, description, date, account);
    mutate({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
      account,
    });
    setType("");
    setAmount("");
    setCategory("");
    setDescription("");
    setAccount("");
  };

  const categories = [
    { label: "🍔 Food", value: "🍔 Food" },
    { label: "🚌 Transport", value: "🚌 Transport" },
    { label: "🎮 Entertainment", value: "🎮 Entertainment" },
    { label: "⚡ Utilities", value: "⚡ Utilities" },
    { label: "💊 Health", value: "💊 Health" },
    { label: "📚 Education", value: "📚 Education" },
    { label: "🛒 Shopping", value: "🛒 Shopping" },
    { label: "🎁 Other", value: "🎁 Other" },
  ];

  const renderPicker = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    items: { label: string; value: string }[],
    fieldKey: string
  ) => (
    <View
      style={[
        styles.pickerContainer,
        focusedField === fieldKey ? styles.focusedBorder : styles.defaultBorder,
      ]}
    >
      <Picker
        selectedValue={value}
        onValueChange={(val) => onChange(val)}
        onFocus={() => setFocusedField(fieldKey)}
        onBlur={() => setFocusedField(null)}
        style={styles.picker}
      >
        <Picker.Item label={label} value="" enabled={false} />
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#ffffff" }}>
      <ScrollView>
        {renderPicker(
          "Select a type...",
          type,
          (val) => setType(val as "income" | "expense"),
          [
            { label: "Income", value: "income" },
            { label: "Expense", value: "expense" },
          ],
          "type"
        )}
        <CustomInputField
          placeholder="Amount"
          value={amount}
          handleChangeText={setAmount}
          keyboardType="numeric"
          containerStyles="my-2"
        />
        {renderPicker(
          "Select a category...",
          category,
          setCategory,
          categories,
          "category"
        )}
        <CustomInputField
          placeholder="Description"
          value={description}
          handleChangeText={setDescription}
          containerStyles="my-2"
        />
        {renderPicker(
          "Select an account...",
          account,
          (val) => setAccount(val as "cash" | "bank"),
          [
            { label: "💶 Cash", value: "cash" },
            { label: "🏦 Bank", value: "bank" },
          ],
          "account"
        )}
        <CustomButton
          label="Add Transaction"
          onPress={handleSubmit}
          textStyles="text-white"
          isDisabled={!type || !amount || !category || !description || !account}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 64,
    justifyContent: "center",
    marginVertical: 8,
  },
  picker: {
    fontSize: 16,
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  focusedBorder: {
    borderWidth: 2,
    borderColor: "#ff735c",
  },
});

export default AddTransaction;
