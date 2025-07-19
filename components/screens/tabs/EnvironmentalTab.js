import React from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 82, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#3b82f6"
  }
};

const EnvironmentalTab = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className='p-4'>
      <Text className='text-xl font-bold text-center mb-4'>Environmental Monitoring</Text>

      {/* Temperature Chart */}
      <Text className='text-lg font-semibold mt-6 mb-2'>Temperature (°C)</Text>
      <LineChart
        data={chartData.temperature}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
      />

      {/* pH Chart */}
      <Text className='text-lg font-semibold mt-6 mb-2'>pH Level</Text>
      <LineChart
        data={chartData.ph}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
      />

      {/* Oxygen Chart */}
      <Text className='text-lg font-semibold mt-6 mb-2'>Dissolved Oxygen (mg/L)</Text>
      <LineChart
        data={chartData.oxygen}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
      />
    </ScrollView>
  );
};

export default EnvironmentalTab;

// ✅ Chart Data
export const chartData = {
  temperature: {
    labels: ['14:50', '14:51', '14:52', '14:53', '14:54', '14:55'],
    datasets: [{ data: [26.8, 26.9, 27.0, 27.1, 27.2, 27.0] }],
  },
  ph: {
    labels: ['14:50', '14:51', '14:52', '14:53', '14:54', '14:55'],
    datasets: [{ data: [6.8, 6.7, 6.8, 6.9, 6.8, 6.9] }],
  },
  oxygen: {
    labels: ['14:50', '14:51', '14:52', '14:53', '14:54', '14:55'],
    datasets: [{ data: [7.2, 7.1, 7.0, 6.9, 7.0, 7.1] }],
  },
};
