import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function _layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#0052FF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') iconName = 'home-outline';
          else if (route.name === 'notification') iconName = 'notifications-outline';
          else if (route.name === 'profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="notification" options={{ title: 'Notification' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
