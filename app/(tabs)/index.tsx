import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {
  LineChart,
  PieChart,
} from 'react-native-chart-kit';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock farmer data
const farmerData = {
  id: 'F001',
  name: 'Ahmed Benali',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  phone: '+213 555 123 456',
  location: 'Blida, Boufarik',
  joinDate: '2024-01-15',
  totalPonds: 8,
  activePonds: 7,
  inactivePonds: 1,
  totalVolume: 4500,
  totalFish: 9847,
  averageProductivity: 87,
  lastLogin: '2 hours ago',
  notifications: 3,
  alerts: 2,
};

// Mock ponds data
const pondsData = [
  {
    id: 'P001',
    name: 'Pond Alpha',
    status: 'healthy',
    temperature: 24.5,
    fishCount: 1247,
    productivity: 95,
    alerts: 0,
  },
  {
    id: 'P002',
    name: 'Pond Beta',
    status: 'warning',
    temperature: 26.8,
    fishCount: 1156,
    productivity: 78,
    alerts: 2,
  },
  {
    id: 'P003',
    name: 'Pond Gamma',
    status: 'critical',
    temperature: 28.2,
    fishCount: 1089,
    productivity: 62,
    alerts: 4,
  },
  {
    id: 'P004',
    name: 'Pond Delta',
    status: 'healthy',
    temperature: 23.8,
    fishCount: 1298,
    productivity: 92,
    alerts: 0,
  },
  {
    id: 'P005',
    name: 'Pond Echo',
    status: 'warning',
    temperature: 25.2,
    fishCount: 1178,
    productivity: 85,
    alerts: 1,
  },
  {
    id: 'P006',
    name: 'Pond Foxtrot',
    status: 'healthy',
    temperature: 24.1,
    fishCount: 1234,
    productivity: 88,
    alerts: 0,
  },
  {
    id: 'P007',
    name: 'Pond Golf',
    status: 'healthy',
    temperature: 24.3,
    fishCount: 1267,
    productivity: 90,
    alerts: 0,
  },
  {
    id: 'P008',
    name: 'Pond Hotel',
    status: 'inactive',
    temperature: 22.1,
    fishCount: 0,
    productivity: 0,
    alerts: 1,
  },
];

const recentAlerts = [
  {
    id: 'A001',
    pondName: 'Pond Gamma',
    type: 'High Temperature',
    severity: 'critical',
    time: '5 minutes ago',
  },
  {
    id: 'A002',
    pondName: 'Pond Beta',
    type: 'Low Oxygen',
    severity: 'warning',
    time: '1 hour ago',
  },
];

