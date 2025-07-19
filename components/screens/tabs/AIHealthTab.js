import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const AIHealthTab = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Title */}
      <Text style={styles.title}>AI Fish Health Analysis</Text>

      {/* Summary */}
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#EFF6FF' }]}>
          <Text style={styles.boxValue}>1,247</Text>
          <Text style={styles.boxLabel}>Fish Count</Text>
          <Text style={styles.boxGrowth}>+12 from yesterday</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#ECFDF5' }]}>
          <Text style={[styles.boxValue, { color: '#15803D' }]}>425 kg</Text>
          <Text style={styles.boxLabel}>Total Biomass</Text>
          <Text style={styles.boxGrowth}>+8.2% growth</Text>
        </View>
      </View>

      {/* Health Distribution */}
      <Text style={styles.sectionTitle}>Health Distribution</Text>
      <View style={styles.healthItem('#ECFDF3')}>
        <Text style={styles.healthLabel('#15803D')}>Healthy Fish</Text>
        <Text style={styles.healthPercent('#15803D')}>98.2%</Text>
      </View>
      <View style={styles.healthItem('#FFFBEB')}>
        <Text style={styles.healthLabel('#92400E')}>Abnormal Behavior</Text>
        <Text style={styles.healthPercent('#92400E')}>1.5%</Text>
      </View>
      <View style={styles.healthItem('#FEF2F2')}>
        <Text style={styles.healthLabel('#B91C1C')}>Disease Detected</Text>
        <Text style={styles.healthPercent('#B91C1C')}>0.3%</Text>
      </View>

      {/* Activity Score */}
      <Text style={styles.sectionTitle}>Activity Score</Text>
      <View style={styles.activityContainer}>
        <ProgressBar progress={0.78} color="#0EA5E9" style={styles.progressBar} />
        <Text style={styles.activityPercent}>78%</Text>
      </View>
      <Text style={styles.activityNote}>Normal activity level</Text>

      {/* AI Detection Alerts */}
      <Text style={styles.sectionTitle}>AI Detection Alerts</Text>
      <View style={styles.alertBox('#FEF3C7', '#CA8A04')}>
        <Text style={styles.alertTitle('#CA8A04')}>Abnormal Swimming Pattern</Text>
        <Text style={styles.alertDesc('#CA8A04')}>
          18 fish showing circular swimming behavior in northeast section
        </Text>
        <Text style={styles.alertTime}>Detected 2 hours ago • Monitoring</Text>
      </View>
      <View style={styles.alertBox('#FEE2E2', '#B91C1C')}>
        <Text style={styles.alertTitle('#B91C1C')}>Skin Discoloration</Text>
        <Text style={styles.alertDesc('#B91C1C')}>
          4 fish with white spots detected - possible fungal infection
        </Text>
        <Text style={styles.alertTime}>Detected 6 hours ago • Action Required</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFFFFF' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  box: { flex: 1, padding: 16, borderRadius: 12 },
  boxValue: { fontSize: 28, fontWeight: 'bold', color: '#1D4ED8' },
  boxLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 6, color: '#1E293B' },
  boxGrowth: { fontSize: 14, color: '#16A34A', marginTop: 4 },

  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#111827' },

  healthItem: (bg) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: bg,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  }),
  healthLabel: (color) => ({ fontSize: 16, fontWeight: '600', color }),
  healthPercent: (color) => ({ fontSize: 16, fontWeight: '700', color }),

  activityContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  progressBar: { flex: 1, height: 10, borderRadius: 6, backgroundColor: '#E5E7EB', marginRight: 8 },
  activityPercent: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  activityNote: { fontSize: 14, color: '#6B7280', marginBottom: 20 },

  alertBox: (bg, border) => ({
    backgroundColor: bg,
    borderColor: border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  }),
  alertTitle: (color) => ({ fontSize: 16, fontWeight: '700', color, marginBottom: 4 }),
  alertDesc: (color) => ({ fontSize: 14, fontWeight: '500', color, marginBottom: 6 }),
  alertTime: { fontSize: 12, color: '#6B7280' },
});

export default AIHealthTab;
