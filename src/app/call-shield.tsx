import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface CallLog {
  id: string;
  callerName: string;
  phoneNumber: string;
  timestamp: string;
  classification: 'spam-bloccato' | 'lead-qualificato';
  transcription: string[];
}

const StatusBanner: React.FC<{ isActive: boolean; filteredCount: number }> = ({ 
  isActive, 
  filteredCount 
}) => (
  <View style={[styles.statusBanner, { backgroundColor: isActive ? Colors.successGreen + '20' : Colors.cardBackground }]}>
    <Ionicons 
      name={isActive ? 'shield-checkmark' : 'shield-outline'} 
      size={18} 
      color={isActive ? Colors.successGreen : Colors.textGray} 
    />
    <Text style={[styles.statusBannerText, { color: isActive ? Colors.successGreen : Colors.textWhite }]}>
      Call Shield {isActive ? 'Attivo' : 'Inattivo'} • {filteredCount} chiamate filtrate
    </Text>
  </View>
);

const IncomingCallOverlay: React.FC<{ 
  isVisible: boolean; 
  onAnswer: () => void; 
  onClose: () => void;
}> = ({ isVisible, onAnswer, onClose }) => {
  if (!isVisible) return null;

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isProcessing) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, onClose]);

  return (
    <View style={styles.incomingCallOverlay}>
      <Animated.View 
        style={[
          styles.callBackgroundPulse,
          { opacity: isProcessing ? 0.8 : 1 }
        ]}
      >
        <Ionicons name="call" size={200} color={Colors.primaryBlue} />
      </Animated.View>

      <View style={styles.incomingCallContent}>
        <Text style={styles.callTitle}>Chiamata in Arrivo</Text>
        
        <View style={[styles.callerInfo, { backgroundColor: Colors.cardBackground }]}>
          <Ionicons name="call" size={24} color={Colors.primaryBlue} />
          <Text style={styles.callerName}>Numero Sconosciuto</Text>
          <Text style={styles.callerNumber}>+39 123 456 7890</Text>
        </View>

        <View style={[styles.spamBadge, { backgroundColor: Colors.dangerRed + '20' }]}>
          <Ionicons name="warning" size={16} color={Colors.dangerRed} />
          <Text style={[styles.spamLabel, { color: Colors.dangerRed }]}>Potenziale Spam</Text>
        </View>

        <View style={styles.callActions}>
          <TouchableOpacity 
            style={[styles.answerButton, { backgroundColor: Colors.primaryBlue }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setIsProcessing(true);
              onAnswer();
            }}
          >
            <Ionicons name="call" size={20} color="#FFFFFF" />
            <Text style={styles.answerButtonText}>LASCIA RISPONDERE ALL'IA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.declineButton, { backgroundColor: Colors.dangerRed }]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Ionicons name="call" size={20} color="#FFFFFF" />
            <Text style={styles.declineButtonText}>Blocca</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.callInfo}>
          Call Shield analizzerà la chiamata e classificherà automaticamente il chiamante
        </Text>
      </View>
    </View>
  );
};

