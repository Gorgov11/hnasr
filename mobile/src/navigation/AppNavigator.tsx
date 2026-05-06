import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import AIServicesScreen from "../screens/AIServicesScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import ContactScreen from "../screens/ContactScreen";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.6 }}>{emoji}</Text>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255,255,255,0.06)",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "800", fontSize: 16 },
          headerTitleAlign: "center",
          tabBarStyle: {
            backgroundColor: "#030508",
            borderTopColor: "rgba(255,255,255,0.06)",
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 6,
            height: 64,
          },
          tabBarActiveTintColor: COLORS.cyan,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: 2 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "DGC",
            headerTitle: "🌐 Digital Game Changers",
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            headerTitle: "Our Services",
            tabBarIcon: ({ focused }) => <TabIcon emoji="⚡" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="AIServices"
          component={AIServicesScreen}
          options={{
            headerTitle: "AI Solutions",
            tabBarLabel: "AI",
            tabBarIcon: ({ focused }) => <TabIcon emoji="🤖" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={PortfolioScreen}
          options={{
            headerTitle: "Portfolio",
            tabBarIcon: ({ focused }) => <TabIcon emoji="🎯" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            headerTitle: "Contact Us",
            tabBarIcon: ({ focused }) => <TabIcon emoji="📩" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
