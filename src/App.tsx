import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  Download,
  Users,
  Swords,
  Shield,
  Star,
  Map,
  Trophy,
  Zap,
  Heart,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  Search,
  Filter,
  CheckCircle2,
  Info,
  Calendar,
  Sparkles,
  Volume2,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import twilightLogo from "./assets/images/twilight_logo_1782668675367.jpg";

// Types
interface Notice {
  date: string;
  tag: "공지" | "이벤트" | "패치";
  title: string;
  content: string;
}

interface HuntingZone {
  name: string;
  level: string;
  difficulty: "하" | "중하" | "중" | "중상" | "상" | "최상";
  desc: string;
  color: string;
  border: string;
  bgGlow: string;
  drops: string[];
}

const NAV_LINKS = [
  { label: "서버소개", href: "#intro" },
  { label: "공지사항", href: "#notices" },
  { label: "서버특징", href: "#features" },
  { label: "사냥터정보", href: "#zones" },
  { label: "다운로드", href: "#download" },
  { label: "커뮤니티", href: "#community" },
];

const FEATURES = [
  {
    icon: <Zap size={24} />,
    title: "즉시 사냥 가능",
    desc: "접속 즉시 스타터 장비와 소비 아이템 지급. 오대기 후 최고 속도로 전장 합류.",
    badge: "인기"
  },
  {
    icon: <Shield size={24} />,
    title: "완벽한 클래스 밸런스",
    desc: "서버 전용 밸런싱 패치를 통해 소외되는 직업 없이 치열하고 흥미진진한 PvP 구도.",
    badge: "핵심"
  },
  {
    icon: <Trophy size={24} />,
    title: "명예의 전당 랭킹",
    desc: "종합 레벨, 주간 PvP 처치 수, 공성 기여도에 따른 실시간 랭킹 추적 및 특별 칭호/오라 부여.",
    badge: "경쟁"
  },
  {
    icon: <Map size={24} />,
    title: "특화 던전 분리",
    desc: "던전별 아이템 드랍 분리.",
    badge: "컨텐츠"
  },
  {
    icon: <Users size={24} />,
    title: "혈맹 시스템",
    desc: "혈맹원을 모으고, 혈맹원들과 함께 보스를 토벌하세요.",
    badge: "협동"
  },
];

const HUNTING_ZONES: HuntingZone[] = [
  {
    name: "본토",
    level: "1 ~ 40",
    difficulty: "하",
    desc: "놀, 라이칸스로프 등을 위주로 사냥, 장비가 된다면 오우거까지",
    color: "text-emerald-400",
    border: "border-emerald-950 hover:border-emerald-500/50",
    bgGlow: "rgba(16,185,129,0.03)",
    drops: ["무기마법주문서", "갑옷마법주문서"]
  },
  {
    name: "엘모어의 밭",
    level: "20 ~ 45",
    difficulty: "중하",
    desc: "본격적인 모험이 시작, 엘모어들을 사냥하며 필수템들을 득템하세.",
    color: "text-lime-400",
    border: "border-lime-950 hover:border-lime-500/50",
    bgGlow: "rgba(132,204,22,0.03)",
    drops: ["대검", "마나의지팡이", "쇼크 스턴"]
  },
  {
    name: "용의 계곡",
    level: "30 ~ 50",
    difficulty: "중",
    desc: "가장 인기가 많았던 사냥터.",
    color: "text-amber-400",
    border: "border-amber-950 hover:border-amber-500/50",
    bgGlow: "rgba(245,158,11,0.03)",
    drops: ["오우거 - 오우거의피, 오우거의벨트"]
  },
  {
    name: "버려진 땅",
    level: "45 ~ 52",
    difficulty: "중",
    desc: "경험치를 위한 필수 사냥터.",
    color: "text-red-400",
    border: "border-red-950 hover:border-red-500/50",
    bgGlow: "rgba(239,68,68,0.03)",
    drops: [" 경험치 "]
  },
  {
    name: "기란던전",
    level: "50 ~ ",
    difficulty: "중상",
    desc: "엘릭서와 같은 필수템들 드랍",
    color: "text-fuchsia-400",
    border: "border-fuchsia-950 hover:border-fuchsia-500/50",
    bgGlow: "rgba(217,70,239,0.03)",
    drops: ["퓨어엘릭서, 스탯부츠"]
  },
];

