import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      
      {/* Logo Header */}
      <View style={{
        paddingVertical: 14,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
      }}>
        <Image
          source={require('@/assets/images/group1171274913 (2).jpg')}
          style={{ width: 260, height: 40, resizeMode: 'contain' }}
        />
      </View>

      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#0052FF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            height: 58,
            paddingBottom: 8,
          },
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
        <Tabs.Screen name="notification" options={{ title: 'Notifications' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        <Tabs.Screen
          name="pond/[id]"
          options={{
            href: null, // ✅ hidden from tabs
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
