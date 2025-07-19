import React from 'react';
import { Text, View } from 'react-native';
import { pondData } from '@/data/pondData';
import ParameterCard from '@/components/ParameterCard';

const displayedParameters = ['temperature', 'ph', 'oxygen', 'fishCount'];

const RealTimeTab = () => {
  return (
    <View>
      <Text className='text-2xl font-bold text-center mb-4'>Real-Time Status - Pond {pondData.id}</Text>
      {displayedParameters.map((key) => {
        const param = pondData.parameters[key];
        if (!param) return null;
        return (
          <ParameterCard
            key={key}
            title={param.title}
            value={param.value}
            unit={param.unit}
            status={param.status}
            threshold={param.threshold}
            icon={param.icon}
          />
        );
      })}
    </View>
  );
};

export default RealTimeTab;
