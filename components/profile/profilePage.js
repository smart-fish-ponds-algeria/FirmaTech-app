"use client"

import { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
  Alert,
  Dimensions,
  Modal,
} from "react-native"

const { width: screenWidth } = Dimensions.get("window")

// Mock farmer data
const farmerProfile = {
  id: "F001",
  name: "Ahmed Benali",
  email: "ahmed.benali@aquafarm.dz",
  phone: "+213 555 123 456",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  location: "Blida, Boufarik, Algeria",
  farmName: "Benali Aquaculture Farm",
  experience: "8 years",
  specialization: "Tilapia & Carp Farming",
  certification: "Certified Aquaculture Professional",
  joinDate: "2024-01-15",
  totalPonds: 10,
  totalProduction: "45.2 tons/year",
  successRate: "94.5%",
  achievements: [
    { id: 1, title: "Best Productivity 2024", icon: "🏆", date: "2024-06-15" },
    { id: 2, title: "1000+ Fish Harvested", icon: "🐟", date: "2024-05-20" },
    { id: 3, title: "Zero Loss Month", icon: "💯", date: "2024-04-10" },
    { id: 4, title: "Water Quality Expert", icon: "💧", date: "2024-03-05" },
  ],
  preferences: {
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    darkMode: false,
    language: "English",
    units: "Metric",
    autoBackup: true,
    locationServices: true,
  },
  subscription: {
    plan: "Premium",
    status: "Active",
    expiryDate: "2025-01-15",
    features: ["Unlimited Ponds", "AI Analytics", "Priority Support", "Advanced Reports"],
  },
}

