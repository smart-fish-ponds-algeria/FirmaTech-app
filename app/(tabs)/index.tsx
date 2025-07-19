import { View, Text, Image, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#f7f8fa]">
      <ScrollView className="flex-1">

        {/* NOTIFICATION */}
        <View className="px-5 py-4">
          <View className="bg-[#ffe3e3] border border-[#f87171] rounded-xl p-4 mb-6 ">
            <View className="flex-row space-x-3 items-start">
              <Ionicons name="warning-outline" size={28} color="#f87171" />
              <View className="flex-1">
                <Text className="text-black font-bold text-base mb-1">
                  Temperature Exceeded 28°C Threshold
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-500 text-xs">Pond Gamma · 2min ago</Text>
                  <Pressable className="flex-row items-center bg-white border border-gray-300 rounded-md px-3 py-1">
                    <Ionicons name="checkmark-done-outline" size={16} color="#6b7280" />
                    <Text className="text-gray-700 text-sm ml-1">Mark as read</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* LIST */}
          <Text className="text-lg font-bold text-black mb-3">My Ponds</Text>
          {[...Array(6)].map((_, i) => (
            <Pressable
              key={i}
              className="bg-white rounded-xl px-5 py-4 mb-3 flex-row justify-between items-center "
            >
              <View className="flex-row items-center space-x-3">
                <Text className="text-black font-semibold text-base">Pond P00{i + 1}</Text>
                <Text className="text-gray-400 text-sm">North Section</Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <View className="flex-row items-center bg-[#ffedd5] px-2 py-1 rounded-md space-x-1">
                  <Ionicons name="warning" size={14} color="#fb923c" />
                  <Text className="text-[#fb923c] text-xs font-bold">Warning</Text>
                </View>
                <Link href="/pond/4">
  <Ionicons name="arrow-forward-outline" size={20} color="#3b82f6" />
</Link>

              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
