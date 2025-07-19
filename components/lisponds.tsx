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
  TextInput,
  FlatList,
  Alert,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock ponds data
const pondsData = [
  {
    id: 'P001',
    name: 'Pond Alpha',
    location: 'North Section A',
    status: 'healthy',
    temperature: 24.5,
    ph: 7.2,
    oxygen: 8.5,
    fishCount: 1247,
    volume: 500,
    type: 'Tilapia',
    productivity: 95,
    alerts: 0,
    lastInspection: '2025-07-18',
    createdAt: '2025-01-15',
    responsible: 'Ahmed Benali',
    feedingSchedule: 'Every 6 hours',
    waterQuality: 'Excellent',
    biomass: 425,
    averageWeight: 341,
    growthRate: 2.3,
  },
  {
    id: 'P002',
    name: 'Pond Beta',
    location: 'North Section B',
    status: 'warning',
    temperature: 26.8,
    ph: 6.8,
    oxygen: 7.2,
    fishCount: 1156,
    volume: 500,
    type: 'Tilapia',
    productivity: 78,
    alerts: 2,
    lastInspection: '2025-07-17',
    createdAt: '2025-01-20',
    responsible: 'Ahmed Benali',
    feedingSchedule: 'Every 8 hours',
    waterQuality: 'Good',
    biomass: 389,
    averageWeight: 337,
    growthRate: 1.8,
  },
  {
    id: 'P003',
    name: 'Pond Gamma',
    location: 'East Section A',
    status: 'critical',
    temperature: 28.2,
    ph: 6.2,
    oxygen: 5.8,
    fishCount: 1089,
    volume: 500,
    type: 'Carp',
    productivity: 62,
    alerts: 4,
    lastInspection: '2025-07-16',
    createdAt: '2025-02-01',
    responsible: 'Ahmed Benali',
    feedingSchedule: 'Every 4 hours',
    waterQuality: 'Poor',
    biomass: 298,
    averageWeight: 274,
    growthRate: 0.9,
  },
  {
    id: 'P004',
    name: 'Pond Delta',
    location: 'West Section A',
    status: 'healthy',
    temperature: 23.8,
    ph: 7.4,
    oxygen: 8.8,
    fishCount: 1298,
    volume: 500,
    type: 'Tilapia',
    productivity: 92,
    alerts: 0,
    lastInspection: '2025-07-18',
    createdAt: '2025-01-25',
    responsible: 'Souhaib Beanbdallah',
    feedingSchedule: 'Every 6 hours',
    waterQuality: 'Excellent',
    biomass: 456,
    averageWeight: 351,
    growthRate: 2.5,
  },
  {
    id: 'P005',
    name: 'Pond Echo',
    location: 'West Section B',
    status: 'warning',
    temperature: 25.2,
    ph: 7.0,
    oxygen: 7.5,
    fishCount: 1178,
    volume: 500,
    type: 'Carp',
    productivity: 85,
    alerts: 1,
    lastInspection: '2025-07-17',
    createdAt: '2025-02-10',
    responsible: 'Souhaib Beanbdallah',
    feedingSchedule: 'Every 6 hours',
    waterQuality: 'Good',
    biomass: 401,
    averageWeight: 340,
    growthRate: 2.1,
  },
  {
    id: 'P006',
    name: 'Pond Foxtrot',
    location: 'South Section A',
    status: 'healthy',
    temperature: 24.1,
    ph: 7.3,
    oxygen: 8.2,
    fishCount: 1234,
    volume: 500,
    type: 'Tilapia',
    productivity: 88,
    alerts: 0,
    lastInspection: '2025-07-18',
    createdAt: '2025-02-15',
    responsible: 'Souhaib Beanbdallah',
    feedingSchedule: 'Every 6 hours',
    waterQuality: 'Excellent',
    biomass: 432,
    averageWeight: 350,
    growthRate: 2.2,
  },
  {
    id: 'P007',
    name: 'Pond Golf',
    location: 'South Section B',
    status: 'healthy',
    temperature: 24.3,
    ph: 7.1,
    oxygen: 8.4,
    fishCount: 1267,
    volume: 500,
    type: 'Carp',
    productivity: 90,
    alerts: 0,
    lastInspection: '2025-07-17',
    createdAt: '2025-03-01',
    responsible: 'Souhaib Beanbdallah',
    feedingSchedule: 'Every 6 hours',
    waterQuality: 'Excellent',
    biomass: 445,
    averageWeight: 351,
    growthRate: 2.4,
  },
  {
    id: 'P008',
    name: 'Pond Hotel',
    location: 'Central Section A',
    status: 'healthy',
    temperature: 23.9,
    ph: 7.5,
    oxygen: 8.6,
    fishCount: 1345,
    volume: 500,
    type: 'Tilapia',
    productivity: 94,
    alerts: 0,
    lastInspection: '2025-07-18',
    createdAt: '2025-03-10',
    responsible: 'Souhaib Beanbdallah',
    feedingSchedule: 'Every 6 hours',
    waterQuality: 'Excellent',
    biomass: 478,
    averageWeight: 355,
    growthRate: 2.6,
  },
  {
    id: 'P009',
    name: 'Pond India',
    location: 'Central Section B',
    status: 'healthy',
    temperature: 24.0,
    ph: 7.2,
    oxygen: 8.3,
    fishCount: 1456,
    volume: 566,
    type: 'Mixed',
    productivity: 91,
    alerts: 0,
    lastInspection: '2025-07-17',
    createdAt: '2025-03-15',
    responsible: 'Ahmed Benali',
    feedingSchedule: 'Every 6 hours',
    waterQuality: 'Excellent',
    biomass: 512,
    averageWeight: 352,
    growthRate: 2.3,
  },
  {
    id: 'P010',
    name: 'Pond Juliet',
    location: 'North Section C',
    status: 'inactive',
    temperature: 22.1,
    ph: 6.9,
    oxygen: 6.8,
    fishCount: 0,
    volume: 4545,
    type: 'Maintenance',
    productivity: 0,
    alerts: 1,
    lastInspection: '2025-07-15',
    createdAt: '2025-04-01',
    responsible: 'Souhaib Beanbdallah',
    feedingSchedule: 'N/A',
    waterQuality: 'Under Maintenance',
    biomass: 0,
    averageWeight: 0,
    growthRate: 0,
  },
];