const ProfilePage = () => {
  const [preferences, setPreferences] = useState(farmerProfile.preferences)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleEditProfile = () => {
    setShowEditModal(true)
  }

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => console.log("Logout") },
    ])
  }

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "This action cannot be undone. All your data will be permanently deleted.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => console.log("Delete account") },
    ])
  }

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: farmerProfile.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editAvatarButton}>
          <Text style={styles.editAvatarIcon}>📷</Text>
        </TouchableOpacity>
        <View style={styles.onlineIndicator} />
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{farmerProfile.name}</Text>
        <Text style={styles.profileTitle}>{farmerProfile.specialization}</Text>
        <Text style={styles.profileLocation}>📍 {farmerProfile.location}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  )

  const StatsCard = () => (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>📊 Farm Statistics</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{farmerProfile.totalPonds}</Text>
          <Text style={styles.statLabel}>Active Ponds</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{farmerProfile.totalProduction}</Text>
          <Text style={styles.statLabel}>Annual Production</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{farmerProfile.successRate}</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{farmerProfile.achievements.length}</Text>
          <Text style={styles.statLabel}>Achievements</Text>
        </View>
      </View>
    </View>
  )

  const AchievementsCard = () => (
    <View style={styles.achievementsCard}>
      <View style={styles.achievementsHeader}>
        <Text style={styles.achievementsTitle}>🏆 Recent Achievements</Text>
        <TouchableOpacity onPress={() => setShowAchievements(true)}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.achievementsList}>
        {farmerProfile.achievements.slice(0, 2).map((achievement) => (
          <View key={achievement.id} style={styles.achievementItem}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDate}>{new Date(achievement.date).toLocaleDateString()}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )

  

  const SettingsSection = ({ title, children }) => (
    <View style={styles.settingsSection}>
      <Text style={styles.settingsSectionTitle}>{title}</Text>
      {children}
    </View>
  )

  const SettingsItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Text style={styles.settingsIcon}>{icon}</Text>
        <View style={styles.settingsContent}>
          <Text style={styles.settingsTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || <Text style={styles.settingsArrow}>→</Text>}
    </TouchableOpacity>
  )

  const SwitchItem = ({ icon, title, subtitle, value, onToggle }) => (
    <View style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        <Text style={styles.settingsIcon}>{icon}</Text>
        <View style={styles.settingsContent}>
          <Text style={styles.settingsTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
        thumbColor={value ? "#ffffff" : "#ffffff"}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="text-center w-full flex justify-center items-center " style={styles.header}>

        <Text className="text-center flex justify-center items-center" style={styles.headerTitle}>Profile</Text>
     
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <ProfileHeader />


        {/* Account Settings */}
        <SettingsSection title="👤 Account">
          <SettingsItem
            icon="📧"
            title="Email"
            subtitle={farmerProfile.email}
            onPress={() => console.log("Edit email")}
          />
          <SettingsItem
            icon="📱"
            title="Phone"
            subtitle={farmerProfile.phone}
            onPress={() => console.log("Edit phone")}
          />
          <SettingsItem
            icon="🏢"
            title="Farm Details"
            subtitle={farmerProfile.farmName}
            onPress={() => console.log("Edit farm details")}
          />
          <SettingsItem icon="🔒" title="Change Password" onPress={() => console.log("Change password")} />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="🔔 Notifications">
          <SwitchItem
            icon="📱"
            title="Push Notifications"
            subtitle="Receive alerts and updates"
            value={preferences.notifications}
            onToggle={() => togglePreference("notifications")}
          />
          <SwitchItem
            icon="📧"
            title="Email Alerts"
            subtitle="Get important updates via email"
            value={preferences.emailAlerts}
            onToggle={() => togglePreference("emailAlerts")}
          />
          <SwitchItem
            icon="💬"
            title="SMS Alerts"
            subtitle="Critical alerts via SMS"
            value={preferences.smsAlerts}
            onToggle={() => togglePreference("smsAlerts")}
          />
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection title="⚙️ Preferences">
          <SwitchItem
            icon="🌙"
            title="Dark Mode"
            subtitle="Use dark theme"
            value={preferences.darkMode}
            onToggle={() => togglePreference("darkMode")}
          />
          <SettingsItem
            icon="🌍"
            title="Language"
            subtitle={preferences.language}
            onPress={() => console.log("Change language")}
          />
          <SettingsItem
            icon="📏"
            title="Units"
            subtitle={preferences.units}
            onPress={() => console.log("Change units")}
          />
          <SwitchItem
            icon="☁️"
            title="Auto Backup"
            subtitle="Automatically backup data"
            value={preferences.autoBackup}
            onToggle={() => togglePreference("autoBackup")}
          />
          <SwitchItem
            icon="📍"
            title="Location Services"
            subtitle="Enable location-based features"
            value={preferences.locationServices}
            onToggle={() => togglePreference("locationServices")}
          />
        </SettingsSection>

       

      
        {/* Account Actions */}
        <View style={styles.accountActions}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>🚪 Logout</Text>
          </TouchableOpacity>

        
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Achievements Modal */}
      <Modal visible={showAchievements} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>🏆 All Achievements</Text>
            <TouchableOpacity onPress={() => setShowAchievements(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {farmerProfile.achievements.map((achievement) => (
              <View key={achievement.id} style={styles.fullAchievementItem}>
                <Text style={styles.fullAchievementIcon}>{achievement.icon}</Text>
                <View style={styles.fullAchievementContent}>
                  <Text style={styles.fullAchievementTitle}>{achievement.title}</Text>
                  <Text style={styles.fullAchievementDate}>
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButtonIcon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatarIcon: {
    fontSize: 14,
  },
  onlineIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#10B981",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
    marginBottom: 8,
  },
  profileLocation: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  profileExperience: {
    fontSize: 14,
    color: "#64748B",
  },
  editButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  statsCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  statItem: {
    width: (screenWidth - 72) / 2,
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  achievementsCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  viewAllText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 12,
    color: "#64748B",
  },
  subscriptionCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subscriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  subscriptionBadge: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  subscriptionBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  subscriptionStatus: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  activeStatus: {
    color: "#10B981",
    fontWeight: "600",
  },
  subscriptionExpiry: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  featuresContainer: {
    gap: 8,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    fontSize: 12,
    color: "#10B981",
    marginRight: 8,
    fontWeight: "bold",
  },
  featureText: {
    fontSize: 14,
    color: "#64748B",
  },
  upgradeButton: {
    backgroundColor: "#EBF4FF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  upgradeButtonText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  settingsSection: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    padding: 20,
    paddingBottom: 12,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingsIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
    textAlign: "center",
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "500",
  },
  settingsSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  settingsArrow: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  accountActions: {
    marginHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  logoutButtonText: {
    color: "#F59E0B",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  deleteButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 20,
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
  fullAchievementItem: {
    flexDirection: "row",
    alignItems: "center",
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
  fullAchievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  fullAchievementContent: {
    flex: 1,
  },
  fullAchievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  fullAchievementDate: {
    fontSize: 14,
    color: "#64748B",
  },
})

export default ProfilePage
