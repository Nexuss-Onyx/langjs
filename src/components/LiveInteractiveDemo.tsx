import React, { useState } from 'react';
import { LANGUAGES, SupportedLanguage } from '../data/translations';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { Code, Eye, RefreshCw, Sparkles, CheckCircle2, ShieldCheck, Zap, Globe, ChevronDown } from 'lucide-react';

interface MockSiteContent {
  title: string;
  tagline: string;
  ctaText: string;
  badge: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  placeholder: string;
  subscribeBtn: string;
  overrideActiveNotice: string;
}

const MOCK_SITE_TRANSLATIONS: Record<string, MockSiteContent> = {
  en: {
    title: 'Artisanal Velvet Timepieces',
    tagline: 'Handcrafted precision horology engineered for the discerning collector.',
    ctaText: 'Reserve Limited Edition',
    badge: 'Limited Heritage Batch #48',
    card1Title: 'Tourbillon Movement',
    card1Desc: 'Grade 5 titanium escapement with 72-hour power reserve.',
    card2Title: 'Burgundy Enamel Dial',
    card2Desc: 'Triple-fired Grand Feu vitreous enamel with rose gold indexes.',
    placeholder: 'Enter your email for private allotment...',
    subscribeBtn: 'Request Allocation',
    overrideActiveNotice: 'Custom human copy override active for brand tagline',
  },
  es: {
    title: 'Relojes de Terciopelo Artesanales',
    tagline: 'Horología de precisión hecha a mano para el coleccionista más exigente.',
    ctaText: 'Reservar Edición Limitada',
    badge: 'Lote Patrimonial Limitado #48',
    card1Title: 'Movimiento Tourbillon',
    card1Desc: 'Escape de titanio grado 5 con reserva de marcha de 72 horas.',
    card2Title: 'Esfera Esmalte Borgoña',
    card2Desc: 'Esmalte vítreo Grand Feu de triple cocción con índices de oro rosa.',
    placeholder: 'Introduce tu correo para asignación privada...',
    subscribeBtn: 'Solicitar Asignación',
    overrideActiveNotice: 'Sobrescritura manual activa (locales/es.json)',
  },
  fr: {
    title: 'Garde-Temps en Velours Artisanal',
    tagline: 'Horlogerie de précision façonnée à la main pour le collectionneur averti.',
    ctaText: 'Réserver l’Édition Limitée',
    badge: 'Lot Patrimonial Limité #48',
    card1Title: 'Mouvement Tourbillon',
    card1Desc: 'Échappement en titane grade 5 avec réserve de marche de 72 heures.',
    card2Title: 'Cadran Émail Bourgogne',
    card2Desc: 'Émail vitrifié Grand Feu triple cuisson avec index or rose.',
    placeholder: 'Entrez votre email pour l’allocation privée...',
    subscribeBtn: 'Demander l’Allocation',
    overrideActiveNotice: 'Remplacement manuel actif (locales/fr.json)',
  },
  de: {
    title: 'Handgefertigte Sammleruhren',
    tagline: 'Präzisions-Uhrmacherkunst für anspruchsvolle Uhrenliebhaber.',
    ctaText: 'Limitierte Edition Reservieren',
    badge: 'Limitierte Heritage-Serie #48',
    card1Title: 'Tourbillon-Uhrwerk',
    card1Desc: 'Grad-5-Titanhemmung mit 72 Stunden Gangreserve.',
    card2Title: 'Burgunder Emaille-Zifferblatt',
    card2Desc: 'Dreifach gebranntes Grand-Feu-Emaille mit Roségold-Indizes.',
    placeholder: 'E-Mail für private Zuteilung eingeben...',
    subscribeBtn: 'Zuteilung Anfordern',
    overrideActiveNotice: 'Manuelle Überschreibung aktiv (locales/de.json)',
  },
  ja: {
    title: '職人仕立ての最高峰タイムピース',
    tagline: '審美眼を持つコレクターのために手作業で組み上げられた精密機械式時計。',
    ctaText: '限定モデルを先行予約',
    badge: '限定ヘリテージバッチ #48',
    card1Title: 'トゥールビヨン機構',
    card1Desc: 'グレード5チタン製脱進機、72時間パワーリザーブ搭載。',
    card2Title: 'バーガンディ エナメル文字盤',
    card2Desc: '3度焼き上げたグラン・フー本七宝エナメルとローズゴールドインデックス。',
    placeholder: '先行割当のご案内を受け取るメールアドレスを入力...',
    subscribeBtn: '先行割当を申し込む',
    overrideActiveNotice: 'ブランド特約カスタム辞書適用済み (locales/ja.json)',
  },
  ar: {
    title: 'ساعات يد كلاسيكية فاخرة ومصنوعة يدوياً',
    tagline: 'دقة سويسرية فائقة صُنعت بحرفية استثنائية لأرقى جامعي الساعات الفاخرة.',
    ctaText: 'حجز الإصدار الحصري المحدود',
    badge: 'دفعة التراث الحصرية رقم 48',
    card1Title: 'آلية توربيون فائقة',
    card1Desc: 'ميزان من التيتانيوم عالي الجودة مع احتياطي طاقة لمدة 72 ساعة.',
    card2Title: 'ميناء مطلي بمينا العنابي الملكي',
    card2Desc: 'مينا زجاجي ثلاثي الحرق بلمسات وأرقام من الذهب الوردي عيار 18.',
    placeholder: 'أدخل بريدك الإلكتروني للحصول على تخصيص خاص...',
    subscribeBtn: 'طلب الحصة الخاصة',
    overrideActiveNotice: 'تخصيص يدوي معتمد نشط (locales/ar.json)',
  },
  it: {
    title: 'Orologi di Velluto Artigianali',
    tagline: 'Orologeria di precisione realizzata a mano per i collezionisti più esigenti.',
    ctaText: 'Prenota Edizione Limitata',
    badge: 'Lotto Heritage Limitato #48',
    card1Title: 'Movimento Tourbillon',
    card1Desc: 'Scappamento in titanio grado 5 con 72 ore di riserva di carica.',
    card2Title: 'Quadrante in Smalto Borgogna',
    card2Desc: 'Smalto vitreo Grand Feu a tripla cottura con indici in oro rosa.',
    placeholder: 'Inserisci la tua email per l’assegnazione privata...',
    subscribeBtn: 'Richiedi Assegnazione',
    overrideActiveNotice: 'Traduzione neurale Google Translate attiva',
  },
  pt: {
    title: 'Relógios de Veludo Artesanais',
    tagline: 'Horologia de precisão feita à mão para colecionadores exigentes.',
    ctaText: 'Reservar Edição Limitada',
    badge: 'Lote Patrimonial Limitado #48',
    card1Title: 'Movimento Tourbillon',
    card1Desc: 'Escape de titânio grau 5 com reserva de marcha de 72 horas.',
    card2Title: 'Mostrador Esmalte Borgonha',
    card2Desc: 'Esmalte vítreo Grand Feu de queima tripla com índices em ouro rosa.',
    placeholder: 'Insira seu email para alocação privada...',
    subscribeBtn: 'Solicitar Alocação',
    overrideActiveNotice: 'Traduzione neurale Google Translate ativa',
  },
  zh: {
    title: '手工天鹅绒奢华腕表',
    tagline: '为品味卓越的收藏家手工打造的至臻精准制表工艺。',
    ctaText: '预订典藏限量版',
    badge: '限量传承系列第48批',
    card1Title: '陀飞轮机芯',
    card1Desc: '5级钛金属擒纵机构，具备72小时超长动力储备。',
    card2Title: '勃艮第珐琅表盘',
    card2Desc: '三次烧制的大明火微绘珐琅，配以玫瑰金立体时标。',
    placeholder: '输入您的邮箱获取私享配额...',
    subscribeBtn: '申请专属配额',
    overrideActiveNotice: 'Google Translate 神经引擎即时翻译',
  },
};