const DOWNLOAD_LINKS = [
  { label: "클라이언트 종합 다운로드", size: "2.3 GB", primary: true, speed: "최대 100MB/s" },
];

const SERVER_STATS = [
  { label: "경험치 배율", value: "x1", sub: "EXP RATE", desc: "지루함 없는 폭풍 성장" },
  { label: "아이템 드랍", value: "x1", sub: "DROP RATE", desc: "득템의 손맛과 짜릿함" },
  { label: "아데나 배율", value: "x1", sub: "GOLD RATE", desc: "넉넉하고 원활한 경제" },
  { label: "서버 시즌", value: "Season 1", sub: "TWILIGHT OPEN", desc: "매주 이벤트 예정" },
];

const NOTICES: Notice[] = [
  {
    date: "2026.06.28",
    tag: "공지",
    title: "황혼서버 신규 오픈 예정",
    content: "클래식의 오리지널함과 새로운 아이템들의 조화를 완성시켰으니 쾌적하게 즐겨주시기 바랍니다."
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Notice & Search states
  const [noticeTab, setNoticeTab] = useState<"전체" | "공지" | "이벤트" | "패치">("전체");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  
  // Hunting Zone states
  const [zoneSearch, setZoneSearch] = useState("");
  const [zoneDiffFilter, setZoneDiffFilter] = useState<string>("전체");

  // Live simulation state
  const [onlinePlayers, setOnlinePlayers] = useState(384);
  const [activeFightsCount, setActiveFightsCount] = useState(148);

  // Download guide modal state
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedDownloadLabel, setSelectedDownloadLabel] = useState("");

  // Simulated player fluctuation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlinePlayers((prev) => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const next = prev + change;
        return next < 300 ? 320 : next > 500 ? 450 : next;
      });
      setActiveFightsCount((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        return next < 100 ? 120 : next > 200 ? 180 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.slice(1));
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtered Notices
  const filteredNotices = useMemo(() => {
    if (noticeTab === "전체") return NOTICES;
    return NOTICES.filter((n) => n.tag === noticeTab);
  }, [noticeTab]);

  // Filtered Hunting Zones
  const filteredZones = useMemo(() => {
    return HUNTING_ZONES.filter((z) => {
      const matchesSearch = z.name.toLowerCase().includes(zoneSearch.toLowerCase()) || 
                            z.drops.some(d => d.toLowerCase().includes(zoneSearch.toLowerCase()));
      const matchesDiff = zoneDiffFilter === "전체" || z.difficulty === zoneDiffFilter;
      return matchesSearch && matchesDiff;
    });
  }, [zoneSearch, zoneDiffFilter]);

  // Promo text copy function
  const promoText = `리니지 [황혼서버] 대오픈!
◈ 경험치 1배 / 드랍 1배 / 아데나 1배 특화 배율!
◈ 접속 즉시 스타터 장비 지급!
◈ 특정 던전 자동 사냥 시스템 탑재 (바쁜 직장인 안성맞춤)
◈ 전 직업 완벽 밸런스 실시간 조율 및 무소과금도 최고템 제작 및 획득 가능!
◈ 보스코인으로 보스드랍템 구입 가능
◈ 새로운 아이템 및 세트로 스펙업 가능`;
  const handleCopyPromo = () => {
    navigator.clipboard.writeText(promoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openDownloadModal = (label: string) => {
    setSelectedDownloadLabel(label);
    setDownloadModalOpen(true);
  };

  return (
    <div
      className="min-h-screen bg-[#06030c] text-[#ece8e1] relative overflow-x-hidden selection:bg-[#c8952a]/30 selection:text-[#c8952a]"
      style={{ fontFamily: "'Inter', 'Noto Sans KR', sans-serif" }}
    >
      {/* Background Decorative Grains & Radial Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dark Red Vignette Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px] bg-red-900" />
        {/* Golden center ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[130px] bg-amber-600" />
        {/* Deep Purple/Fuchsia ambient glow */}
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[150px] bg-fuchsia-900" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      </div>

      {/* ─── HEADER ─── */}
      <header
        className="sticky top-0 z-50 border-b border-white/5 transition-all"
        style={{
          background: "rgba(6, 3, 12, 0.9)",
          backdropFilter: "blur(16px)",
        }}
        id="header-app"
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <a href="#intro" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden shadow-lg shadow-black/40 transition-transform group-hover:scale-105 border border-[#c8952a]/30">
              <img
                src={twilightLogo}
                alt="황혼서버 Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p
                className="text-[#e8dfc8] font-black leading-none tracking-widest text-base group-hover:text-[#c8952a] transition-colors"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                황혼서버
              </p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider font-mono mt-0.5">Classic Twilight Server</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all rounded ${
                    isActive
                      ? "text-[#c8952a] bg-[#c8952a]/5"
                      : "text-white/60 hover:text-[#e8dfc8] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#download"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded uppercase tracking-wider text-[#06030c] transition-all hover:brightness-110 active:scale-95 shadow-md shadow-amber-950/20"
              style={{ background: "linear-gradient(135deg, #c8952a, #a07020)" }}
              id="header-dl-btn"
            >
              <Download size={13} />
              다운로드
            </a>

            <button
              className="md:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              id="menu-toggle-btn"
            >
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${mobileNavOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/5 bg-[#0a0712] overflow-hidden"
              id="mobile-nav-panel"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block py-2.5 px-3 text-sm font-semibold rounded transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "text-[#c8952a] bg-[#c8952a]/5 border-l-2 border-[#c8952a]"
                        : "text-white/60 hover:text-white"
                    }`}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section id="intro" className="relative min-h-[95vh] flex items-center pt-12 pb-24 overflow-hidden" md-id="hero-section">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80"
            alt="Dark Fantasy Castle"
            className="w-full h-full object-cover opacity-[0.14] scale-105 pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06030c]/10 via-[#06030c]/70 to-[#06030c]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c8952a]/20 bg-[#c8952a]/5 text-xs font-semibold text-[#c8952a] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="font-mono tracking-wide">7월23일 대오픈!</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-[#e8dfc8]"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              황혼의 세계에서<br />
              <span className="bg-gradient-to-r from-[#c8952a] via-[#e8dfc8] to-[#9c6e14] bg-clip-text text-transparent">
                전설을 새기다
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/70 text-sm sm:text-base leading-relaxed mb-10 max-w-xl"
            >
              옛날의감성을 어쩌고저쩌고 하던 지루함에서 해방되십시오. 
              클래식 설계와 기존과는 다르게 추가된 아이템들과 함께 최고의 재미를 약속합니다. 
              검증된 밸런스, 격주 전장, 정당한 보상을 통해 황혼서버 본연의 재미에 빠져보세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#download"
                className="flex items-center justify-center gap-2.5 px-7 py-4 font-bold text-sm rounded bg-gradient-to-r from-[#c8952a] to-[#a07020] text-[#06030c] hover:brightness-110 transition-all shadow-xl shadow-amber-950/20 active:scale-95"
                id="hero-download-action"
              >
                <Download size={16} />
                초고속 클라이언트 다운로드
              </a>
              <a
                href="#zones"
                className="flex items-center justify-center gap-2 px-7 py-4 font-bold text-sm rounded border border-[#c8952a]/30 text-[#c8952a] hover:bg-[#c8952a]/5 transition-all active:scale-95"
                id="hero-zones-action"
              >
                <Map size={16} />
                사냥터 정보 및 드랍률
              </a>
            </motion.div>
          </div>

          {/* Stats Display Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 relative"
            id="server-rate-grid"
          >
            {/* Background ambient square to draw eye */}
            <div className="absolute inset-0 bg-[#c8952a]/2 rounded-xl blur-2xl pointer-events-none" />
            {SERVER_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-[#0e0a19]/80 border border-[#c8952a]/15 rounded-xl p-6 text-center shadow-2xl relative overflow-hidden group hover:border-[#c8952a]/40 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c8952a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -right-4 -bottom-4 text-white/3 font-black text-6xl pointer-events-none select-none">
                  {i + 1}
                </span>
                <p className="text-xs font-mono tracking-widest text-[#c8952a] uppercase mb-1">{stat.sub}</p>
                <p
                  className="text-4xl font-extrabold text-[#e8dfc8] my-2 tracking-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-semibold text-white/80">{stat.label}</p>
                <p className="text-[10px] text-white/40 mt-1 leading-normal font-light">{stat.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── NOTICES SECTION ─── */}
      <section id="notices" className="py-24 border-y border-white/5 bg-[#080510]/60 relative z-10" md-id="notices-section">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs tracking-widest text-[#c8952a] font-mono uppercase mb-2">Bulletin Board</p>
              <h2 className="text-3xl font-black text-[#e8dfc8]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                소식 및 패치노트
              </h2>
            </div>
            {/* Filter Tabs */}
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/5 self-start">
              {(["전체", "공지", "이벤트", "패치"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    noticeTab === tab
                      ? "bg-[#c8952a] text-[#06030c] font-black"
                      : "text-white/60 hover:text-white"
                  }`}
                  onClick={() => {
                    setNoticeTab(tab);
                    setSelectedNotice(null); // Reset detail when switching tabs
                  }}
                  id={`tab-notice-${tab}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredNotices.map((notice, i) => {
              const badgeColors = {
                공지: "bg-amber-500/10 text-amber-300 border-amber-500/20",
                이벤트: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
                패치: "bg-sky-500/10 text-sky-300 border-sky-500/20",
              };
              const isSelected = selectedNotice?.title === notice.title;

              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-[#c8952a]/40 bg-[#0c0916]"
                      : "border-white/5 bg-[#0e0a17]/50 hover:bg-[#0e0a17]/90 hover:border-white/10"
                  }`}
                  onClick={() => setSelectedNotice(isSelected ? null : notice)}
                  id={`notice-item-${i}`}
                >
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded border shrink-0 ${badgeColors[notice.tag]}`}>
                        {notice.tag}
                      </span>
                      <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                        {notice.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className="text-[11px] font-mono text-white/40">{notice.date}</span>
                      <ChevronDown
                        size={14}
                        className={`text-white/30 transition-transform duration-200 ${isSelected ? "rotate-180 text-[#c8952a]" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expandable Notice Content */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 bg-[#07050e] whitespace-pre-line">
                          {notice.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SERVER FEATURES SECTION ─── */}
      <section id="features" className="py-24 relative z-10" md-id="features-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-[#c8952a] font-mono uppercase mb-2">Designed for Excitement</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#e8dfc8]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              황혼서버 시그니처 특징
            </h2>
            <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c8952a] to-transparent" />
            <p className="text-white/50 text-sm mt-4 max-w-lg mx-auto">
              오직 플레이어의 쾌감과 안정성에 초점을 맞췄습니다. 클래식 본연의 느낌과 추가된 아이템들의 득템을 융합한 시스템입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="features-grid">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="bg-[#0a0712] border border-[#c8952a]/10 rounded-xl p-6 transition-all hover:border-[#c8952a]/40 group relative overflow-hidden hover:-translate-y-1 duration-300"
              >
                {/* Decorative border indicator */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#c8952a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-5">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#c8952a]/15 to-transparent flex items-center justify-center text-[#c8952a] transition-all group-hover:scale-110">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-white/30 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {feat.badge}
                  </span>
                </div>
                
                <h3 className="font-bold text-sm text-[#e8dfc8] mb-2.5" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                  {feat.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HUNTING ZONES SECTION ─── */}
      <section id="zones" className="py-24 border-t border-white/5 bg-[#080510]/40 relative z-10" md-id="hunting-zones-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-[#c8952a] font-mono uppercase mb-2">Tactical Hunting ground</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#e8dfc8]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              실시간 사냥터 & 드롭 가이드
            </h2>
            <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c8952a] to-transparent" />
            <p className="text-white/50 text-sm mt-4 max-w-lg mx-auto">
              자신의 레벨과 장비에 알맞은 구역을 선택해 진입하십시오. 위험도가 높을수록 떨어지는 혜택도 커집니다.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-[#0c0916] border border-white/5 rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                <Search size={15} />
              </span>
              <input
                type="text"
                placeholder="사냥터 이름 또는 드랍 아이템 검색..."
                className="w-full bg-white/5 text-xs text-white placeholder-white/30 pl-9 pr-4 py-2.5 rounded-lg border border-white/5 focus:outline-none focus:border-[#c8952a]/50 transition-colors"
                value={zoneSearch}
                onChange={(e) => setZoneSearch(e.target.value)}
                id="zone-search-input"
              />
            </div>

            {/* Difficulty Filters */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs text-white/40 flex items-center gap-1.5 mr-2 shrink-0">
                <Filter size={12} /> 난이도 정렬:
              </span>
              {(["전체", "하", "중하", "중", "중상", "상", "최상"] as const).map((diff) => (
                <button
                  key={diff}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all ${
                    zoneDiffFilter === diff
                      ? "bg-[#c8952a]/20 text-[#c8952a] border border-[#c8952a]/30"
                      : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                  onClick={() => setZoneDiffFilter(diff)}
                  id={`filter-diff-${diff}`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Zones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="zones-grid">
            <AnimatePresence mode="popLayout">
              {filteredZones.map((zone, i) => {
                const diffBadgeColors: Record<string, string> = {
                  하: "bg-emerald-950/40 text-emerald-300 border-emerald-900/40",
                  중하: "bg-lime-950/40 text-lime-300 border-lime-900/40",
                  중: "bg-amber-950/40 text-amber-300 border-amber-900/40",
                  중상: "bg-orange-950/40 text-orange-300 border-orange-900/40",
                  상: "bg-red-950/40 text-red-300 border-red-900/40",
                  최상: "bg-fuchsia-950/40 text-fuchsia-300 border-fuchsia-900/40",
                };

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={zone.name}
                    className={`rounded-xl border ${zone.border} p-6 transition-all duration-300 flex flex-col justify-between`}
                    style={{
                      background: `linear-gradient(to bottom, ${zone.bgGlow}, rgba(13,9,21,0.9))`
                    }}
                    id={`zone-card-${i}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className={`font-bold text-base ${zone.color}`} style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            {zone.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-white/40">
                            <span>권장 레벨:</span>
                            <span className="text-white/80 font-bold">{zone.level}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${diffBadgeColors[zone.difficulty]}`}>
                          난이도 {zone.difficulty}
                        </span>
                      </div>

                      <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">
                        {zone.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-2.5">
                      <p className="text-[10px] font-bold tracking-wider text-[#c8952a] uppercase">주요 획득 전리품</p>
                      <div className="flex flex-wrap gap-1.5">
                        {zone.drops.map((drop, dropIndex) => (
                          <span
                            key={dropIndex}
                            className="text-[10px] bg-white/5 hover:bg-white/10 text-white/80 px-2 py-1 rounded border border-white/5 transition-colors"
                          >
                            💎 {drop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredZones.length === 0 && (
            <div className="text-center py-16 bg-[#0c0916]/40 rounded-xl border border-white/5 mt-4">
              <Info className="mx-auto text-white/20 mb-3" size={24} />
              <p className="text-sm text-white/40">일치하는 사냥터 정보가 없습니다. 다른 검색어를 이용해보세요.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── DOWNLOAD SECTION ─── */}
      <section id="download" className="py-24 border-y border-white/5 bg-[#0a0614] relative z-10" md-id="download-section">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-[#c8952a] font-mono uppercase mb-2">Instant Connection</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#e8dfc8]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              쉽고 빠른 다운로드
            </h2>
            <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c8952a] to-transparent" />
            <p className="text-white/50 text-sm mt-4">
              안전하고 확실한 다이렉트 드라이브 및 수동 패치 파일을 다운로드하십시오. 
              원활한 게임 접속을 위해 보안 프로그램 백신 가이드를 반드시 확인 부탁드립니다.
            </p>
          </div>

          <div className="grid gap-3.5 mb-10" id="download-actions-list">
            {DOWNLOAD_LINKS.map((dl, i) => (
              <button
                key={i}
                onClick={() => openDownloadModal(dl.label)}
                className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border transition-all hover:brightness-110 active:scale-[0.99] text-left group gap-4 cursor-pointer relative overflow-hidden ${
                  dl.primary
                    ? "bg-gradient-to-r from-[#c8952a]/15 via-[#a07020]/5 to-[#06030c] border-[#c8952a]/40 text-[#c8952a]"
                    : "bg-[#0f0a1b] border-white/5 hover:border-[#c8952a]/20 text-white/80"
                }`}
                id={`download-link-btn-${i}`}
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-white/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    dl.primary ? "bg-[#c8952a]/20" : "bg-white/5 text-white/40"
                  }`}>
                    <Download size={18} className={dl.primary ? "text-[#c8952a]" : ""} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white/95 block group-hover:text-[#c8952a] transition-colors">
                      {dl.label}
                    </span>
                    <span className="text-[10px] text-white/40 block mt-0.5 font-mono">다운로드 속도: {dl.speed}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 relative z-10 self-end sm:self-center">
                  <span className="text-xs font-mono font-bold text-white/40 bg-white/5 px-2.5 py-1 rounded">
                    {dl.size}
                  </span>
                  <ChevronDown size={14} className="text-white/20 -rotate-90" />
                </div>
              </button>
            ))}
          </div>

          {/* Step Instructions */}
          <div className="bg-[#0d0916] border border-white/5 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8952a]/2 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-sm font-bold text-[#c8952a] mb-4 flex items-center gap-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              <Info size={15} /> 필수 게임 접속 절차 안내
            </h3>
            
            <div className="grid gap-4 text-xs text-white/60">
              <div className="flex gap-3.5 items-start">
                <span className="w-5 h-5 rounded-full bg-white/5 text-white/80 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <p className="font-bold text-white/90">클라이언트 압축 해제</p>
                  <p className="mt-0.5 font-light">초고속 드라이브를 통해 알집 혹은 반디집으로 바탕화면에 압축을 완벽히 풉니다.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start">
                <span className="w-5 h-5 rounded-full bg-white/5 text-white/80 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <p className="font-bold text-white/90">백신 예외 등록 (중요)</p>
                  <p className="mt-0.5 font-light">윈도우 디펜더 등 백신이 오인하여 파일 차단하는 것을 막기 위해 사전에 설치 폴더 전체를 백신 예외 리스트에 등록하십시오.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start">
                <span className="w-5 h-5 rounded-full bg-white/5 text-white/80 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <p className="font-bold text-white/90">최신 패치 수동 적용</p>
                  <p className="mt-0.5 font-light">수동 통합 패치 파일을 복사하여 기존 압축 해제한 설치 폴더에 그대로 덮어씌웁니다.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start">
                <span className="w-5 h-5 rounded-full bg-white/5 text-white/80 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <div>
                  <p className="font-bold text-white/90">HwanghonLauncher.exe 실행</p>
                  <p className="mt-0.5 font-light">관리자 권한으로 런처를 가동하여 로그인 후 전장으로 이동하시면 모든 준비가 끝납니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY SECTION ─── */}
      <section id="community" className="py-24 border-t border-white/5 bg-[#07040e]/90 relative z-10" md-id="community-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs tracking-widest text-[#c8952a] font-mono uppercase mb-2">Share the Battle</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e8dfc8]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            활성화된 동료들 커뮤니티
          </h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c8952a] to-transparent" />
          <p className="text-white/50 text-sm mt-4 max-w-lg mx-auto">
            매시간 유저 교류 및 거래가 이루어집니다. 파티 매칭 및 각종 공략 정보를 한 눈에 공유하십시오.
          </p>

          <div className="max-w-md mx-auto mt-12" id="community-links-grid">
            {[
              {
                label: "공식 텔레그램 채널",
                sub: "실시간 소식 및 이벤트 소통",
                icon: <Send size={22} />,
                color: "hover:border-sky-400",
                bg: "rgba(0,136,204,0.03)",
                accent: "text-sky-400",
                url: "https://t.me/+gXAtzqiPDINhNzBi"
              },
            ].map((comm, i) => (
              <a
                href={comm.url}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                className={`rounded-xl border border-white/5 p-6 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ${comm.color}`}
                style={{ background: comm.bg }}
                id={`community-btn-${i}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-white/5 ${comm.accent} transition-transform group-hover:scale-110`}>
                  {comm.icon}
                </div>
                <h4 className="font-bold text-sm text-[#e8dfc8] mb-1">{comm.label}</h4>
                <p className="text-xs text-white/40">{comm.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROMOTIONAL COPY AREA ─── */}
      <section className="py-16 border-y border-white/5 bg-[#7a1515]/5 relative z-10" md-id="promotional-section">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs text-[#c8952a] tracking-widest font-mono uppercase mb-2">Viral Promotion Project</p>
          <h2 className="text-xl sm:text-2xl font-black text-[#e8dfc8] mb-4" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            서버 홍보 이벤트 참여
          </h2>
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed mb-8 max-w-xl mx-auto">
            아래의 홍보 문구를 복사하여 게임 커뮤니티, 블로그, 타 카페 등에 기재하여 주십시오. 
            참여 인증 스크린샷을 카페에 남겨주시면 특별 홍보 보훈 보물상자(랜덤 희귀 상자)를 100% 무상 지급합니다.
          </p>

          <div className="bg-[#06030c] rounded-xl border border-[#c8952a]/20 p-5 text-left max-w-2xl mx-auto mb-6 relative group">
            <button
              onClick={handleCopyPromo}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#c8952a]/10 hover:bg-[#c8952a]/20 text-[#c8952a] text-xs font-bold transition-all border border-[#c8952a]/20 cursor-pointer active:scale-95"
              id="copy-promo-btn"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>텍스트 복사</span>
                </>
              )}
            </button>
            <pre className="text-[11px] sm:text-xs text-white/60 font-mono leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap pr-16 select-all font-light">
              {promoText}
            </pre>
          </div>
          
          <p className="text-[10px] text-white/40">
            * 복사 버튼 클릭 시 클립보드에 자동으로 복사되어 즉시 붙여넣을 수 있습니다.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#040208] relative z-10" md-id="footer-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c8952a]/30">
                <img
                  src={twilightLogo}
                  alt="황혼서버 Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <p className="text-[#e8dfc8] font-black tracking-widest text-sm" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                  황혼서버
                </p>
                <p className="text-white/40 text-[10px] uppercase font-mono tracking-wider">Classic Twilight Server</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-xs text-white/40">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-[#c8952a] transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-white/30 text-[11px] leading-relaxed max-w-2xl mx-auto font-light">
            <p className="mb-2">
              본 황혼서버는 비공식 클래식 판타지 팬 프리 커뮤니티로서 원작 상표권 소유 게임 기업의 지식재산권(IP)을 존중합니다.
            </p>
            <p className="mb-4">
              어떠한 영리적 이익 창출 및 불법적 상거래를 지지하지 않는 교육 연구용 테스트 환경입니다.
            </p>
            <p className="font-mono tracking-wider opacity-60">
              © 2026 황혼서버 개발단. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ─── DOWNLOAD GUIDE MODAL ─── */}
      <AnimatePresence>
        {downloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setDownloadModalOpen(false)}
            />
            
            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#0e0a1b] border border-[#c8952a]/30 rounded-xl max-w-md w-full p-6 relative z-10 shadow-2xl text-left"
              id="download-modal-card"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#c8952a]/10 flex items-center justify-center text-[#c8952a] shrink-0">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base text-[#e8dfc8]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                    클라이언트 다운로드 안내
                  </h3>
                  <p className="text-xs text-white/40 mt-1">황혼서버 클라이언트 배포 일정</p>
                </div>
                <button
                  onClick={() => setDownloadModalOpen(false)}
                  className="text-white/40 hover:text-white px-2 py-1 rounded hover:bg-white/5 text-xs font-mono"
                  id="close-modal-btn"
                >
                  ESC
                </button>
              </div>

              <div className="space-y-4 text-xs text-white/70 leading-relaxed border-y border-white/5 py-4 my-4">
                <div className="bg-[#c8952a]/5 border border-[#c8952a]/20 rounded-lg p-4 text-center">
                  <p className="text-base font-black text-[#c8952a] mb-1">
                    7월 22일-23일 배포 예정입니다
                  </p>
                  <p className="text-[11px] text-white/50 font-light">
                    보다 안정적이고 쾌적한 게임 환경을 제공해 드리기 위해 최종 준비 중입니다.
                  </p>
                </div>
                <p className="text-[11px] text-white/40 font-light leading-normal">
                  배포가 시작되는 즉시 공식 텔레그램 채널을 통해 다운로드 주소가 공지될 예정이오니, 텔레그램 채널에 참여하셔서 가장 신속하게 소식을 받아보세요.
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setDownloadModalOpen(false)}
                  className="w-full px-4 py-2.5 text-xs font-black bg-gradient-to-r from-[#c8952a] to-[#a07020] text-[#06030c] rounded hover:brightness-110 transition-all cursor-pointer text-center"
                  id="modal-confirm-btn"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
