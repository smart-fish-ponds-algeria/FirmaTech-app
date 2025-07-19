import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const FeedingTab = () => {
  const [feedAmount, setFeedAmount] = useState('');
  const [notes, setNotes] = useState('');
  const chartWidth = Math.min(Dimensions.get('window').width - 64, 768);

  const handleFeedNow = () => {
    Alert.alert('Feeding Started', 'Manual feeding has been triggered.');
  };

  const handleRecordFeeding = () => {
    Alert.alert('Recorded', `Feeding of ${feedAmount} kg has been recorded.`);
    setFeedAmount('');
    setNotes('');
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#F5F7FA' }}>

 

      {/* Feeding History (Bar Chart) */}
      <View className='mt-12' style={{ backgroundColor: '#fff', padding: 0, borderRadius: 12, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Feeding History</Text>
        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: [12, 14, 11, 15, 13, 14, 13] }]
          }}
          width={chartWidth}
          height={220}
          fromZero
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
          }}
          style={{ borderRadius: 8 }}
        />
      </View>

      {/* Feed Efficiency (Line Chart) */}
      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Feed Efficiency</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: [85, 86, 88, 89, 90, 92, 91] }]
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          yAxisSuffix="%"
          fromZero
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
          }}
          bezier
          style={{ borderRadius: 8 }}
        />
      </View>

      {/* AI Smart Feeding Suggestions */}
      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>AI Smart Feeding Suggestions</Text>
        <View style={{ backgroundColor: '#DBEAFE', padding: 12, borderRadius: 8, marginBottom: 8 }}>
          <Text style={{ fontWeight: 'bold', color: '#1D4ED8', marginBottom: 4 }}>Reduce Feeding Amount</Text>
          <Text>Reduce by 15% due to low activity (78%) and high water temp.</Text>
        </View>
        <View style={{ backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold', color: '#CA8A04', marginBottom: 4 }}>Adjust Timing</Text>
          <Text>Consider feeding earlier (5:30 AM) when water temperature is cooler.</Text>
        </View>
      </View>

      {/* Manual Feed Entry */}
      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Manual Feed Entry</Text>
        <Text style={{ marginBottom: 4 }}>Feed Amount (kg):</Text>
        <TextInput
          value={feedAmount}
          onChangeText={setFeedAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
          style={{
            borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 10, marginBottom: 12
          }}
        />
        <Text style={{ marginBottom: 4 }}>Notes (optional):</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Any notes..."
          multiline
          numberOfLines={4}
          style={{
            borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 10, marginBottom: 12, textAlignVertical: 'top'
          }}
        />
        <TouchableOpacity
          onPress={handleRecordFeeding}
          style={{ backgroundColor: '#111827', padding: 14, borderRadius: 10 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Record Feeding</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default FeedingTab;