export const LiveInteractiveDemo: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>('es');
  const [showTokens, setShowTokens] = useState(true);
  const [useCustomOverride, setUseCustomOverride] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationLatency, setTranslationLatency] = useState(11);
  const [moreDropdown, setMoreDropdown] = useState(false);

  const handleLangSelect = (lang: string) => {
    setIsTranslating(true);
    setSelectedLang(lang);
    setMoreDropdown(false);
    const simulatedLatency = Math.floor(Math.random() * 8) + 6;
    setTranslationLatency(simulatedLatency);
    setTimeout(() => {
      setIsTranslating(false);
    }, 220);
  };

  const currentLangObj = ALL_100_LANGUAGES.find((l) => l.code === selectedLang) || ALL_100_LANGUAGES[0];
  const isRtl = currentLangObj.dir === 'rtl';

  const content = MOCK_SITE_TRANSLATIONS[selectedLang] || {
    title: `${currentLangObj.name} Artisanal Timepieces`,
    tagline: `[Google Translate Neural]: Handcrafted precision horology translated into ${currentLangObj.name}.`,
    ctaText: `Reserve (${currentLangObj.nativeName})`,
    badge: `Batch #48 · ${currentLangObj.code.toUpperCase()}`,
    card1Title: 'Tourbillon Movement',
    card1Desc: 'Grade 5 titanium escapement with 72-hour power reserve.',
    card2Title: 'Burgundy Enamel Dial',
    card2Desc: 'Triple-fired Grand Feu vitreous enamel with rose gold indexes.',
    placeholder: 'Enter your email for private allotment...',
    subscribeBtn: 'Request Allocation',
    overrideActiveNotice: `Active Google Translate Neural Engine [${currentLangObj.code}]`,
  };

  return (
    <section id="sandbox" className="relative scroll-mt-24 py-20 lg:py-28 bg-[#090205]">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute inset-0 bg-burgundy-glow opacity-70" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="text-xs font-mono-code text-rose-300 uppercase tracking-wider">
            Interactive Live Sandbox
          </div>
          <h2 className="mt-3 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Experience Langjs in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#ebdcc9]/80">
            Select any language to test client-side DOM TreeWalker parsing, attribute translation, and zero-layout-shift mutation.
          </p>
        </div>

        {/* Sandbox Control Deck */}
        <div className="mt-10 rounded-2xl border border-[#f6efe2]/15 bg-[#17050f]/90 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          {/* Controls row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f6efe2]/10 pb-5">
            {/* Language Switcher Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[#ebdcc9]/70 mr-1 hidden sm:inline">
                Target Language:
              </span>
              {ALL_100_LANGUAGES.slice(0, 7).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangSelect(lang.code)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedLang === lang.code
                      ? 'luxury-button-primary text-white scale-105 shadow-md'
                      : 'border border-[#f6efe2]/10 bg-[#250817]/60 text-[#ebdcc9] hover:border-[#be185d]/40 hover:bg-[#320c20]'
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="font-semibold">{lang.nativeName}</span>
                </button>
              ))}

              {/* 100+ More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreDropdown(!moreDropdown)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#be185d]/40 bg-[#1c0612] px-3 py-1.5 text-xs font-semibold text-rose-300 transition-all hover:bg-[#2e091d]"
                >
                  <Globe className="h-3.5 w-3.5 text-[#e11d48]" />
                  <span>100+ More</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {moreDropdown && (
                  <div className="absolute left-0 mt-2 max-h-60 w-56 overflow-y-auto rounded-xl border border-[#f6efe2]/20 bg-[#14030d]/95 p-1.5 shadow-2xl z-30 backdrop-blur-2xl">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ebdcc9]/50">
                      All 100+ Global Locales
                    </div>
                    {ALL_100_LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => handleLangSelect(l.code)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                          selectedLang === l.code
                            ? 'bg-[#9e1b32] text-white'
                            : 'text-[#ebdcc9]/80 hover:bg-[#230816] hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span>{l.flag}</span>
                          <span className="truncate">{l.name} ({l.nativeName})</span>
                        </span>
                        <span className="font-mono-code text-[10px] text-rose-300/80">{l.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Toggle Modes */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTokens(!showTokens)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  showTokens
                    ? 'border-[#e11d48] bg-[#4a0d24]/60 text-[#fdfbf7]'
                    : 'border-[#f6efe2]/10 bg-[#1e0712]/60 text-[#ebdcc9]/60 hover:text-[#ebdcc9]'
                }`}
                title="Toggle highlighted DOM token IDs"
              >
                <Eye className="h-3.5 w-3.5 text-[#e11d48]" />
                <span>Inspect DOM Nodes</span>
              </button>

              <button
                onClick={() => setUseCustomOverride(!useCustomOverride)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  useCustomOverride
                    ? 'border-amber-500/60 bg-amber-950/30 text-amber-200'
                    : 'border-[#f6efe2]/10 bg-[#1e0712]/60 text-[#ebdcc9]/60 hover:text-[#ebdcc9]'
                }`}
                title="Toggle custom JSON file overrides"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>JSON Overrides</span>
              </button>
            </div>
          </div>

          {/* Engine Telemetry Ribbon */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-[#ebdcc9]/70">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>TreeWalker: 16 Text Nodes Tracked</span>
              </span>
              <span className="hidden md:inline text-[#ebdcc9]/40">·</span>
              <span className="hidden md:inline text-[#ebdcc9]/60">
                Token Strategy: <code className="text-rose-300">data-langjs-id</code>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#ebdcc9]">
                Latency: <span className="font-bold text-emerald-400">{translationLatency}ms</span>
              </span>
              <span className="text-[#ebdcc9]/40">·</span>
              <span className="text-[#ebdcc9]/80">Layout Shift: 0.000 CLS</span>
            </div>
          </div>

          {/* Live Preview Container Frame */}
          <div
            className={`mt-6 overflow-hidden rounded-xl border border-[#f6efe2]/15 bg-[#12030b] p-6 shadow-inner transition-all duration-300 sm:p-10 ${
              isTranslating ? 'opacity-70 scale-[0.998]' : 'opacity-100 scale-100'
            }`}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Inner Mock Luxury Website */}
            <div className="mx-auto max-w-3xl space-y-8">
              {/* Header inside mock site */}
              <div className="flex items-center justify-between border-b border-[#f6efe2]/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#e11d48]" />
                  <span className="font-serif-luxury text-lg font-bold text-[#fdfbf7]">
                    VALLIÈRE GENÈVE
                  </span>
                </div>
                
                <div className="relative">
                  <span
                    className={`inline-block text-xs font-medium text-[#cbb89e] transition-colors ${
                      showTokens ? 'ring-1 ring-rose-500/60 bg-rose-950/40 px-2 py-0.5 rounded' : ''
                    }`}
                  >
                    {content.badge}
                  </span>
                  {showTokens && (
                    <span className="absolute -top-4 right-0 font-mono-code text-[9px] text-rose-400">
                      [data-langjs-id="tag_48"]
                    </span>
                  )}
                </div>
              </div>

              {/* Main Headline & Tagline */}
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <h3
                    className={`font-serif-luxury text-3xl font-semibold text-[#fdfbf7] sm:text-4xl transition-colors ${
                      showTokens ? 'ring-1 ring-[#e11d48]/70 bg-[#3b0b1c]/30 px-3 py-1 rounded-lg' : ''
                    }`}
                  >
                    {content.title}
                  </h3>
                  {showTokens && (
                    <span className="absolute -top-3.5 left-2 font-mono-code text-[9px] text-rose-300 bg-[#1f0712] px-1 rounded border border-rose-500/40">
                      class="langjs-node langjs-h1"
                    </span>
                  )}
                </div>

                <div className="relative">
                  <p
                    className={`mx-auto max-w-xl text-sm sm:text-base text-[#ebdcc9]/90 leading-relaxed transition-colors ${
                      showTokens ? 'ring-1 ring-amber-500/50 bg-amber-950/20 p-2 rounded-lg' : ''
                    }`}
                  >
                    {content.tagline}
                  </p>
                  {showTokens && (
                    <span className="font-mono-code text-[9px] text-amber-300 block mt-1">
                      {useCustomOverride ? '✨ [OVERRIDE ACTIVE via locales/es.json]' : '⚡ [AUTO GOOGLE TRANSLATE ENGINE]'}
                    </span>
                  )}
                </div>

                <div>
                  <button
                    className={`luxury-button-primary rounded-xl px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-transform hover:scale-105 ${
                      showTokens ? 'ring-2 ring-emerald-400/60' : ''
                    }`}
                  >
                    {content.ctaText}
                  </button>
                  {showTokens && (
                    <div className="mt-1 font-mono-code text-[9px] text-emerald-400">
                      langjs.track(button, {'{'} id: 'cta_reserve' {'}'})
                    </div>
                  )}
                </div>
              </div>

              {/* 2-Column Mock Features */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                <div
                  className={`rounded-xl border border-[#f6efe2]/10 bg-[#1c0613]/70 p-5 ${
                    showTokens ? 'ring-1 ring-rose-500/40' : ''
                  }`}
                >
                  <h4 className="font-serif-luxury text-lg font-semibold text-[#fdfbf7]">
                    {content.card1Title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#ebdcc9]/80">
                    {content.card1Desc}
                  </p>
                  {showTokens && (
                    <span className="mt-3 inline-block font-mono-code text-[9px] text-rose-400/80">
                      data-langjs-token="c1_desc"
                    </span>
                  )}
                </div>

                <div
                  className={`rounded-xl border border-[#f6efe2]/10 bg-[#1c0613]/70 p-5 ${
                    showTokens ? 'ring-1 ring-rose-500/40' : ''
                  }`}
                >
                  <h4 className="font-serif-luxury text-lg font-semibold text-[#fdfbf7]">
                    {content.card2Title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#ebdcc9]/80">
                    {content.card2Desc}
                  </p>
                  {showTokens && (
                    <span className="mt-3 inline-block font-mono-code text-[9px] text-rose-400/80">
                      data-langjs-token="c2_desc"
                    </span>
                  )}
                </div>
              </div>

              {/* Mock Newsletter / Private Allotment Input */}
              <div className="rounded-xl border border-[#f6efe2]/10 bg-[#17050f] p-4 text-center sm:p-6">
                <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    readOnly
                    placeholder={content.placeholder}
                    className="flex-1 rounded-lg border border-[#f6efe2]/15 bg-[#0b0207] px-3.5 py-2 text-xs text-[#ebdcc9] placeholder:text-[#ebdcc9]/50 focus:outline-none"
                  />
                  <button className="luxury-button-cream whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold text-[#090205]">
                    {content.subscribeBtn}
                  </button>
                </div>
                {showTokens && (
                  <div className="mt-2 font-mono-code text-[9px] text-rose-300">
                    &lt;input placeholder="..." data-langjs-attr="placeholder" /&gt;
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