const PondsListApp = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [filteredPonds, setFilteredPonds] = useState(pondsData);

  useEffect(() => {
    filterAndSortPonds();
  }, [searchQuery, filterStatus, sortBy]);

  const filterAndSortPonds = () => {
    let filtered = pondsData.filter(pond => {
      const matchesSearch = pond.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pond.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pond.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || pond.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    // Sort ponds
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'productivity':
          return b.productivity - a.productivity;
        case 'alerts':
          return b.alerts - a.alerts;
        default:
          return 0;
      }
    });

    setFilteredPonds(filtered);
  };

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

  const getWaterQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent': return '#10B981';
      case 'Good': return '#F59E0B';
      case 'Poor': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handlePondPress = (pond) => {
    Alert.alert(
      'Pond Details',
      `Navigate to ${pond.name} details page?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'View Details', onPress: () => console.log(`Navigate to pond ${pond.id}`) },
      ]
    );
  };

  const handleQuickAction = (action, pond) => {
    switch (action) {
      case 'camera':
        Alert.alert('Live Camera', `Opening live camera for ${pond.name}`);
        break;
      case 'feed':
        Alert.alert('Record Feeding', `Record feeding for ${pond.name}`);
        break;
      case 'alerts':
        Alert.alert('View Alerts', `Viewing alerts for ${pond.name}`);
        break;
      default:
        break;
    }
  };

  const PondCard = ({ pond }) => (
    <TouchableOpacity 
      style={styles.pondCard}
      onPress={() => handlePondPress(pond)}
      activeOpacity={0.7}
    >
      {/* Header Section */}
      <View style={styles.pondHeader}>
        <View style={styles.pondTitleSection}>
          <View style={styles.pondNameRow}>
            <Text style={styles.pondIcon}></Text>
            <Text style={styles.pondName}>{pond.name}</Text>
          </View>
          <Text style={styles.pondLocation}>📍 {pond.location}</Text>
        </View>
        
        <View style={styles.pondStatusSection}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(pond.status) }]}>
            <Text style={styles.statusEmoji}>{getStatusEmoji(pond.status)}</Text>
            <Text style={[styles.statusText, { color: getStatusColor(pond.status) }]}>
              {pond.status.charAt(0).toUpperCase() + pond.status.slice(1)}
            </Text>
          </View>
          {pond.alerts > 0 && (
            <View style={styles.alertsBadge}>
              <Text style={styles.alertsText}>⚠️ {pond.alerts}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Key Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricIcon}>🌡️</Text>
          <View style={styles.metricContent}>
            <Text style={styles.metricValue}>{pond.temperature}°C</Text>
            <Text style={styles.metricLabel}>Temperature</Text>
          </View>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={styles.metricIcon}>💧</Text>
          <View style={styles.metricContent}>
            <Text style={styles.metricValue}>pH {pond.ph}</Text>
            <Text style={styles.metricLabel}>pH Level</Text>
          </View>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={styles.metricIcon}>💨</Text>
          <View style={styles.metricContent}>
            <Text style={styles.metricValue}>{pond.oxygen}</Text>
            <Text style={styles.metricLabel}>O₂ mg/L</Text>
          </View>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={styles.metricIcon}>🐟</Text>
          <View style={styles.metricContent}>
            <Text style={styles.metricValue}>{pond.fishCount.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Fish Count</Text>
          </View>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Volume:</Text>
            <Text style={styles.detailValue}>{pond.volume.toLocaleString()} m³</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{pond.type}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Productivity:</Text>
            <Text style={[styles.detailValue, { color: pond.productivity >= 85 ? '#10B981' : pond.productivity >= 70 ? '#F59E0B' : '#EF4444' }]}>
              {pond.productivity}%
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Water Quality:</Text>
            <Text style={[styles.detailValue, { color: getWaterQualityColor(pond.waterQuality) }]}>
              {pond.waterQuality}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Biomass:</Text>
            <Text style={styles.detailValue}>{pond.biomass} kg</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Growth Rate:</Text>
            <Text style={styles.detailValue}>{pond.growthRate}% weekly</Text>
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.pondFooter}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>🕐 Last inspection: {new Date(pond.lastInspection).toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.actionButtons}>
      
          
          {pond.alerts > 0 && (
            <TouchableOpacity 
              style={[styles.quickActionButton, styles.alertActionButton]}
              onPress={() => handleQuickAction('alerts', pond)}
            >
              <Text style={styles.quickActionIcon}>⚠️</Text>
            </TouchableOpacity>
          )}
          
          <Link href="(tabs)/pond/3"
            style={styles.detailsButton}
          >

            <Text style={styles.arrowIcon}>Details →</Text>
            </Link>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ title, value, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.activeFilterButton]}
      onPress={onPress}
    >
      <Text style={[styles.filterButtonText, isActive && styles.activeFilterButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}> My Ponds</Text>
          <Text style={styles.headerSubtitle}>{filteredPonds.length} ponds found</Text>
        </View>
       
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ponds, location, or type..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <FilterButton
            title="All"
            value="all"
            isActive={filterStatus === 'all'}
            onPress={() => setFilterStatus('all')}
          />
          <FilterButton
            title="Healthy"
            value="healthy"
            isActive={filterStatus === 'healthy'}
            onPress={() => setFilterStatus('healthy')}
          />
          <FilterButton
            title="Warning"
            value="warning"
            isActive={filterStatus === 'warning'}
            onPress={() => setFilterStatus('warning')}
          />
          <FilterButton
            title="Critical"
            value="critical"
            isActive={filterStatus === 'critical'}
            onPress={() => setFilterStatus('critical')}
          />
          <FilterButton
            title="Inactive"
            value="inactive"
            isActive={filterStatus === 'inactive'}
            onPress={() => setFilterStatus('inactive')}
          />
        </ScrollView>
        
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort: {sortBy}</Text>
          <Text style={styles.sortIcon}>⇅</Text>
        </TouchableOpacity>
      </View>

      {/* Ponds List */}
      <FlatList
        data={filteredPonds}
        renderItem={({ item }) => <PondCard pond={item} />}
        keyExtractor={item => item.id}
        style={styles.pondsList}
        contentContainerStyle={styles.pondsListContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}></Text>
            <Text style={styles.emptyStateTitle}>No ponds found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search or filters</Text>
            <TouchableOpacity 
              style={styles.clearFiltersButton}
              onPress={() => {
                setSearchQuery('');
                setFilterStatus('all');
              }}
            >
              <Text style={styles.clearFiltersButtonText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  clearIcon: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersScroll: {
    flex: 1,
    paddingLeft: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#3B82F6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#ffffff',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 20,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 4,
  },
  sortIcon: {
    fontSize: 14,
    color: '#64748B',
  },
  pondsList: {
    flex: 1,
  },
  pondsListContent: {
    padding: 20,
  },
  pondCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pondHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  pondTitleSection: {
    flex: 1,
  },
  pondNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pondIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  pondName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  pondLocation: {
    fontSize: 14,
    color: '#64748B',
  },
  pondStatusSection: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 4,
  },
  statusEmoji: {
    fontSize: 12,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  alertsBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alertsText: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  metricContent: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  pondFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerInfo: {
    flex: 1,
  },
  footerText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertActionButton: {
    backgroundColor: '#FEF2F2',
  },
  quickActionIcon: {
    fontSize: 14,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  arrowIcon: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  clearFiltersButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearFiltersButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PondsListApp;