const FarmerHomeApp = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'healthy': return '#10B981';
      case 'inactive': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'critical': return '#FEF2F2';
      case 'warning': return '#FFFBEB';
      case 'healthy': return '#F0FDF4';
      case 'inactive': return '#F9FAFB';
      default: return '#F9FAFB';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'critical': return '🔴';
      case 'warning': return '🟡';
      case 'healthy': return '🟢';
      case 'inactive': return '⚪';
      default: return '⚪';
    }
  };

  const FarmerProfileCard = () => (
    <View style={styles.farmerCard}>
      <View style={styles.farmerCardHeader}>
        <View style={styles.farmerInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: farmerData.avatar }}
              style={styles.avatar}
              defaultSource={require('@/assets/images/group1171274913.jpg')} // Add a default avatar
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.farmerDetails}>
            <Text style={styles.farmerName}>{farmerData.name}</Text>
            <Text style={styles.farmerLocation}>📍 {farmerData.location}</Text>
            <Text style={styles.lastSeen}>🕐 Active {farmerData.lastLogin}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
          {farmerData.notifications > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{farmerData.notifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.farmerStats}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>🏊</Text>
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{farmerData.totalPonds}</Text>
            <Text style={styles.statLabel}>Total Ponds</Text>
          </View>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>🐟</Text>
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{farmerData.totalFish.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Fish</Text>
          </View>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>📊</Text>
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{farmerData.averageProductivity}%</Text>
            <Text style={styles.statLabel}>Avg Performance</Text>
          </View>
        </View>
      </View>

      <View style={styles.pondsStatusRow}>
        <View style={styles.pondStatusItem}>
          <View style={[styles.pondStatusDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.pondStatusText}>{farmerData.activePonds} Active</Text>
        </View>
        <View style={styles.pondStatusItem}>
          <View style={[styles.pondStatusDot, { backgroundColor: '#6B7280' }]} />
          <Text style={styles.pondStatusText}>{farmerData.inactivePonds} Inactive</Text>
        </View>
        {farmerData.alerts > 0 && (
          <View style={styles.pondStatusItem}>
            <View style={[styles.pondStatusDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.pondStatusText}>{farmerData.alerts} Alerts</Text>
          </View>
        )}
      </View>
    </View>
  );

  const QuickStatsCard = () => (
    <View style={styles.quickStatsCard}>
      <Text style={styles.cardTitle}>📈 Quick Overview</Text>
      <View style={styles.quickStatsGrid}>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{farmerData.totalVolume.toLocaleString()}</Text>
          <Text style={styles.quickStatLabel}>m³ Total Volume</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{pondsData.filter(p => p.status === 'healthy').length}</Text>
          <Text style={styles.quickStatLabel}>Healthy Ponds</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{pondsData.filter(p => p.alerts > 0).length}</Text>
          <Text style={styles.quickStatLabel}>Need Attention</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{Math.round(pondsData.reduce((sum, p) => sum + p.productivity, 0) / pondsData.length)}%</Text>
          <Text style={styles.quickStatLabel}>Avg Productivity</Text>
        </View>
      </View>
    </View>
  );

  const PondCard = ({ pond }) => (
    <TouchableOpacity style={styles.pondCard}>
      <View style={styles.pondCardHeader}>
        <View style={styles.pondNameRow}>
          <Text style={styles.pondIcon}></Text>
          <Text style={styles.pondName}>{pond.name}</Text>
        </View>
        <View style={[styles.pondStatusBadge, { backgroundColor: getStatusBgColor(pond.status) }]}>
          <Text style={styles.pondStatusEmoji}>{getStatusEmoji(pond.status)}</Text>
        </View>
      </View>

      <View style={styles.pondMetrics}>
        <View style={styles.pondMetric}>
          <Text style={styles.pondMetricIcon}>🌡️</Text>
          <Text style={styles.pondMetricValue}>{pond.temperature}°C</Text>
        </View>
        <View style={styles.pondMetric}>
          <Text style={styles.pondMetricIcon}>🐟</Text>
          <Text style={styles.pondMetricValue}>{pond.fishCount.toLocaleString()}</Text>
        </View>
        <View style={styles.pondMetric}>
          <Text style={styles.pondMetricIcon}>📊</Text>
          <Text style={styles.pondMetricValue}>{pond.productivity}%</Text>
        </View>
      </View>

      {pond.alerts > 0 && (
        <View style={styles.pondAlerts}>
          <Text style={styles.pondAlertsText}>⚠️ {pond.alerts} alert{pond.alerts > 1 ? 's' : ''}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const RecentAlertsCard = () => (
    <View style={styles.alertsCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>🚨 Recent Alerts</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      {recentAlerts.map(alert => (
        <View key={alert.id} style={styles.alertItem}>
          <View style={styles.alertIcon}>
            <Text>{alert.severity === 'critical' ? '🔴' : '🟡'}</Text>
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>{alert.type}</Text>
            <Text style={styles.alertPond}>{alert.pondName}</Text>
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
          <TouchableOpacity style={styles.alertAction}>
            <Text style={styles.alertActionText}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const QuickActionsCard = () => (
    <View style={styles.quickActionsCard}>
      <Text style={styles.cardTitle}>⚡ Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>📊</Text>
          <Text style={styles.quickActionText}>View Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>🍽️</Text>
          <Text style={styles.quickActionText}>Record Feeding</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>📹</Text>
          <Text style={styles.quickActionText}>Live Cameras</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>⚙️</Text>
          <Text style={styles.quickActionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good Morning! 👋</Text>
            <Text style={styles.headerSubtitle}>Here's your pond overview</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{ uri: farmerData.avatar }}
              style={styles.headerAvatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Farmer Profile Card */}
        <FarmerProfileCard />

        {/* Quick Stats */}
        <QuickStatsCard />

        {/* Recent Alerts */}
        <RecentAlertsCard />

        {/* My Ponds Section */}
        <View style={styles.pondsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Ponds ({farmerData.totalPonds})</Text>
            <Link href="(tabs)/ponds">
  <Text style={styles.viewAllText}>View All</Text>
</Link>
          </View>
          <FlatList
            data={pondsData}
            renderItem={({ item }) => <PondCard pond={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.pondsRow}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        {/* <QuickActionsCard /> */}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerAvatar: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Farmer Profile Card Styles
  farmerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  farmerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  farmerDetails: {
    flex: 1,
  },
  farmerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  farmerLocation: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  lastSeen: {
    fontSize: 12,
    color: '#10B981',
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 18,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  farmerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statIcon: {
    fontSize: 16,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 12,
  },
  pondsStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  pondStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pondStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  pondStatusText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },

  // Quick Stats Card
  quickStatsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickStatItem: {
    flex: 1,
    minWidth: (screenWidth - 84) / 2,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },

  // Alerts Card
  alertsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  alertPond: {
    fontSize: 12,
    color: '#3B82F6',
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 11,
    color: '#64748B',
  },
  alertAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#EBF4FF',
  },
  alertActionText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },

  // Ponds Section
  pondsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  pondsRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pondCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: (screenWidth - 52) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pondCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pondNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pondIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  pondName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  pondStatusBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pondStatusEmoji: {
    fontSize: 12,
  },
  pondMetrics: {
    gap: 8,
  },
  pondMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pondMetricIcon: {
    fontSize: 12,
    marginRight: 6,
    width: 16,
  },
  pondMetricValue: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  pondAlerts: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  pondAlertsText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600',
  },

  // Quick Actions Card
  quickActionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    minWidth: (screenWidth - 84) / 2,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
  },

  bottomSpacing: {
    height: 20,
  },
});

export default FarmerHomeApp;