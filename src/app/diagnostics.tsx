import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface DiagnosticResult {
  id: string;
  type: 'license-plate' | 'machine-code' | 'error-code';
  value: string;
  timestamp: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const CameraViewport: React.FC<{ 
  onCapture: (result: DiagnosticResult) => void;
}> = ({ onCapture }) => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        onCapture({
          id: Date.now().toString(),
          type: 'license-plate',
          value: 'AB123CD - Ford Transit 2020',
          timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isScanning, onCapture]);

  return (
    <View style={styles.viewportContainer}>
      <View style={styles.viewfinderOverlay}>
        <View style={[styles.centerGrid, { opacity: isScanning ? 0.8 : 1 }]}>
          <View style={[styles.gridLine, { backgroundColor: Colors.primaryBlue + '60' }]} />
          <View style={[styles.gridLineVertical, { backgroundColor: Colors.primaryBlue + '60' }]} />
        </View>

        {isScanning && (
          <Text style={styles.scanningText}>Scansione in corso...</Text>
        )}

        {!isScanning && (
          <View style={[styles.labelContainer, { backgroundColor: Colors.cardBackground }]}>
            <Ionicons name="camera" size={16} color={Colors.primaryBlue} />
            <Text style={styles.labelText}>Inquadra Targa o Componente</Text>
          </View>
        )}

        <View style={[styles.statusBadge, { backgroundColor: Colors.successGreen + '20' }]}>
          <Ionicons name="scan" size={14} color={Colors.successGreen} />
          <Text style={[styles.statusText, { color: Colors.successGreen }]}>Camera Ready</Text>
        </View>
      </View>

      <View style={styles.viewportControls}>
        <TouchableOpacity 
          style={[styles.captureButton, { backgroundColor: isScanning ? Colors.primaryBlue : Colors.dangerRed }]}
          onPress={() => setIsScanning(true)}
        >
          <Ionicons name={isScanning ? 'stop-circle' : 'camera'} size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.captureButtonText}>
          {isScanning ? 'Annulla Scansione' : 'Inquadra Targa o Componente'}
        </Text>
      </View>
    </View>
  );
};

const TechnicalChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Ciao! Sono SmartBiz AI. Posso aiutarti con diagnosi tecniche o codici errore?',
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
      
      const responses: Record<string, string> = {
        'E10': `Errore Caldaia E10\n\n🔧 Diagnosi: Sensore di temperatura difettoso o cavo rotto.\n\n📦 Codice Ricambio OEM: Bosch GNT 3254\n💰 Prezzo: €89.00`,
        'E07': `Errore Caldaia E07\n\n🔧 Diagnosi: Pressione acqua troppo bassa.\n\n💡 Soluzione: Ripristinare pressione a 1.2 bar.`,
        'default': `Analisi Richiesta\n\nHo ricevuto il tuo messaggio. Posso aiutarti con diagnosi tecniche e codici ricambio OEM!`,
      };

      const lastUserMsg = messages[messages.length - 1].text;
      const response = responses[lastUserMsg] || responses['default'];
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'ai',
          text: response,
          timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        }]);
        setIsTyping(false);
      }, 1500);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
    }]);

    setInputText('');
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <Ionicons name="chatbubbles" size={20} color={Colors.primaryBlue} />
        <Text style={styles.chatTitle}>Chat Tecnica IA</Text>
        <View style={[styles.statusBadge, { backgroundColor: Colors.successGreen + '20' }]}>
          <Ionicons name="sparkles" size={14} color={Colors.successGreen} />
          <Text style={[styles.statusText, { color: Colors.successGreen }]}>Online</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View key={message.id} style={[
            styles.messageBubble,
            message.sender === 'user' ? { backgroundColor: Colors.primaryBlue + '20', alignSelf: 'flex-end' } : 
            { backgroundColor: Colors.cardBackground },
          ]}>
            {message.sender === 'ai' && (
              <View style={styles.avatarContainer}>
                <Ionicons name="sparkles" size={16} color={Colors.primaryBlue} />
              </View>
            )}

            <Text 
              style={[
                styles.messageText,
                message.sender === 'user' ? { color: Colors.textWhite } : { color: Colors.textGray },
              ]}
            >
              {message.text}
            </Text>

            <Text style={styles.timestamp}>{message.timestamp}</Text>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageBubble, { backgroundColor: Colors.cardBackground }]}>
            <Ionicons name="sparkles" size={16} color={Colors.primaryBlue} />
            <Text style={{ color: Colors.textGray, fontSize: 12, marginLeft: 6 }}>L'IA sta elaborando...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Inserisci codice errore o descrizione..."
          placeholderTextColor={Colors.textGray}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />

        <TouchableOpacity 
          style={[styles.sendButton, { backgroundColor: inputText.trim() ? Colors.primaryBlue : Colors.borderSlate }]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Codici Errori Comuni:</Text>
        
        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {['E10', 'E07', 'P0300', 'B1234'].map((code) => (
            <TouchableOpacity 
              key={code}
              style={[styles.quickActionButton, { backgroundColor: Colors.cardBackground }]}
              onPress={() => setInputText(code)}
            >
              <Ionicons name="code-slash" size={12} color={Colors.primaryBlue} />
              <Text style={styles.quickActionCode}>{code}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default function DiagnosticsScreen() {
  const [lastCapture, setLastCapture] = useState<DiagnosticResult | null>(null);

  const handleCapture = (result: DiagnosticResult) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLastCapture(result);
    alert(`Catturato: ${result.value}\n\nTipo: ${result.type.toUpperCase()}\nTempo: ${result.timestamp}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Diagnosi & Chat IA</Text>
        
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, { backgroundColor: Colors.successGreen + '20' }]}>
            <Ionicons name="scan" size={14} color={Colors.successGreen} />
            <Text style={[styles.statusText, { color: Colors.successGreen }]}>Camera Ready</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: Colors.primaryBlue + '20' }]}>
            <Ionicons name="sparkles" size={14} color={Colors.primaryBlue} />
            <Text style={[styles.statusText, { color: Colors.primaryBlue }]}>AI Online</Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <CameraViewport onCapture={handleCapture} />

        {lastCapture && (
          <View style={[styles.captureResult, { backgroundColor: Colors.cardBackground }]}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.successGreen} />
            <Text style={styles.captureResultLabel}>Ultima Cattura:</Text>
            <Text style={styles.captureResultValue}>{lastCapture.value}</Text>
          </View>
        )}

        <TechnicalChat />
      </ScrollView>
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
  },
  greeting: {
    fontSize: Typography.h1.fontSize,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  viewportContainer: {
    height: 180,
    position: 'relative',
    backgroundColor: '#000000',
    marginHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  viewfinderOverlay: {
    flex: 1,
    alignItems: 'center',
  },
  centerGrid: {
    width: 140,
    height: 140,
    position: 'absolute',
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    top: '50%',
  },
  gridLineVertical: {
    position: 'absolute',
    height: '100%',
    width: 1,
    left: '50%',
  },
  scanningText: {
    color: Colors.primaryBlue,
    fontSize: Typography.caption.fontSize,
    fontWeight: '600',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  labelText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.primaryBlue,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  statusText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '500',
  },
  viewportControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.cardBackground,
  },
  captureButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  captureResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.sm,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.successGreen,
  },
  captureResultLabel: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textWhite,
  },
  captureResultValue: {
    flex: 1,
    fontSize: Typography.caption.fontSize,
    fontWeight: '500',
    color: Colors.successGreen,
  },
  chatContainer: {
    padding: Spacing.md,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  chatTitle: {
    fontSize: Typography.h3.fontSize,
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  messagesContent: {
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  messageBubble: {
    padding: Spacing.sm,
    borderRadius: Radius.lg,
    maxWidth: '88%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 6,
    marginTop: 2,
  },
  messageText: {
    fontSize: Typography.body.fontSize,
    flex: 1,
  },
  timestamp: {
    fontSize: 10,
    color: Colors.textGray,
    alignSelf: 'flex-end',
    marginLeft: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.borderSlate,
    marginTop: Spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: Typography.body.fontSize,
    color: Colors.textWhite,
    paddingVertical: 6,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActions: {
    marginTop: Spacing.sm,
  },
  quickActionsTitle: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textGray,
    marginBottom: 4,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderSlate,
  },
  quickActionCode: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '600',
    color: Colors.primaryBlue,
  },
});