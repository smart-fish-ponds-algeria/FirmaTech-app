import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const FeedingTab = () => {
  const handleFeedNow = () => {
    alert('Manual feeding started!');
  };

  return (
    <View>
      <Text className='text-xl font-bold text-center mb-4'>Feeding Schedule</Text>
      <Text className='text-center mb-2'>🟢 Last Feeding: 8:00 AM</Text>
      <Text className='text-center mb-2'>🟢 Next Scheduled Feeding: 4:00 PM</Text>
      <Text className='text-center mb-2'>🟢 Daily Feed Quantity: 4.5 kg</Text>

      <TouchableOpacity
        onPress={handleFeedNow}
        className='bg-blue-500 mt-6 py-3 mx-8 rounded-xl'
      >
        <Text className='text-white font-bold text-center'>Feed Now (Manual)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedingTab;
