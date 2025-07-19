import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SystemStatusCard = ({ connectionStatus = 'online' }) => (
  <View style={styles.card}>
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.title}>🔧 System Status</Text>
      <View
        style={[
          styles.connectionIndicator,
          { backgroundColor: connectionStatus === 'online' ? '#10B981' : '#EF4444' },
        ]}
      >
        <Text style={styles.connectionText}>{connectionStatus.toUpperCase()}</Text>
      </View>
    </View>

    {/* Status Grid */}
    <View style={styles.statusGrid}>
      <StatusItem icon="📡" label="Sensor Network" value="Online" />
      <StatusItem icon="📹" label="AI Camera" value="Active" />
      <StatusItem icon="🔄" label="Data Sync" value="Real-time" />
      <StatusItem icon="⚠️" label="Alert System" value="Operational" />
    </View>
  </View>
);

const StatusItem = ({ icon, label, value }) => (
  <View style={styles.statusItem}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={{ marginLeft: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  connectionIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  connectionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusItem: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
});

export default SystemStatusCard;
