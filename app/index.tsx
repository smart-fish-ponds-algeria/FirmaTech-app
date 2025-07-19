import { Link, router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { login } from "../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      const userId = data?.data?._id;
      if (!userId) return setError("User ID not found.");
      router.replace(`/dashboard?userId=${userId}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white items-center pt-20 px-6">
      <Image
        source={require('../assets/images/group1171274913 (2).jpg')}
        style={{ width: 250, height: 50, marginBottom: 80 }}
      />
      <Text className="text-[40px] font-extrabold text-[#0052FF] leading-[48px] text-left w-full max-w-xs">
        Let’s{"\n"}Get Started!
      </Text>

      <View className="w-full max-w-xs mt-10">
        <Text className="text-gray-400 text-sm mb-1">Email</Text>
        <TextInput
          className="w-full border-b border-gray-300 text-black text-base pb-1 mb-6"
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="text-gray-400 text-sm mb-1">Password</Text>
        <TextInput
          className="w-full border-b border-gray-300 text-black text-base pb-1 mb-4"
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text className="text-red-500 mb-4 text-sm">{error}</Text> : null}

        <TouchableOpacity className="mb-6 items-end">
          <Text className="text-black underline text-base">Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className={`w-full bg-[#0052FF] py-3 rounded-md items-center ${loading ? 'opacity-60' : ''}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">LOG IN</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity className="mt-4 items-center">
          <Link href="(tabs)">
            <Text className="text-[#0052FF] underline font-medium">Go to Home</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
