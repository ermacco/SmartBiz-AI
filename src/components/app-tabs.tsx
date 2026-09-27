import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  
  // Colori basati sul design system SmartBiz AI
  const colors = scheme === 'dark' 
    ? {
        background: '#0B0F17',
        text: '#FFFFFF',
        textSecondary: '#94A3B8',
        primary: '#3B82F6',
      }
    : {
        background: '#FFFFFF',
        text: '#000000',
        textSecondary: '#64748B',
        primary: '#3B82F6',
      };

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.primary}
      labelStyle={{ 
        selected: { color: colors.text },
        unselected: { color: colors.textSecondary }
      }}>
      
      {/* Tab 1: Lavori */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Lavori</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon 
          icon={Ionicons}
          name="briefcase"
          size={24}
          color={colors.primary}
        />
      </NativeTabs.Trigger>

      {/* Tab 2: Call Shield */}
      <NativeTabs.Trigger name="call-shield">
        <NativeTabs.Trigger.Label>Call Shield</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon 
          icon={Ionicons}
          name="phone-portrait"
          size={24}
          color={colors.primary}
        />
      </NativeTabs.Trigger>

      {/* Tab 3: Diagnosi */}
      <NativeTabs.Trigger name="diagnostics">
        <NativeTabs.Trigger.Label>Diagnosi</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon 
          icon={Ionicons}
          name="scan"
          size={24}
          color={colors.primary}
        />
      </NativeTabs.Trigger>

      {/* Tab 4: Clienti */}
      <NativeTabs.Trigger name="clients">
        <NativeTabs.Trigger.Label>Clienti</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon 
          icon={Ionicons}
          name="people"
          size={24}
          color={colors.primary}
        />
      </NativeTabs.Trigger>

      {/* Tab 5: Preventivi */}
      <NativeTabs.Trigger name="quotes">
        <NativeTabs.Trigger.Label>Preventivi</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon 
          icon={Ionicons}
          name="document-text"
          size={24}
          color={colors.primary}
        />
      </NativeTabs.Trigger>

    </NativeTabs>
  );
}
