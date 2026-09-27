import {
  ArrowLeft,
  Bot,
  Camera,
  Clock,
  DollarSign,
  FileText,
  Mic, Phone, PhoneOff,
  Send,
  Share2,
  Shield,
  Users, Wrench,
  X, Zap
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  code?: string;
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'home' | 'callShield' | 'diagnostics' | 'clients'>('home');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [isAiScreening, setIsAiScreening] = useState(false);
  const [screeningTranscript, setScreeningTranscript] = useState<string[]>([]);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [scanResult, setScanResult] = useState<{ title: string; component: string; status: string } | null>(null);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Ciao Mario, come posso aiutarti con le diagnosi tecniche oggi?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const triggerCallScreening = () => {
    setIsAiScreening(true);
    setScreeningTranscript(["SmartBiz AI: 'Buongiorno, servizio automatico per Mario Servizi Tecnologici. Come posso aiutarla?'"]);
    
    setTimeout(() => {
      setScreeningTranscript(prev => [...prev, "Chiamante: 'Salve, vorrei proporre un cambio di contratto energetico aziendale...'"]);
    }, 2000);

    setTimeout(() => {
      setScreeningTranscript(prev => [...prev, "SmartBiz AI: 'Filtro di protezione attivo: Telemarketing rilevato. Chiamata bloccata.'"]);
    }, 4500);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Codice Errore Caldaia E10: Pressione acqua insufficiente (<0.8 bar).',
          code: 'OEM Part: 8435290 - Pressostato Idraulico Ricambio'
        }
      ]);
    }, 1200);
  };

  const handleCameraScan = () => {
    setAnalyzingImage(true);
    setScanResult(null);
    setTimeout(() => {
      setAnalyzingImage(false);
      setScanResult({
        title: 'Caldaia Baxi Luna3 Blue',
        component: 'Matricola #8435290',
        status: 'Stato: Pressione Bassa (0.5 bar)'
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F17" />

      {/* Header & Daily Metrics Bar */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greetingText}>Buongiorno 👋</Text>
            <Text style={styles.userName}>Mario Servelli</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setShowIncomingCall(true)} 
            style={styles.simCallBtn}
          >
            <Phone size={14} color="#3B82F6" />
            <Text style={styles.simCallText}>Simula Chiamata</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Metrics Pills */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View>
              <Text style={styles.metricLabel}>INCASSO OGGI</Text>
              <Text style={styles.metricValue}>€450 <Text style={styles.metricGoal}>/ €600</Text></Text>
            </View>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <DollarSign size={16} color="#10B981" />
            </View>
          </View>

          <View style={styles.metricCard}>
            <View>
              <Text style={styles.metricLabel}>PREVENTIVI IN ATTESA</Text>
              <Text style={[styles.metricValue, { color: '#F59E0B' }]}>3 Pratiche</Text>
            </View>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
              <Clock size={16} color="#F59E0B" />
            </View>
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.contentArea} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* TAB 1: HOME / ACTIVE JOBS */}
        {activeTab === 'home' && (
          <View style={styles.sectionGap}>
            <View style={styles.tabsRow}>
              <TouchableOpacity style={styles.activeTabPill}>
                <Text style={styles.activeTabPillText}>In Corso (4)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inactiveTabPill}>
                <Text style={styles.inactiveTabPillText}>In Attesa Pezzi (2)</Text>
              </TouchableOpacity>
            </View>

            {/* Job Card 1 */}
            <View style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View>
                  <Text style={styles.categoryText}>OFFICINA MECCANICA</Text>
                  <Text style={styles.clientName}>Trasporti Luigi S.r.l.</Text>
                  <Text style={styles.vehicleInfo}>Ford Transit 2020 - AB123CD</Text>
                </View>
                <View style={styles.badgeWarning}>
                  <Clock size={12} color="#F59E0B" />
                  <Text style={styles.badgeWarningText}>In Lavorazione</Text>
                </View>
              </View>

              <View style={styles.jobDetailBox}>
                <Text style={styles.detailLine}><Text style={styles.detailLabel}>Intervento: </Text>Sostituzione Pastiglie Freni e Dischi</Text>
                <Text style={styles.detailLine}><Text style={styles.detailLabel}>Tempo stimato: </Text>1.5 ore manodopera</Text>
              </View>

              <View style={styles.jobFooter}>
                <TouchableOpacity 
                  onPress={() => setShowInvoiceModal(true)}
                  style={styles.invoiceBtn}
                >
                  <FileText size={14} color="#3B82F6" />
                  <Text style={styles.invoiceBtnText}>Vedi Preventivo (€237.90)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Phone size={16} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Job Card 2 */}
            <View style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View>
                  <Text style={[styles.categoryText, { color: '#10B981' }]}>IMPIANTO ELETTRICO</Text>
                  <Text style={styles.clientName}>Ristorante Da Marco</Text>
                  <Text style={styles.vehicleInfo}>Guasto Quadro Elettrico Cucina</Text>
                </View>
                <View style={styles.badgeInfo}>
                  <Wrench size={12} color="#3B82F6" />
                  <Text style={styles.badgeInfoText}>Attesa Ricambio</Text>
                </View>
              </View>

              <View style={styles.jobDetailBox}>
                <Text style={styles.detailLine}><Text style={styles.detailLabel}>Pezzo ordinato: </Text>Magnetotermico Differenziale 32A</Text>
                <Text style={styles.detailLine}><Text style={styles.detailLabel}>Consegna: </Text>Oggi ore 14:30</Text>
              </View>
            </View>
          </View>
        )}

        {/* TAB 2: CALL SHIELD */}
        {activeTab === 'callShield' && (
          <View style={styles.sectionGap}>
            <View style={styles.bannerShield}>
              <View>
                <Text style={styles.bannerTitle}>Call Shield Attivo</Text>
                <Text style={styles.bannerSub}>14 Chiamate filtrate questa settimana</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Ultimi Eventi Rilevati</Text>

            <View style={styles.shieldCardSpam}>
              <View style={styles.shieldRow}>
                <View style={styles.spamIconBox}>
                  <PhoneOff size={16} color="#EF4444" />
                </View>
                <View>
                  <Text style={styles.phoneNum}>+39 02 8847 2910</Text>
                  <Text style={styles.spamText}>Spam Telemarketing Bloccato dall'IA</Text>
                </View>
              </View>
              <Text style={styles.timeText}>10:12</Text>
            </View>

            <View style={styles.shieldCardLead}>
              <View style={styles.shieldRow}>
                <View style={styles.leadIconBox}>
                  <Bot size={16} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.phoneNum}>Cliente Potenziale (Giuseppe)</Text>
                  <Text style={styles.leadText}>Richiesta Preventivo Trascritto</Text>
                </View>
              </View>
              <Text style={styles.transcriptQuote}>
                "Ho bisogno di sostituire il salvavita in appartamento a Bergamo. Richiamatemi."
              </Text>
              <TouchableOpacity style={styles.createJobBtn}>
                <Text style={styles.createJobBtnText}>+ Crea Lavoro Automatico</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB 3: DIAGNOSTICS & CHAT */}
        {activeTab === 'diagnostics' && (
          <View style={styles.sectionGap}>
            {/* Camera Viewport Simulation */}
            <View style={styles.cameraBox}>
              <View style={styles.cameraHud}>
                <View style={styles.hudBadge}>
                  <Camera size={12} color="#3B82F6" />
                  <Text style={styles.hudBadgeText}>HUD SCANNER v2.4</Text>
                </View>
                <Text style={styles.hudSub}>1080P // RAW</Text>
              </View>

              {scanResult && (
                <View style={styles.scanResultCard}>
                  <Text style={styles.scanTitle}>{scanResult.title}</Text>
                  <Text style={styles.scanComponent}>{scanResult.component}</Text>
                  <Text style={styles.scanStatus}>{scanResult.status}</Text>
                </View>
              )}

              <TouchableOpacity 
                onPress={handleCameraScan}
                disabled={analyzingImage}
                style={styles.scanBtn}
              >
                <Camera size={16} color="#FFFFFF" />
                <Text style={styles.scanBtnText}>
                  {analyzingImage ? "Scansione Matricola in corso..." : "Inquadra Targa o Componente"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* AI Technical Chat */}
            <View style={styles.chatBox}>
              <View style={styles.chatHeader}>
                <Bot size={16} color="#3B82F6" />
                <Text style={styles.chatTitle}>Assistente Tecnico Ricambi & Manuali</Text>
              </View>

              <ScrollView style={styles.chatMessagesList}>
                {chatMessages.map((msg, idx) => (
                  <View key={idx} style={[styles.msgRow, msg.sender === 'user' ? styles.msgUser : styles.msgAi]}>
                    <View style={[styles.msgBubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAi]}>
                      <Text style={styles.msgText}>{msg.text}</Text>
                      {msg.code ? (
                        <View style={styles.codeBox}>
                          <Text style={styles.codeText}>{msg.code}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.chatInputRow}>
                <TextInput 
                  value={chatInput}
                  onChangeText={setChatInput}
                  placeholder="Chiedi codici errore o soluzioni..."
                  placeholderTextColor="#64748B"
                  style={styles.chatInput}
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.sendBtn}>
                  <Send size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* TAB 4: CLIENTS */}
        {activeTab === 'clients' && (
          <View style={styles.sectionGap}>
            <Text style={styles.sectionTitle}>Rubrica Clienti Recenti</Text>
            {[
              { name: 'Officina Rossi & C.', phone: '+39 035 1234567', jobs: '3 Lavori effettuati' },
              { name: 'Condominio Bella Vista', phone: '+39 035 9876543', jobs: 'Manutenzione Annuale' },
            ].map((client, i) => (
              <View key={i} style={styles.clientItem}>
                <View>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientSub}>{client.phone} • {client.jobs}</Text>
                </View>
                <TouchableOpacity style={styles.iconBtn}>
                  <Phone size={16} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

      {/* Floating Action Audio Voice Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity 
          onPress={() => {
            setShowVoiceModal(true);
            setIsRecording(true);
          }}
          style={styles.fabButton}
        >
          <Mic size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.navTab}>
          <Wrench size={20} color={activeTab === 'home' ? '#3B82F6' : '#64748B'} />
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Lavori</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('callShield')} style={styles.navTab}>
          <Shield size={20} color={activeTab === 'callShield' ? '#3B82F6' : '#64748B'} />
          <Text style={[styles.navLabel, activeTab === 'callShield' && styles.navLabelActive]}>Call Shield</Text>
        </TouchableOpacity>

        <View style={{ width: 40 }} />

        <TouchableOpacity onPress={() => setActiveTab('diagnostics')} style={styles.navTab}>
          <Camera size={20} color={activeTab === 'diagnostics' ? '#3B82F6' : '#64748B'} />
          <Text style={[styles.navLabel, activeTab === 'diagnostics' && styles.navLabelActive]}>Diagnosi</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('clients')} style={styles.navTab}>
          <Users size={20} color={activeTab === 'clients' ? '#3B82F6' : '#64748B'} />
          <Text style={[styles.navLabel, activeTab === 'clients' && styles.navLabelActive]}>Clienti</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL 1: VOICE RECORDING */}
      <Modal visible={showVoiceModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>REGISTRATORE NOTE AI</Text>
            <TouchableOpacity onPress={() => setShowVoiceModal(false)}>
              <X size={24} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <View style={styles.voiceCenterArea}>
            <View style={styles.voiceCircle}>
              <Mic size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.voiceTimer}>00:0{recordingTime} / 01:00</Text>
            <Text style={styles.voiceDesc}>Parla liberamente: descrivi l'intervento e i ricambi usati...</Text>
            <View style={styles.transcriptBox}>
              <Text style={styles.transcriptText}>
                "Sostituite pastiglie freni anteriori e dischi su Ford Transit, 1.5 ore di manodopera, costo ricambi 120 euro..."
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => {
              setShowVoiceModal(false);
              setShowInvoiceModal(true);
            }}
            style={styles.processBtn}
          >
            <Zap size={16} color="#FFFFFF" />
            <Text style={styles.processBtnText}>Elabora con SmartBiz AI</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* MODAL 2: INVOICE ESTIMATE */}
      <Modal visible={showInvoiceModal} animationType="slide">
        <SafeAreaView style={styles.invoiceModalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowInvoiceModal(false)} style={styles.backBtn}>
              <ArrowLeft size={16} color="#94A3B8" />
              <Text style={styles.backBtnText}>Indietro</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Preventivo #8492</Text>
          </View>

          <View style={styles.invoiceCard}>
            <Text style={styles.clientName}>Trasporti Luigi S.r.l.</Text>
            <Text style={styles.vehicleInfo}>Ford Transit 2020</Text>
            
            <View style={styles.divider} />

            <View style={styles.invoiceRow}>
              <Text style={styles.invoiceItem}>Kit Dischi e Pastiglie Freni</Text>
              <Text style={styles.invoicePrice}>€ 120.00</Text>
            </View>
            <View style={styles.invoiceRow}>
              <Text style={styles.invoiceItem}>Manodopera (1.5 ore)</Text>
              <Text style={styles.invoicePrice}>€ 75.00</Text>
            </View>
            <View style={styles.invoiceRow}>
              <Text style={styles.invoiceItem}>IVA (22%)</Text>
              <Text style={styles.invoicePrice}>€ 42.90</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.invoiceRow}>
              <Text style={styles.totalLabel}>TOTALE PREVENTIVO</Text>
              <Text style={styles.totalPrice}>€ 237.90</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.whatsappBtn}>
            <Share2 size={16} color="#FFFFFF" />
            <Text style={styles.whatsappBtnText}>Invia via WhatsApp al Cliente</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* MODAL 3: CALL SCREENING */}
      <Modal visible={showIncomingCall} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <Text style={styles.unknownBadge}>NUMERO SCONOSCIUTO</Text>
          <Text style={styles.callerPhone}>+39 02 9928 1100</Text>
          <Text style={styles.callerCity}>Milano, Italia</Text>

          {isAiScreening ? (
            <View style={styles.transcriptBox}>
              {screeningTranscript.map((line, i) => (
                <Text key={i} style={styles.transcriptText}>{line}</Text>
              ))}
            </View>
          ) : null}

          {!isAiScreening ? (
            <TouchableOpacity onPress={triggerCallScreening} style={styles.aiAnswerBtn}>
              <Shield size={16} color="#FFFFFF" />
              <Text style={styles.aiAnswerBtnText}>LASCIA RISPONDERE ALL'IA</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity 
            onPress={() => { setShowIncomingCall(false); setIsAiScreening(false); }}
            style={styles.closeCallBtn}
          >
            <Text style={styles.closeCallBtnText}>Chiudi Schermata</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  header: { backgroundColor: '#0B0F17', padding: 16, borderBottomWidth: 1, borderBottomColor: '#161F30' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  greetingText: { color: '#94A3B8', fontSize: 12 },
  userName: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  simCallBtn: { backgroundColor: '#161F30', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 6 },
  simCallText: { color: '#3B82F6', fontSize: 12 },
  metricsContainer: { flexDirection: 'row', gap: 8 },
  metricCard: { flex: 1, backgroundColor: '#161F30', padding: 10, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricLabel: { color: '#94A3B8', fontSize: 9, fontWeight: 'bold' },
  metricValue: { color: '#10B981', fontSize: 14, fontWeight: 'bold' },
  metricGoal: { color: '#64748B', fontSize: 10, fontWeight: 'normal' },
  iconBox: { padding: 6, borderRadius: 8 },
  contentArea: { flex: 1, padding: 16 },
  sectionGap: { gap: 12 },
  tabsRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  activeTabPill: { backgroundColor: '#3B82F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  activeTabPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  inactiveTabPill: { backgroundColor: '#161F30', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  inactiveTabPillText: { color: '#94A3B8', fontSize: 12 },
  jobCard: { backgroundColor: '#161F30', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#233047', gap: 10 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  categoryText: { color: '#3B82F6', fontSize: 10, fontWeight: 'bold' },
  clientName: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  vehicleInfo: { color: '#94A3B8', fontSize: 12 },
  badgeWarning: { backgroundColor: 'rgba(245, 158, 11, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 4 },
  badgeWarningText: { color: '#F59E0B', fontSize: 10, fontWeight: 'bold' },
  badgeInfo: { backgroundColor: 'rgba(59, 130, 246, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 4 },
  badgeInfoText: { color: '#3B82F6', fontSize: 10, fontWeight: 'bold' },
  jobDetailBox: { backgroundColor: '#0B0F17', padding: 10, borderRadius: 10 },
  detailLine: { color: '#E2E8F0', fontSize: 12 },
  detailLabel: { color: '#64748B' },
  jobFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  invoiceBtn: { backgroundColor: 'rgba(59, 130, 246, 0.15)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 6 },
  invoiceBtnText: { color: '#3B82F6', fontSize: 12, fontWeight: 'bold' },
  iconBtn: { backgroundColor: '#212E45', padding: 8, borderRadius: 8 },
  bottomBar: { backgroundColor: '#0B0F17', borderTopWidth: 1, borderTopColor: '#161F30', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, position: 'absolute', bottom: 0, left: 0, right: 0 },
  navTab: { alignItems: 'center', justifyContent: 'center' },
  navLabel: { color: '#64748B', fontSize: 10, marginTop: 2 },
  navLabelActive: { color: '#3B82F6', fontWeight: 'bold' },
  fabContainer: { position: 'absolute', bottom: 25, alignSelf: 'center', zIndex: 10 },
  fabButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  bannerShield: { backgroundColor: '#161F30', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#3B82F6' },
  bannerTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  bannerSub: { color: '#94A3B8', fontSize: 12 },
  sectionTitle: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  shieldCardSpam: { backgroundColor: '#161F30', padding: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shieldRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  spamIconBox: { backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: 8, borderRadius: 8 },
  phoneNum: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' },
  spamText: { color: '#EF4444', fontSize: 11 },
  timeText: { color: '#64748B', fontSize: 10 },
  shieldCardLead: { backgroundColor: '#161F30', padding: 12, borderRadius: 12, gap: 8 },
  leadIconBox: { backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: 8, borderRadius: 8 },
  leadText: { color: '#10B981', fontSize: 11 },
  transcriptQuote: { color: '#CBD5E1', fontSize: 12, fontStyle: 'italic', backgroundColor: '#0B0F17', padding: 8, borderRadius: 8 },
  createJobBtn: { backgroundColor: 'rgba(59, 130, 246, 0.2)', padding: 8, borderRadius: 8, alignItems: 'center' },
  createJobBtnText: { color: '#3B82F6', fontSize: 12, fontWeight: 'bold' },
  cameraBox: { height: 200, backgroundColor: '#000000', borderRadius: 16, justifyContent: 'space-between', padding: 12, borderWidth: 1, borderColor: '#233047' },
  cameraHud: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hudBadge: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 6 },
  hudBadgeText: { color: '#60A5FA', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' },
  hudSub: { color: '#94A3B8', fontSize: 10, fontFamily: 'monospace' },
  scanResultCard: { backgroundColor: 'rgba(0,0,0,0.8)', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.4)' },
  scanTitle: { color: '#34D399', fontSize: 12, fontWeight: 'bold' },
  scanComponent: { color: '#CBD5E1', fontSize: 11 },
  scanStatus: { color: '#FBBF24', fontSize: 10, fontWeight: '600' },
  scanBtn: { backgroundColor: '#2563EB', paddingVertical: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  scanBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  chatBox: { backgroundColor: '#161F30', borderRadius: 16, padding: 12, height: 220 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#233047' },
  chatTitle: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  chatMessagesList: { flex: 1, marginVertical: 8 },
  msgRow: { marginBottom: 6, flexDirection: 'row' },
  msgUser: { justifyContent: 'flex-end' },
  msgAi: { justifyContent: 'flex-start' },
  msgBubble: { padding: 8, borderRadius: 10, maxWidth: '80%' },
  bubbleUser: { backgroundColor: '#3B82F6' },
  bubbleAi: { backgroundColor: '#0B0F17' },
  msgText: { color: '#FFFFFF', fontSize: 12 },
  codeBox: { marginTop: 4, backgroundColor: '#161F30', padding: 4, borderRadius: 4 },
  codeText: { color: '#60A5FA', fontSize: 10, fontFamily: 'monospace' },
  chatInputRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: '#0B0F17', color: '#FFFFFF', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, fontSize: 12 },
  sendBtn: { backgroundColor: '#3B82F6', padding: 8, borderRadius: 8 },
  clientItem: { backgroundColor: '#161F30', padding: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clientSub: { color: '#94A3B8', fontSize: 11 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', padding: 20, justifyContent: 'space-between' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { color: '#3B82F6', fontSize: 12, fontWeight: 'bold' },
  voiceCenterArea: { alignItems: 'center', gap: 12, marginVertical: 'auto' },
  voiceCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  voiceTimer: { color: '#FFFFFF', fontSize: 14, fontFamily: 'monospace' },
  voiceDesc: { color: '#94A3B8', fontSize: 12, textAlign: 'center' },
  transcriptBox: { backgroundColor: '#161F30', padding: 12, borderRadius: 10, width: '100%' },
  transcriptText: { color: '#E2E8F0', fontSize: 12, fontStyle: 'italic' },
  processBtn: { backgroundColor: '#3B82F6', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  processBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  invoiceModalContainer: { flex: 1, backgroundColor: '#0B0F17', padding: 16, justifyContent: 'space-between' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backBtnText: { color: '#94A3B8', fontSize: 12 },
  invoiceCard: { backgroundColor: '#161F30', padding: 16, borderRadius: 16, gap: 10 },
  divider: { height: 1, backgroundColor: '#233047', marginVertical: 4 },
  invoiceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  invoiceItem: { color: '#E2E8F0', fontSize: 12 },
  invoicePrice: { color: '#FFFFFF', fontSize: 12, fontFamily: 'monospace' },
  totalLabel: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  totalPrice: { color: '#10B981', fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace' },
  whatsappBtn: { backgroundColor: '#10B981', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  whatsappBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  unknownBadge: { color: '#EF4444', fontSize: 10, textAlign: 'center' },
  callerPhone: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  callerCity: { color: '#94A3B8', fontSize: 12, textAlign: 'center' },
  aiAnswerBtn: { backgroundColor: '#3B82F6', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  aiAnswerBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  closeCallBtn: { backgroundColor: '#161F30', padding: 12, borderRadius: 12, alignItems: 'center' },
  closeCallBtnText: { color: '#94A3B8', fontSize: 12 }
});