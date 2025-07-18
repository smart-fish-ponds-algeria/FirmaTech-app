import { Link, router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { login } from "../services/authService"; // adjust path if needed

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
      console.log("Login successful:", data);
      const userId = data?.data?._id;
      if (!userId) {
        setError("Aucun ID d'utilisateur trouvé dans la réponse.");
        return;
      }
      router.replace(`/dashboard?userId=${userId}`);
    } catch (err) {
      console.log("Login error:", err);
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white items-center pt-20 ">
  <Image
  source={require('../assets/images/group1171274913 (2).jpg')}
  className=" mb-20"
/>


      <Text className="text-[48px] font-extrabold text-[#0052FF] leading-[56px] w-full max-w-xs">
        Let’s{'\n'}Get Started!
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

        {error ? (
          <Text className="text-red-500 mb-4 text-sm">{error}</Text>
        ) : null}

        <TouchableOpacity className="mb-6 items-end">
          <Text className="text-black underline text-base">Forgot your Password?</Text>
        </TouchableOpacity>
        <Link href="(tabs)" className="text-blue-500 underline">
      Go to Home
    </Link>        <TouchableOpacity
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
       
      </View>
    </View>
  );
}
