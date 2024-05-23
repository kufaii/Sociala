import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProperty } from "@/AuthProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { access_token, roleUser } = AuthProperty();

  console.log(access_token, "< ===");

  if (!access_token) {
    return <Redirect href={"/login"} />;
  }

  // if(roleUser === "Admin") {
  //   return <Redirect href={"/dashbordAdmin"} />;
  // }

  let titlePage = roleUser === "Admin" ? "Dasbord" : "Home";
  let ref = roleUser === "Admin" ? "/dashbordAdmin" : "/";
  const namePage = roleUser === "Admin" ? "/dashbordAdmin" : "/";
  console.log(titlePage, "< === Title nih");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: titlePage,
          href: ref,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="standing"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
