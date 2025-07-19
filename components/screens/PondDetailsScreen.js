import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, ScrollView, TouchableOpacity, View, Image, Modal } from 'react-native';
import { pondStyles as styles } from '../../styles/pondStyles';
import { Ionicons } from '@expo/vector-icons';

import RealTimeTab from './tabs/RealTimeTab';
import EnvironmentalTab from './tabs/EnvironmentalTab';
import AIHealthTab from './tabs/AIHealthTab';
import FeedingTab from './tabs/FeedingTab';

const tabs = [
  { key: 'real-time', label: 'Real-Time' },
  { key: 'environmental', label: 'Environmental' },
  { key: 'ai-health', label: 'AI Fish Health' },
  { key: 'feeding', label: 'Feeding' },
];

const PondDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('real-time');
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView className='px-4' style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View className='flex-row items-center justify-start  pl-4'>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu-outline" size={42} color="#3b82f6" />
        </TouchableOpacity>
      
      </View>

      {/* MENU */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View className='flex-1 bg-black/50 justify-center items-center'>
          <View className='bg-white p-6 rounded-2xl w-80'>
            <Text className='text-xl font-bold mb-4 text-center'>Menu</Text>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.key}
                className='py-3 rounded-xl mb-2 bg-blue-100'
                onPress={() => {
                  setActiveTab(tab.key);
                  setMenuVisible(false);
                }}
              >
                <Text className='text-center text-blue-800 font-semibold'>{tab.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className='py-2 mt-2 bg-red-100 rounded-xl'
              onPress={() => setMenuVisible(false)}
            >
              <Text className='text-center text-red-700 font-bold'>Close Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Dynamic Content */}
      <ScrollView
  style={{ flex: 1 }}
  contentContainerStyle={{
    paddingHorizontal: 16,
    paddingBottom: 24,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  }}
>        {activeTab === 'real-time' && <RealTimeTab />}
        {activeTab === 'environmental' && <EnvironmentalTab />}
        {activeTab === 'ai-health' && <AIHealthTab />}
        {activeTab === 'feeding' && <FeedingTab />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PondDetailsScreen;
