import React from 'react';
import { View, Text } from 'react-native';
import { getStatusColor } from '../utils/statusColors';
import { parameterCardStyles as styles } from '../styles/parameterCardStyles';

const ParameterCard = ({ title, value, unit, status, threshold, icon }) => (
  <View style={[styles.parameterCard, { borderLeftColor: getStatusColor(status) }]}>
    <View style={styles.parameterHeader}>
      <Text style={styles.parameterIcon}>{icon}</Text>
      <Text style={styles.parameterTitle}>{title}</Text>
    </View>
    <Text className='text-4xl font-bold'>{value}{unit}</Text>
  </View>
);

export default ParameterCard;
