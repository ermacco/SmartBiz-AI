import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Esplora & Risorse</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Ionicons name="compass" size={36} color={Colors.primaryBlue} />
          <Text style={styles.cardTitle}>Nessuna Risorsa Extra</Text>
          <Text style={styles.cardSub}>
            Tutte le funzionalità di SmartBiz AI sono accessibili dal menu principale.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.backgroundPrimary,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    padding: Spacing.md,
    paddingTop: Platform.OS === 'ios' ? Spacing.xxl : Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSlate,
  },
  title: { color: Colors.textWhite, fontSize: Typography.h1.fontSize, fontWeight: 'bold' },
  content: { flex: 1, padding: Spacing.md, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: Colors.cardBackground, padding: Spacing.lg, borderRadius: Radius.lg, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: Colors.borderSlate },
  cardTitle: { color: Colors.textWhite, fontSize: Typography.h3.fontSize, fontWeight: 'bold' },
  cardSub: { color: Colors.textGray, fontSize: Typography.caption.fontSize, textAlign: 'center' },
});