const LiveTranscription: React.FC<{ 
  logs: CallLog[]; 
  onCreateJob: (log: CallLog) => void;
}> = ({ logs, onCreateJob }) => {
  const [activeCallId, setActiveCallId] = useState<string | null>(null);

  useEffect(() => {
    if (logs.length > 0 && !activeCallId) {
      const firstLog = logs[0];
      setTimeout(() => {
        setActiveCallId(firstLog.id);
      }, 1000);
    }
  }, [logs, activeCallId]);

  return (
    <View style={styles.transcriptionContainer}>
      <View style={styles.transcriptionHeader}>
        <Text style={styles.transcriptionTitle}>Trascrizione Live IA</Text>
        
        {activeCallId && logs.find(l => l.id === activeCallId) && (
          <TouchableOpacity 
            style={[styles.classificationBadge, { backgroundColor: Colors.dangerRed + '20' }]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Ionicons name="warning" size={16} color={Colors.dangerRed} />
            <Text style={[styles.classificationLabel, { color: Colors.dangerRed }]}>Spam Bloccato</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        contentContainerStyle={styles.logContent}
        showsVerticalScrollIndicator={false}
      >
        {logs.map((log, index) => (
          <View key={log.id} style={[styles.logEntry, activeCallId === log.id && { backgroundColor: Colors.cardBackground }]}>
            <Text style={styles.timestamp}>{log.timestamp}</Text>

            <View style={styles.messageRow}>
              <Ionicons name="sparkles" size={16} color={Colors.primaryBlue} />
              <Text style={[styles.message, { color: Colors.textWhite }]}>
                SmartBiz AI: Ciao! Posso aiutarti con qualcosa?
              </Text>
            </View>

            <View style={styles.messageRow}>
              <Ionicons name="person" size={16} color={Colors.textGray} />
              <Text style={[styles.message, { color: Colors.textGray }]}>
                Chiamante: Sì, vorrei informazioni sui vostri servizi di manutenzione...
              </Text>
            </View>

            <View style={styles.messageRow}>
              <Ionicons name="sparkles" size={16} color={Colors.primaryBlue} />
              <Text style={[styles.message, { color: Colors.textWhite }]}>
                SmartBiz AI: Certamente! Posso aiutarti con la manutenzione del tuo veicolo o macchinario?
              </Text>
            </View>

            <View style={[styles.classificationRow, { backgroundColor: Colors.dangerRed + '10' }]}>
              <Ionicons name="shield-checkmark" size={16} color={Colors.dangerRed} />
              <Text style={[styles.classificationText, { color: Colors.textGray }]}>
                Classificazione automatica: Spam Bloccato - Chiamante non qualificato
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.createJobButton}
              onPress={() => onCreateJob(log)}
            >
              <Ionicons name="add-circle" size={18} color={Colors.successGreen} />
              <Text style={styles.createJobButtonText}>Crea Lavoro Automatico</Text>
            </TouchableOpacity>

            {index < logs.length - 1 && (
              <View style={styles.logSeparator} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const CallShieldHistory: React.FC<{ 
  logs: CallLog[]; 
  onCreateJob: (log: CallLog) => void;
}> = ({ logs, onCreateJob }) => {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Storico Call Shield</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tableWrapper}>
          {logs.map((log, index) => (
            <View key={log.id} style={[styles.tableRow, index === 0 && { backgroundColor: Colors.cardBackground }]}>
              <Text style={styles.tableCellName}>{log.callerName}</Text>
              <Text style={styles.tableCellNumber}>{log.phoneNumber}</Text>
              <Text style={styles.tableCellTime}>{log.timestamp}</Text>

              <View style={[
                styles.historyBadge,
                log.classification === 'spam-bloccato' ? { backgroundColor: Colors.dangerRed + '20' } : 
                { backgroundColor: Colors.successGreen + '20' },
              ]}>
                <Ionicons 
                  name={log.classification === 'spam-bloccato' ? 'warning' : 'checkmark-circle'} 
                  size={14} 
                  color={log.classification === 'spam-bloccato' ? Colors.dangerRed : Colors.successGreen} 
                />
                <Text style={[
                  styles.classificationLabel,
                  log.classification === 'spam-bloccato' ? { color: Colors.dangerRed } : { color: Colors.successGreen },
                ]}>
                  {log.classification === 'spam-bloccato' ? 'Spam' : 'Lead'}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.historyActionButton}
                onPress={() => onCreateJob(log)}
              >
                <Ionicons name="create-outline" size={18} color={Colors.successGreen} />
              </TouchableOpacity>
            </View>
          ))}

          {logs.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="shield-outline" size={48} color={Colors.textGray} />
              <Text style={styles.emptyStateText}>Nessuna chiamata filtrata</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default function CallShieldScreen() {
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  
  const callLogs: CallLog[] = [
    {
      id: '1',
      callerName: 'Rossi Giovanni',
      phoneNumber: '+39 345-678-9012',
      timestamp: '10:23 AM',
      classification: 'spam-bloccato',
      transcription: [
        'Chiamante: Ciao, vorrei informazioni sui vostri servizi...',
        'IA: Certamente! Posso aiutarti con la manutenzione?',
        'Classificazione: Spam Bloccato',
      ],
    },
    {
      id: '2',
      callerName: 'Bianchi Mario',
      phoneNumber: '+39 333-444-5555',
      timestamp: '09:15 AM',
      classification: 'lead-qualificato',
      transcription: [
        'Chiamante: Buongiorno, sono interessato ai vostri servizi...',
        'Classificazione: Lead Qualificato',
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIncomingCall(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateJob = (log: CallLog) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    alert(`Lavoro creato automaticamente per ${log.callerName}!\n\nDettagli trascrizione salvati nel registro.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBanner 
        isActive={true}
        filteredCount={callLogs.length}
      />

      <IncomingCallOverlay 
        isVisible={showIncomingCall}
        onAnswer={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        onClose={() => setShowIncomingCall(false)}
      />

      <LiveTranscription 
        logs={callLogs}
        onCreateJob={handleCreateJob}
      />

      <CallShieldHistory 
        logs={callLogs}
        onCreateJob={handleCreateJob}
      />

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>SmartBiz AI Call Shield</Text>
        <Text style={styles.footerText}>
          Protezione chiamate 24/7 con IA avanzata
        </Text>
        
        <TouchableOpacity 
          style={[styles.toggleButton, { backgroundColor: Colors.primaryBlue }]}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
          <Text style={styles.toggleButtonText}>Call Shield Attivo</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          • Blocca spam automatico{'\n'}• Classifica lead qualificati{'\n'}• Crea lavori automaticamente
        </Text>
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
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSlate,
  },
  statusBannerText: {
    fontSize: Typography.body.fontSize,
    fontWeight: '500',
  },
  incomingCallOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    padding: Spacing.md,
    zIndex: 999,
  },
  callBackgroundPulse: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryBlue,
    opacity: 0.2,
  },
  incomingCallContent: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  callTitle: {
    fontSize: Typography.h3.fontSize,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginBottom: Spacing.md,
  },
  callerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
  },
  callerName: {
    fontSize: Typography.body.fontSize,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  callerNumber: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textGray,
  },
  spamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    marginBottom: Spacing.md,
  },
  spamLabel: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '500',
  },
  callActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    width: '100%',
  },
  answerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
  },
  answerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  declineButton: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
  },
  declineButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  callInfo: {
    textAlign: 'center',
    fontSize: Typography.caption.fontSize,
    color: Colors.textGray,
    marginTop: Spacing.md,
  },
  transcriptionContainer: {
    maxHeight: 250,
    padding: Spacing.md,
  },
  transcriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  transcriptionTitle: {
    fontSize: Typography.h3.fontSize,
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  classificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  classificationLabel: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '500',
  },
  logContent: {
    gap: Spacing.sm,
  },
  logEntry: {
    padding: Spacing.sm,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderSlate,
  },
  timestamp: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textGray,
    marginBottom: 4,
  },
  messageRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: 4,
  },
  message: {
    flex: 1,
    fontSize: Typography.body.fontSize,
  },
  classificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.xs,
    borderRadius: Radius.lg,
    marginVertical: 4,
  },
  classificationText: {
    fontSize: Typography.caption.fontSize,
  },
  createJobButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: 6,
    backgroundColor: Colors.successGreen + '20',
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.successGreen,
    marginTop: 4,
  },
  createJobButtonText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '600',
    color: Colors.successGreen,
  },
  logSeparator: {
    height: 1,
    backgroundColor: Colors.borderSlate,
    marginVertical: 4,
  },
  historyContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  historyTitle: {
    fontSize: Typography.h3.fontSize,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginBottom: Spacing.sm,
  },
  tableWrapper: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSlate,
  },
  tableCellName: {
    flex: 2,
    fontSize: Typography.body.fontSize,
    fontWeight: '500',
    color: Colors.textWhite,
  },
  tableCellNumber: {
    flex: 2,
    fontSize: Typography.caption.fontSize,
    color: Colors.primaryBlue,
  },
  tableCellTime: {
    flex: 1,
    fontSize: Typography.caption.fontSize,
    color: Colors.textGray,
  },
  historyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  historyActionButton: {
    padding: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.successGreen + '10',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
  },
  emptyStateText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textGray,
    marginTop: Spacing.sm,
  },
  footer: {
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSlate,
    padding: Spacing.md,
  },
  footerTitle: {
    fontSize: Typography.h3.fontSize,
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  footerText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textGray,
    marginBottom: Spacing.sm,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.lg,
  },
  toggleButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footerNote: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textGray,
    marginTop: Spacing.sm,
    lineHeight: 18,
  },
});