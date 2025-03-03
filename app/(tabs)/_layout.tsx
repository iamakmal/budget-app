import { Tabs } from "expo-router";
import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addTransaction"
        options={{
          title: "Add Transaction",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "compass" : "compass-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
