import React, { useState, useEffect } from 'react';
import SystemStatusCard from '@/components/screens/tabs/SystemStatusCard'
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  RefreshControl,
  Dimensions,
  Alert,
  Animated
} from 'react-native';
import { pondData } from '@/data/pondData';
import ParameterCard from '@/components/ParameterCard';

const { width: screenWidth } = Dimensions.get('window');

const displayedParameters = ['temperature', 'ph', 'oxygen', 'fishCount'];

// Additional parameters for extended view
const additionalParameters = ['ammonia', 'turbidity', 'salinity', 'nitrates'];

const RealTimeTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [showAllParameters, setShowAllParameters] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('online');
  const [alertsCount, setAlertsCount] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Count active alerts
    const activeAlerts = displayedParameters.filter(key => {
      const param = pondData.parameters[key];
      return param && (param.status === 'critical' || param.status === 'warning');
    }).length;
    setAlertsCount(activeAlerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Add subtle animation for live updates
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.7, duration: 200, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true })
      ]).start();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
      Alert.alert('Updated', 'Pond data has been refreshed');
    }, 2000);
  };

  const getOverallStatus = () => {
    const criticalCount = displayedParameters.filter(key => {
      const param = pondData.parameters[key];
      return param && param.status === 'critical';
    }).length;

    const warningCount = displayedParameters.filter(key => {
      const param = pondData.parameters[key];
      return param && param.status === 'warning';
    }).length;

    if (criticalCount > 0) return { status: 'critical', color: '#EF4444', emoji: '🔴' };
    if (warningCount > 0) return { status: 'warning', color: '#F59E0B', emoji: '🟡' };
    return { status: 'healthy', color: '#10B981', emoji: '🟢' };
  };

  const overallStatus = getOverallStatus();

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleEmergencyAction = () => {
    Alert.alert(
      'Emergency Actions',
      'Choose an emergency action:',
      [
        { text: 'Call Supervisor', onPress: () => console.log('Calling supervisor') },
        { text: 'Activate Aerators', onPress: () => console.log('Activating aerators') },
        { text: 'Send Alert to Team', onPress: () => console.log('Sending team alert') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  

  const QuickActionsCard = () => (
    <View style={styles.quickActionsCard}>
      <Text style={styles.quickActionsTitle}>⚡ Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>📊</Text>
          <Text style={styles.quickActionText}>View Trends</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>📹</Text>
          <Text style={styles.quickActionText}>Live Camera</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>🍽️</Text>
          <Text style={styles.quickActionText}>Record Feed</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickActionButton, alertsCount > 0 && styles.emergencyButton]}
          onPress={handleEmergencyAction}
        >
          <Text style={styles.quickActionIcon}>🚨</Text>
          <Text style={styles.quickActionText}>Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ThresholdSettingsCard = () => (
    <View style={styles.thresholdCard}>
      <Text style={styles.thresholdTitle}>⚙️ Threshold Settings</Text>
      <View style={styles.thresholdGrid}>
        <View style={styles.thresholdItem}>
          <Text style={styles.thresholdLabel}>Temperature:</Text>
          <Text style={styles.thresholdValue}>22°C - 26°C</Text>
        </View>
        <View style={styles.thresholdItem}>
          <Text style={styles.thresholdLabel}>pH Level:</Text>
          <Text style={styles.thresholdValue}>7.0 - 8.5</Text>
        </View>
        <View style={styles.thresholdItem}>
          <Text style={styles.thresholdLabel}>Oxygen:</Text>
          <Text style={styles.thresholdValue}>≥ 7.5 mg/L</Text>
        </View>
        <View style={styles.thresholdItem}>
          <Text style={styles.thresholdLabel}>Fish Density:</Text>
          <Text style={styles.thresholdValue}>≤ 3 fish/L</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editThresholdButton}>
        <Text style={styles.editThresholdText}>Edit Thresholds</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Real-Time Status</Text>
          <View style={[styles.overallStatusBadge, { backgroundColor: overallStatus.color + '20' }]}>
            <Text style={styles.overallStatusEmoji}>{overallStatus.emoji}</Text>
            <Text style={[styles.overallStatusText, { color: overallStatus.color }]}>
              {overallStatus.status.toUpperCase()}
            </Text>
          </View>
        </View>
        
        <Text style={styles.pondId}>Pond {pondData.id} - North Section</Text>
        
        <View style={styles.headerBottom}>
          <View style={styles.updateInfo}>
            <Text style={styles.updateIcon}>🕐</Text>
            <Text style={styles.updateText}>Last updated: {formatTime(lastUpdated)}</Text>
          </View>
          
          {alertsCount > 0 && (
            <View style={styles.alertsIndicator}>
              <Text style={styles.alertsText}>⚠️ {alertsCount} Alert{alertsCount > 1 ? 's' : ''}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Live Data Indicator */}
      <Animated.View style={[styles.liveIndicator, { opacity: fadeAnim }]}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>LIVE DATA</Text>
      </Animated.View>

      {/* Main Parameters */}
      <View style={styles.parametersSection}>
        <Text style={styles.sectionTitle}>📊 Key Parameters</Text>
        <View  className='grid-flow-row col-span-3 '>
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
                style={styles.parameterCard}
              />
            );
          })}
        </View>
      </View>

     

      {/* System Status */}
      <SystemStatusCard/>

      {/* Threshold Settings */}
      <ThresholdSettingsCard />

      {/* Quick Actions */}

      {/* Environmental Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>🌊 Environmental Summary</Text>
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Water Quality:</Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>Excellent</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Fish Health:</Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>98.5% Healthy</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Feeding Efficiency:</Text>
            <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>87%</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Growth Rate:</Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>+2.3% Weekly</Text>
          </View>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  overallStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  overallStatusEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  overallStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  pondId: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  updateText: {
    fontSize: 12,
    color: '#64748B',
  },
  alertsIndicator: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alertsText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  liveText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  parametersSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  parametersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  parameterCard: {
    width: (screenWidth - 52) / 2,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginRight: 8,
  },
  toggleIcon: {
    fontSize: 12,
    color: '#3B82F6',
  },
  additionalParametersSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  systemStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  systemStatusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  connectionIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  connectionText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  systemStatusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  systemStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (screenWidth - 72) / 2,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
  },
  systemStatusIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  systemStatusLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  systemStatusValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  quickActionsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    width: (screenWidth - 72) / 2,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emergencyButton: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  quickActionIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  thresholdCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thresholdTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  thresholdGrid: {
    gap: 8,
    marginBottom: 16,
  },
  thresholdItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  thresholdLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  thresholdValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  editThresholdButton: {
    backgroundColor: '#EBF4FF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editThresholdText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  summaryContent: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default RealTimeTab;