import { router } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { login } from "../services/authService"; // adapte le chemin si besoin

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      console.log("Login successful:", data);
      const userId = data.data._id;
      if (!userId) {
        setError("Aucun ID d'utilisateur trouvé dans la réponse.");
        return;
      }
      console.log("Redirecting to /dashboard...");
      console.log("User ID:", userId);
      router.replace(`/dashboard?userId=${userId}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Connexion" onPress={handleLogin} />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
}
