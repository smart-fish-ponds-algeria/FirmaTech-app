import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { API_BASE_URL } from '../../utils/config'; // Assurez-vous que le chemin est correct

interface WaterTankI {
  _id: string;
  name: string;
  details: WaterTankDetails;
  responsible: string;
  isActive: boolean;
  fishDetails?: FishedDetails;
}

interface WaterTankDetails {
  length: number;
  width: number;
  volume: number;
}

interface FishedDetails {
  total_fish_count: number;
  total_fish_sick: number;
  fish_lenght: number;
  fish_weight: number;
}


export default function Dashboard() {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const [tanks, setTanks] = useState<WaterTankI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError("Aucun ID d'utilisateur fourni.");
      setLoading(false);
      return;
    }

    const fetchTanks = async () => {
      try {
        const res = await axios.get<WaterTankI[]>(`${API_BASE_URL}/waterTanks/user/${userId}`);
        console.log('Tanks:', res.data);

        setTanks(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des tanks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTanks();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tanks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>Status: {item.isActive ? '✅ Actif' : '❌ Inactif'}</Text>

          <Text style={styles.section}>📐 Dimensions</Text>
          <Text>Longueur: {item.details.length} m</Text>
          <Text>Largeur: {item.details.width} m</Text>
          <Text>Volume: {item.details.volume} m³</Text>

          <Text style={styles.section}>👤 Responsable</Text>
          <Text>{item.responsible}</Text>

          {item.fishDetails && (
            <>
              <Text style={styles.section}>🐟 Détails des poissons</Text>
              <Text>Poissons totaux: {item.fishDetails.total_fish_count}</Text>
              <Text>Poissons malades: {item.fishDetails.total_fish_sick}</Text>
              <Text>Taille moyenne: {item.fishDetails.fish_lenght} cm</Text>
              <Text>Poids moyen: {item.fishDetails.fish_weight} g</Text>
            </>
          )}
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  section: {
    marginTop: 10,
    fontWeight: '600',
  },
});
