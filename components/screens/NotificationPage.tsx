"use client"

import { useState, useMemo } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Alert,
  Dimensions,
  Modal,
  Switch,
  TextInput,
  FlatList,
} from "react-native"
import { Picker } from "@react-native-picker/picker"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

// Mock notifications data
const notificationsData = [
  {
    id: "N001",
    title: "Critical Temperature Alert",
    message: "Pond Alpha temperature has exceeded 28°C threshold. Immediate action required.",
    type: "critical",
    category: "environmental",
    pond: "Pond Alpha",
    pondId: "P001",
    timestamp: "2025-01-21T14:53:00Z",
    read: false,
    starred: true,
    archived: false,
    actionRequired: true,
    priority: "high",
    source: "sensor",
    parameters: {
      current: "28.2°C",
      threshold: "26°C",
      parameter: "temperature",
    },
  },
  {
    id: "N002",
    title: "Low Oxygen Warning",
    message: "Oxygen levels in Pond Beta have dropped below optimal range (7.1 mg/L).",
    type: "warning",
    category: "environmental",
    pond: "Pond Beta",
    pondId: "P002",
    timestamp: "2025-01-21T14:40:00Z",
    read: false,
    starred: false,
    archived: false,
    actionRequired: true,
    priority: "medium",
    source: "sensor",
    parameters: {
      current: "7.1 mg/L",
      threshold: "7.5 mg/L",
      parameter: "oxygen",
    },
  },
  {
    id: "N003",
    title: "Feeding Schedule Reminder",
    message: "Scheduled feeding time for Pond Gamma in 15 minutes.",
    type: "info",
    category: "feeding",
    pond: "Pond Gamma",
    pondId: "P003",
    timestamp: "2025-01-21T14:15:00Z",
    read: true,
    starred: false,
    archived: false,
    actionRequired: false,
    priority: "low",
    source: "system",
    parameters: {
      feedingTime: "14:30",
      amount: "15 kg",
    },
  },
  {
    id: "N004",
    title: "AI Fish Health Alert",
    message: "Abnormal swimming behavior detected in 18 fish in Pond Delta northeast section.",
    type: "warning",
    category: "fish_health",
    pond: "Pond Delta",
    pondId: "P004",
    timestamp: "2025-01-21T12:30:00Z",
    read: true,
    starred: true,
    archived: false,
    actionRequired: true,
    priority: "medium",
    source: "ai_camera",
    parameters: {
      affectedFish: 18,
      behavior: "circular_swimming",
      location: "northeast_section",
    },
  },
  {
    id: "N005",
    title: "Daily Report Generated",
    message: "Your daily pond performance report for January 21, 2025 is ready for review.",
    type: "info",
    category: "reports",
    pond: "All Ponds",
    pondId: "all",
    timestamp: "2025-01-21T08:00:00Z",
    read: true,
    starred: false,
    archived: false,
    actionRequired: false,
    priority: "low",
    source: "system",
    parameters: {
      reportType: "daily",
      pondsCount: 10,
      overallHealth: "78%",
    },
  },
  {
    id: "N006",
    title: "pH Imbalance Resolved",
    message: "pH levels in Pond Echo have returned to normal range (7.2).",
    type: "success",
    category: "environmental",
    pond: "Pond Echo",
    pondId: "P005",
    timestamp: "2025-01-21T11:45:00Z",
    read: true,
    starred: false,
    archived: false,
    actionRequired: false,
    priority: "low",
    source: "sensor",
    parameters: {
      current: "7.2",
      previous: "6.8",
      parameter: "ph",
    },
  },
  {
    id: "N007",
    title: "Maintenance Reminder",
    message: "Scheduled maintenance for filtration system in Pond Foxtrot due tomorrow.",
    type: "info",
    category: "maintenance",
    pond: "Pond Foxtrot",
    pondId: "P006",
    timestamp: "2025-01-20T16:00:00Z",
    read: false,
    starred: false,
    archived: false,
    actionRequired: true,
    priority: "medium",
    source: "system",
    parameters: {
      maintenanceType: "filtration_system",
      dueDate: "2025-01-22",
      lastMaintenance: "2025-01-15",
    },
  },
  {
    id: "N008",
    title: "High Ammonia Detected",
    message: "Ammonia levels in Pond Golf have exceeded safe limits (0.9 mg/L).",
    type: "critical",
    category: "environmental",
    pond: "Pond Golf",
    pondId: "P007",
    timestamp: "2025-01-20T09:20:00Z",
    read: true,
    starred: false,
    archived: true,
    actionRequired: false,
    priority: "high",
    source: "sensor",
    parameters: {
      current: "0.9 mg/L",
      threshold: "0.5 mg/L",
      parameter: "ammonia",
    },
  },
  {
    id: "N009",
    title: "Water Quality Excellent",
    message: "All parameters in Pond India are within optimal ranges.",
    type: "success",
    category: "environmental",
    pond: "Pond India",
    pondId: "P009",
    timestamp: "2025-01-21T10:30:00Z",
    read: false,
    starred: false,
    archived: false,
    actionRequired: false,
    priority: "low",
    source: "sensor",
    parameters: {
      temperature: "24.5°C",
      ph: "7.3",
      oxygen: "8.4 mg/L",
    },
  },
  {
    id: "N010",
    title: "Feed Stock Low",
    message: "Fish feed inventory is running low. Consider restocking soon.",
    type: "warning",
    category: "feeding",
    pond: "All Ponds",
    pondId: "all",
    timestamp: "2025-01-21T07:00:00Z",
    read: false,
    starred: true,
    archived: false,
    actionRequired: true,
    priority: "medium",
    source: "system",
    parameters: {
      currentStock: "45 kg",
      recommendedStock: "200 kg",
      daysRemaining: 3,
    },
  },
]

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [notifications, setNotifications] = useState(notificationsData)

  // Filter notifications based on tab and filters
  const filteredNotifications = useMemo(() => {
    let filtered = notifications

    // Filter by tab
    switch (activeTab) {
      case "unread":
        filtered = filtered.filter((n) => !n.read)
        break
      case "starred":
        filtered = filtered.filter((n) => n.starred)
        break
      case "archived":
        filtered = filtered.filter((n) => n.archived)
        break
      case "action_required":
        filtered = filtered.filter((n) => n.actionRequired && !n.archived)
        break
      default:
        filtered = filtered.filter((n) => !n.archived)
    }

    // Apply filters
    if (searchTerm) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.pond.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((n) => n.type === typeFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((n) => n.category === categoryFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((n) => n.priority === priorityFilter)
    }

    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [activeTab, searchTerm, typeFilter, categoryFilter, priorityFilter, notifications])

  const getNotificationIcon = (type, category) => {
    if (type === "critical") return "🚨"
    if (type === "warning") return "⚠️"
    if (type === "success") return "✅"

    switch (category) {
      case "environmental":
        return "🌡️"
      case "fish_health":
        return "🐟"
      case "feeding":
        return "🍽️"
      case "maintenance":
        return "🔧"
      case "reports":
        return "📊"
      default:
        return "ℹ️"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "critical":
        return { bg: "#FEF2F2", border: "#FECACA", text: "#DC2626" }
      case "warning":
        return { bg: "#FFFBEB", border: "#FDE68A", text: "#D97706" }
      case "success":
        return { bg: "#F0FDF4", border: "#BBF7D0", text: "#16A34A" }
      case "info":
        return { bg: "#EFF6FF", border: "#BFDBFE", text: "#2563EB" }
      default:
        return { bg: "#F9FAFB", border: "#E5E7EB", text: "#6B7280" }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#DC2626"
      case "medium":
        return "#D97706"
      case "low":
        return "#16A34A"
      default:
        return "#6B7280"
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const handleMarkAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAsUnread = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: false } : n)))
  }

  const handleStar = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n)))
  }

  const handleArchive = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, archived: true } : n)))
  }

  const handleDelete = (id) => {
    Alert.alert("Delete Notification", "Are you sure you want to delete this notification?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setNotifications((prev) => prev.filter((n) => n.id !== id))
        },
      },
    ])
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setCategoryFilter("all")
    setPriorityFilter("all")
  }

  const stats = {
    total: notifications.filter((n) => !n.archived).length,
    unread: notifications.filter((n) => !n.read && !n.archived).length,
    starred: notifications.filter((n) => n.starred && !n.archived).length,
    actionRequired: notifications.filter((n) => n.actionRequired && !n.archived).length,
    critical: notifications.filter((n) => n.type === "critical" && !n.archived).length,
  }

  const TabButton = ({ tab, label, count, isActive, onPress }) => (
    <TouchableOpacity className="py-4 " style={[styles.tabButton, isActive && styles.activeTabButton]} onPress={onPress}>
      <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>{label}</Text>
      {count > 0 && (
        <View style={[styles.tabBadge, isActive && styles.activeTabBadge]}>
          <Text className="pb-4" style={[ isActive && styles.activeTabBadgeText]}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  )

  const NotificationItem = ({ item, onPress }) => {
    const typeColors = getTypeColor(item.type)

    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          !item.read && styles.unreadNotification,
          { borderLeftColor: typeColors.border, borderLeftWidth: 4 },
        ]}
        onPress={() => onPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.notificationHeader}>
          <View style={styles.notificationIconContainer}>
            <Text style={styles.notificationIcon}>{getNotificationIcon(item.type, item.category)}</Text>
          </View>

          <View style={styles.notificationContent}>
            <View style={styles.notificationTitleRow}>
              <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>{item.title}</Text>
              <TouchableOpacity style={styles.starButton} onPress={() => handleStar(item.id)}>
                <Text style={[styles.starIcon, item.starred && styles.starredIcon]}>{item.starred ? "⭐" : "☆"}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>

            <View style={styles.notificationMeta}>
              <Text style={styles.pondName}>{item.pond}</Text>
              <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
              <Text style={[styles.priority, { color: getPriorityColor(item.priority) }]}>
                {item.priority.toUpperCase()}
              </Text>
            </View>

            <View style={styles.notificationBadges}>
              <View style={[styles.typeBadge, { backgroundColor: typeColors.bg, borderColor: typeColors.border }]}>
                <Text style={[styles.typeBadgeText, { color: typeColors.text }]}>{item.type}</Text>
              </View>
              {item.actionRequired && (
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>Action Required</Text>
                </View>
              )}
            </View>

            {item.parameters && (
              <View style={styles.parametersContainer}>
                {item.category === "environmental" && (
                  <Text style={styles.parametersText}>
                    Current: {item.parameters.current} | Threshold: {item.parameters.threshold}
                  </Text>
                )}
                {item.category === "fish_health" && (
                  <Text style={styles.parametersText}>
                    Affected Fish: {item.parameters.affectedFish} | Behavior:{" "}
                    {item.parameters.behavior?.replace("_", " ")}
                  </Text>
                )}
                {item.category === "feeding" && (
                  <Text style={styles.parametersText}>
                    Time: {item.parameters.feedingTime} | Amount: {item.parameters.amount}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const handleNotificationPress = (notification) => {
    Alert.alert(notification.title, notification.message, [
      { text: "Mark as Read", onPress: () => handleMarkAsRead(notification.id) },
      { text: "Archive", onPress: () => handleArchive(notification.id) },
      { text: "Delete", style: "destructive", onPress: () => handleDelete(notification.id) },
      { text: "Cancel", style: "cancel" },
    ])
  }

  const StatsCard = ({ icon, label, value, color = "#3B82F6" }) => (
    <View style={styles.statsCard}>
      <Text style={[styles.statsIcon, { color }]}>{icon}</Text>
      <Text style={[styles.statsValue, { color }]}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>{stats.unread} unread</Text>
        </View>
      </View>

      {/* Stats Row */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
        contentContainerStyle={styles.statsContent}
      >
        <StatsCard icon="🔔" label="Total" value={stats.total} />
        <StatsCard icon="👁️" label="Unread" value={stats.unread} color="#F59E0B" />
        <StatsCard icon="⭐" label="Starred" value={stats.starred} color="#EAB308" />
        <StatsCard icon="⚡" label="Action" value={stats.actionRequired} color="#8B5CF6" />
        <StatsCard icon="🚨" label="Critical" value={stats.critical} color="#EF4444" />
      </ScrollView> */}

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        <TabButton
          tab="all"
          label="All"
          count={stats.total}
          isActive={activeTab === "all"}
          onPress={() => setActiveTab("all")}
        />
        <TabButton
          tab="unread"
          label="Unread"
          count={stats.unread}
          isActive={activeTab === "unread"}
          onPress={() => setActiveTab("unread")}
        />
        <TabButton
          tab="starred"
          label="Starred"
          count={stats.starred}
          isActive={activeTab === "starred"}
          onPress={() => setActiveTab("starred")}
        />
        <TabButton
          tab="action_required"
          label="Action"
          count={stats.actionRequired}
          isActive={activeTab === "action_required"}
          onPress={() => setActiveTab("action_required")}
        />

      </ScrollView>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} onPress={handleNotificationPress} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["#3B82F6"]} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No notifications found</Text>
            <Text style={styles.emptyMessage}>
              {activeTab === "unread" && "All caught up! No unread notifications."}
              {activeTab === "starred" && "No starred notifications yet."}
              {activeTab === "archived" && "No archived notifications."}
              {activeTab === "action_required" && "No actions required at the moment."}
              {activeTab === "all" && "No notifications match your current filters."}
            </Text>
            {(searchTerm || typeFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all") && (
              <TouchableOpacity style={styles.clearFiltersButton} onPress={clearAllFilters}>
                <Text style={styles.clearFiltersText}>Clear Filters</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Filters Modal */}
      <Modal visible={showFilters} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Notifications</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Search</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search notifications..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Type</Text>
              <Picker selectedValue={typeFilter} onValueChange={setTypeFilter} style={styles.picker}>
                <Picker.Item label="All Types" value="all" />
                <Picker.Item label="Critical" value="critical" />
                <Picker.Item label="Warning" value="warning" />
                <Picker.Item label="Success" value="success" />
                <Picker.Item label="Info" value="info" />
              </Picker>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Category</Text>
              <Picker selectedValue={categoryFilter} onValueChange={setCategoryFilter} style={styles.picker}>
                <Picker.Item label="All Categories" value="all" />
                <Picker.Item label="Environmental" value="environmental" />
                <Picker.Item label="Fish Health" value="fish_health" />
                <Picker.Item label="Feeding" value="feeding" />
                <Picker.Item label="Maintenance" value="maintenance" />
                <Picker.Item label="Reports" value="reports" />
              </Picker>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Priority</Text>
              <Picker selectedValue={priorityFilter} onValueChange={setPriorityFilter} style={styles.picker}>
                <Picker.Item label="All Priority" value="all" />
                <Picker.Item label="High" value="high" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Low" value="low" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearAllFilters}>
              <Text style={styles.clearFiltersText}>Clear All Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Settings Modal */}
      <Modal visible={showSettings} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notification Settings</Text>
            <TouchableOpacity onPress={() => setShowSettings(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>🔊 Sound Notifications</Text>
                <Text style={styles.settingDescription}>Play sound for new notifications</Text>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>🔄 Auto Refresh</Text>
                <Text style={styles.settingDescription}>Automatically check for new notifications</Text>
              </View>
              <Switch
                value={autoRefresh}
                onValueChange={setAutoRefresh}
                trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
                thumbColor="#ffffff"
              />
            </View>

            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>📱 Push Notification Settings</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>📧 Email Notifications</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>💬 SMS Alerts</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>🎯 Custom Alert Rules</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 18,
    color: "#1E293B",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonIcon: {
    fontSize: 16,
  },
  statsContainer: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  statsContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  statsCard: {
    alignItems: "center",
    minWidth: 60,
  },
  statsIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statsLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  tabsContainer: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    gap: 6,
  },
  activeTabButton: {
    backgroundColor: "#3B82F6",
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  activeTabButtonText: {
    color: "#ffffff",
  },
  tabBadge: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: "center",
  },
  activeTabBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
  },
  activeTabBadgeText: {
    color: "#ffffff",
  },
  listContainer: {
    padding: 20,
    gap: 12,
  },
  notificationItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  unreadNotification: {
    backgroundColor: "#EFF6FF",
  },
  notificationHeader: {
    flexDirection: "row",
    gap: 12,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: "bold",
  },
  starButton: {
    padding: 4,
  },
  starIcon: {
    fontSize: 16,
    color: "#D1D5DB",
  },
  starredIcon: {
    color: "#F59E0B",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  pondName: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  priority: {
    fontSize: 10,
    fontWeight: "bold",
  },
  notificationBadges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  actionBadge: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8B4FE",
  },
  actionBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7C3AED",
  },
  parametersContainer: {
    backgroundColor: "#F8FAFC",
    padding: 8,
    borderRadius: 8,
  },
  parametersText: {
    fontSize: 12,
    color: "#64748B",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  clearFiltersButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearFiltersText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  modalHeader: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  modalCloseButton: {
    fontSize: 18,
    color: "#64748B",
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  picker: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#64748B",
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
  },
  settingArrow: {
    fontSize: 16,
    color: "#9CA3AF",
  },
})

export default NotificationPage
