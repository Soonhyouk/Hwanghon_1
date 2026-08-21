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
  Send,
  Coins,
  Flame,
  Wand2,
  Compass,
  Crown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Images
// @ts-ignore
import twilightLogo from "./assets/images/twilight_logo_1782668675367.jpg";
// @ts-ignore
import charFemaleElf from "./assets/images/char_female_elf_1787297811031.jpg";
// @ts-ignore
import charFemaleMage from "./assets/images/char_female_mage_1787297824479.jpg";
// @ts-ignore
import charPrinceKnight from "./assets/images/char_prince_knight_1787300975262.jpg";
// @ts-ignore
import charFemaleKnight from "./assets/images/char_female_knight_1787300989342.jpg";

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
}

interface ClassInfo {
  id: "prince" | "knight" | "elf" | "mage";
  name: string;
  title: string;
  role: string;
  image: string;
  tagline: string;
  desc: string;
  color: string;
  accentBg: string;
  skills: string[];
  stats: { label: string; value: number }[];
}

const NAV_LINKS = [
  { label: "서버소개", href: "#intro" },
  { label: "클래스소개", href: "#classes" },
  { label: "공지사항", href: "#notices" },
  { label: "서버특징", href: "#features" },
  { label: "사냥터정보", href: "#zones" },
  { label: "다운로드", href: "#download" },
  { label: "커뮤니티", href: "#community" },
];

const CLASSES: ClassInfo[] = [
  {
    id: "prince",
    name: "군주 (Prince)",
    title: "혈맹을 통솔하는 전장의 절대 군주",
    role: "혈맹 지휘 / 파티 버퍼 & 전장 통솔",
    image: charPrinceKnight,
    tagline: "빛나는 왕관 아래 모든 혈맹원이 하나 된다",
    desc: "혈맹을 창설하고 거대한 성을 통치하는 리니지의 핵심 클래스입니다. 전용 오라 마법을 통해 혈맹원 전체의 능력치를 폭발적으로 상승시키며, 강력한 지휘력과 군주 전용 전투 스킬로 공성전의 승패를 결정짓습니다.",
    color: "from-amber-400 to-yellow-200",
    accentBg: "rgba(245, 158, 11, 0.12)",
    skills: ["군주 스턴", "글로잉 오라", "샤이닝 오라", "브레이브 멘탈"],
    stats: [
      { label: "혈맹 통솔력", value: 100 },
      { label: "파티 오라 지원", value: 96 },
      { label: "공성 전장 지휘", value: 98 },
      { label: "근접 전투력", value: 86 }
    ]
  },
  {
    id: "knight",
    name: "기사 (Knight)",
    title: "불굴의 의지로 전선을 수호하는 철벽의 방패",
    role: "근접 딜탱 / 선봉 전투 & 전선 파괴",
    image: charFemaleKnight,
    tagline: "흔들리지 않는 방패와 검으로 적진을 격파한다",
    desc: "강력한 체력과 무거운 중갑을 장착하고 최전선에서 적의 공격을 온몸으로 받아내는 든든한 수호자입니다. 확실한 제압기 '쇼크 스턴'과 피해를 되돌려주는 '카운터 베리어'로 전장의 1대1 PvP와 단체전에서 압도적인 존재감을 발휘합니다.",
    color: "from-blue-400 to-amber-300",
    accentBg: "rgba(59, 130, 246, 0.12)",
    skills: ["쇼크 스턴", "리덕션 아머", "솔리드 캐리지", "카운터 베리어"],
    stats: [
      { label: "근접 제압 & 스턴", value: 98 },
      { label: "생존 & 물리 방어", value: 99 },
      { label: "PvP 맞다이", value: 95 },
      { label: "기동 및 돌진", value: 88 }
    ]
  },
  {
    id: "elf",
    name: "요정 (Elf)",
    title: "달빛과 정령의 가호를 받는 명사수",
    role: "원거리 딜러",
    image: charFemaleElf,
    tagline: "정령의 인도에 따라 적의 심장을 꿰뚫는다",
    desc: "바람과 불, 물, 땅의 4대 정령 마법을 자유자재로 다루며, 원거리에서 뿜어내는 '트리플 애로우'의 압도적인 타격감과 기동성을 지녔습니다. 솔로잉과 파티 사냥 어디서든 빛나는 팔방미인 클래스입니다.",
    color: "from-emerald-400 to-amber-300",
    accentBg: "rgba(16, 185, 129, 0.12)",
    skills: ["트리플 애로우", "블러드 투 소울", "아이 오브 스톰", "스톰 샷"],
    stats: [
      { label: "원거리 공격력", value: 98 },
      { label: "기동성 / 회피", value: 94 },
      { label: "사냥 편의성", value: 95 },
      { label: "정령 마법 유지", value: 90 }
    ]
  },
  {
    id: "mage",
    name: "마법사 (Mage)",
    title: "빛과 비전의 마력을 다루는 마도사",
    role: "단일, 광역마법 / 서포터 & 전장 지배자",
    image: charFemaleMage,
    tagline: "신비로운 주문으로 전장의 판도를 뒤집는다",
    desc: "화려한 고위 원소 마법과 파티의 생존을 책임지는 '이뮨 투 함', 광역 파괴기 '미티어 스트라이크'를 구사합니다. 후반으로 갈수록 단일 폭딜과 전장 지배력으로 공성과 보스전에서 절대적인 위상을 자랑합니다.",
    color: "from-purple-300 to-amber-200",
    accentBg: "rgba(168, 85, 247, 0.12)",
    skills: ["콜 라이트닝", "선 버스트", "파이어 스톰", "이뮨 투 함", "미티어 스트라이크"],
    stats: [
      { label: "마법 폭딜 & 광역", value: 100 },
      { label: "파티 보호 & 뮨", value: 98 },
      { label: "전장 장악력", value: 96 },
      { label: "원소 마법력", value: 95 }
    ]
  }
];

const FEATURES = [
  {
    icon: <Coins size={24} />,
    title: "보스코인 시스템",
    desc: "일반 보스 100퍼센트 보스코인 드랍\n(보스코인 상점에서 상위템 구입 가능)",
    badge: "시그니처"
  },
  {
    icon: <Zap size={24} />,
    title: "즉시 사냥 가능",
    desc: "접속 즉시 스타터 장비와 소비 아이템 지급. 오대기 후 최고 속도로 전장 합류.",
    badge: "인기"
  },
  {
    icon: <Shield size={24} />,
    title: "완벽한 클래스 밸런스",
    desc: "서버 전용 밸런싱 패치를 통해 요정, 법사 등 전 직업이 매력적인 PvP/PvE 구도.",
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
    desc: "던전별 초반 아이템 드랍\n(상아탑6층 - 무기, 얼음던전 - 방어구)",
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
    color: "text-emerald-300",
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    bgGlow: "rgba(16,185,129,0.06)"
  },
  {
    name: "엘모어의 밭",
    level: "20 ~ 45",
    difficulty: "중하",
    desc: "본격적인 모험이 시작, 엘모어들을 사냥하며 필수템들을 득템하세.",
    color: "text-lime-300",
    border: "border-lime-500/30 hover:border-lime-400/60",
    bgGlow: "rgba(132,204,22,0.06)"
  },
  {
    name: "용의 계곡",
    level: "30 ~ 50",
    difficulty: "중",
    desc: "가장 인기가 많았던 사냥터.",
    color: "text-amber-300",
    border: "border-amber-500/30 hover:border-amber-400/60",
    bgGlow: "rgba(245,158,11,0.06)"
  },
  {
    name: "버려진 땅",
    level: "45 ~ 52",
    difficulty: "중",
    desc: "경험치를 위한 필수 사냥터.",
    color: "text-rose-300",
    border: "border-rose-500/30 hover:border-rose-400/60",
    bgGlow: "rgba(244,63,94,0.06)"
  },
  {
    name: "잊혀진섬",
    level: "45 ~",
    difficulty: "중상",
    desc: "고대의주문서 노가다를 위한 사냥터",
    color: "text-orange-300",
    border: "border-orange-500/30 hover:border-orange-400/60",
    bgGlow: "rgba(249,115,22,0.06)"
  },
  {
    name: "기란던전",
    level: "50 ~",
    difficulty: "중상",
    desc: "엘릭서와 같은 필수템들 드랍",
    color: "text-fuchsia-300",
    border: "border-fuchsia-500/30 hover:border-fuchsia-400/60",
    bgGlow: "rgba(217,70,239,0.06)"
  },
  {
    name: "오만의탑",
    level: "52 ~",
    difficulty: "상",
    desc: "각층별 빨간색이름 보스, 흰색이름 보스 등장",
    color: "text-red-300",
    border: "border-red-500/30 hover:border-red-400/60",
    bgGlow: "rgba(239,68,68,0.06)"
  },
  {
    name: "테베라스 던전",
    level: "63 ~",
    difficulty: "상",
    desc: "시간던전, 레벨대비 쉬움, 테베상자 노가다 던전",
    color: "text-purple-300",
    border: "border-purple-500/30 hover:border-purple-400/60",
    bgGlow: "rgba(168,85,247,0.06)"
  },
  {
    name: "칠흑의던전",
    level: "65 ~",
    difficulty: "최상",
    desc: "시간던전, 몹이 굉장히 강함, 1마리도 잡기 힘듦",
    color: "text-violet-300",
    border: "border-violet-500/30 hover:border-violet-400/60",
    bgGlow: "rgba(139,92,246,0.06)"
  },
];

const DOWNLOAD_LINKS = [
  {
    label: "클라이언트 종합 다운로드",
    size: "2.3 GB",
    primary: true,
    speed: "최대 100MB/s",
    availability: "8월 31~9월1일 다운로드 가능"
  },
];

const SERVER_STATS = [
  { label: "경험치 배율", value: "x10", sub: "EXP RATE", desc: "안정적인 성장 밸런스" },
  { label: "아이템 드랍", value: "x1", sub: "DROP RATE", desc: "득템의 손맛과 가치 보존" },
  { label: "아데나 배율", value: "x1", sub: "GOLD RATE", desc: "탄탄하고 공정한 경제" },
  { label: "서버 시즌", value: "NEW\n컨셉", sub: "새로운 출발", desc: "" },
];

const NOTICES: Notice[] = [
  {
    date: "2026.09.01",
    tag: "공지",
    title: "황혼서버 9월 1일(화) 새로운 컨셉 오픈 안내",
    content: "9월 1일 화요일 새로운 컨셉으로 돌아옵니다! 19시 오대기, 20시 정식 오픈으로 찾아뵙겠습니다."
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Character class tab state
  const [selectedClassTab, setSelectedClassTab] = useState<"prince" | "knight" | "elf" | "mage">("prince");

  // Notice & Search states
  const [noticeTab, setNoticeTab] = useState<"전체" | "공지" | "이벤트" | "패치">("전체");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  
  // Hunting Zone states
  const [zoneSearch, setZoneSearch] = useState("");
  const [zoneDiffFilter, setZoneDiffFilter] = useState<string>("전체");

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
                            z.desc.toLowerCase().includes(zoneSearch.toLowerCase());
      const matchesDiff = zoneDiffFilter === "전체" || z.difficulty === zoneDiffFilter;
      return matchesSearch && matchesDiff;
    });
  }, [zoneSearch, zoneDiffFilter]);

  // Promo text
  const promoText = `⭕️⭕️２．０　반하자　황혼서버⭕️⭕️9월1일　화요일　새로운 컨샙으로 돌아옵니다 19시 오대기 20시 오픈⭕️⭕️⭕️⭕️


🚨 ** 중요** 빡센 농사꾼이 될 자신이 없다면 오지마세요

✡️ 빛과 어둠이 교차하는 순간, 진짜 전투가 시작된다. ✡️

⭕️⭕️시간과 끈기만이 살길이다!!! ⭕️⭕️

✔️✔️ 리니지 2.0의 감성은 그대로, 플레이어들이 아쉬워했던 부분은 개선하기 위해 노력했습니다. ✔️✔️

⭕️⭕️ 원작의 분위기는 유지하면서 불편했던 요소는 편의 시스템으로 보완⭕️⭕️

☑️☑️시간과 노력만으로 10검 9셋 가능!!!! 노가다 만으로 가능!! ☑️☑️
⭕️⭕️보스코인 시스템!! ⭕️⭕️
일반보스들이 100퍼센트 보스코인 드랍!!
보스몬스터 드랍테이블에 있는 템들 드랍확률 최소 1퍼센트!!!
⭕️⭕️보스를 잡으며 얻는 보스코인으로 원하는 템 구매 가능⭕️⭕️

☑️☑️ 칼렉, 길렉 등 기존 2.0 서버에서 자주 발생했던 불편 사항 개선☑️☑️

⭕️⭕️ 자동사냥 시스템 지원⭕️⭕️
(손사냥이 더욱 높은 효율을 가질 수 있도록 설계)

☑️☑️ 장기 운영을 목표로 하는 반하자지향 서버☑️☑️
단기간에 모든 것을 얻기보다,
하루하루 성장하며 장비를 맞춰가는 재미를 추구합니다.

☑️☑️린클의 지루함과 식상함을 덜어내기 위해  신기하고 다양한 개별 아이템 및 세트 아이템들 대기중!! ☑️☑️

⭕️⭕️ 아이템 가치가 쉽게 무너지지 않는 안정적인 성장 구조⭕️⭕️

⭕️⭕️ 자유로운 유저 간 거래 지원⭕️⭕️

☑️☑️ 샤르나 변신 뿐만 아니라 린클 변신 시스템 지원☑️☑️
그 시절의 감성과 전투의 재미를 동시에 경험할 수 있습니다.

⭕️⭕️ 플레이어들의 의견을 듣고, 더 많은 분들이 만족할 수 있는 방향으로 꾸준히 개선해 나가겠습니다.⭕️⭕️

☑️☑️ 황혼서버만의 다양한 콘텐츠와 시스템을 지속적으로 업데이트합니다.☑️☑️

텔레그램  :  https://t.me/+gXAtzqiPDINhNzBi

홈페이지 :  https://twilighthwanghon.netlify.app/`;

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(promoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentClass = CLASSES.find((c) => c.id === selectedClassTab) || CLASSES[0];

  return (
    <div
      className="min-h-screen bg-[#0e091c] text-[#f7f4ee] relative overflow-x-hidden selection:bg-[#e6b94d]/30 selection:text-[#f8d478]"
      style={{ fontFamily: "'Inter', 'Noto Sans KR', sans-serif" }}
    >
      {/* ─── BRIGHT LUMINOUS AMBIENT GLOWS & PARTICLES ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Golden Sunlight / Twilight Glow from Top Center */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full opacity-25 blur-[140px] bg-gradient-to-b from-amber-300 via-yellow-500 to-rose-400" />
        {/* Radiant Emerald-Cyan Aura on Left */}
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px] bg-emerald-400" />
        {/* Ethereal Violet-Gold Magic Aura on Right */}
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full opacity-20 blur-[160px] bg-purple-400" />
        {/* Warm Golden Bottom Floor Ambient */}
        <div className="absolute bottom-10 left-1/3 w-[700px] h-[500px] rounded-full opacity-15 blur-[160px] bg-amber-500" />

        {/* Subtle Starlight and Magic Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120px,rgba(255,235,170,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
      </div>

      {/* ─── HEADER ─── */}
      <header
        className="sticky top-0 z-50 border-b border-[#e6b94d]/20 transition-all shadow-lg shadow-black/20"
        style={{
          background: "rgba(14, 9, 28, 0.85)",
          backdropFilter: "blur(20px)",
        }}
        id="header-app"
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <a href="#intro" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-105 border-2 border-[#e6b94d]/60 relative">
              <img
                src={twilightLogo}
                alt="황혼서버 Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-300/40 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p
                  className="text-[#f8ecd2] font-black leading-none tracking-wider text-base group-hover:text-[#e6b94d] transition-colors"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  황혼서버
                </p>
                <Sparkles size={13} className="text-[#e6b94d] animate-pulse" />
              </div>
              <p className="text-amber-200/60 text-[10px] uppercase tracking-wider font-mono mt-0.5">Classic Twilight Server</p>
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
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-lg ${
                    isActive
                      ? "text-[#f8ecd2] bg-[#e6b94d]/20 border border-[#e6b94d]/40 shadow-sm shadow-amber-500/10 font-bold"
                      : "text-white/70 hover:text-amber-100 hover:bg-white/5"
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
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-lg uppercase tracking-wider text-[#120a22] transition-all hover:brightness-110 active:scale-95 shadow-md shadow-amber-500/25 border border-amber-300/60"
              style={{ background: "linear-gradient(135deg, #fce289, #e6b94d, #c99326)" }}
              id="header-dl-btn"
            >
              <Calendar size={13} />
              다운로드 일정
            </a>

            <button
              className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              id="menu-toggle-btn"
            >
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${mobileNavOpen ? "rotate-180 text-[#e6b94d]" : ""}`}
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
              className="md:hidden border-t border-[#e6b94d]/20 bg-[#140e26] overflow-hidden"
              id="mobile-nav-panel"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block py-2.5 px-3 text-sm font-semibold rounded-lg transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "text-[#e6b94d] bg-[#e6b94d]/15 border-l-4 border-[#e6b94d]"
                        : "text-white/70 hover:text-white hover:bg-white/5"
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

      {/* ─── HERO SECTION (BRIGHT FANTASY WITH BEAUTIFUL ELF & MAGE) ─── */}
      <section id="intro" className="relative min-h-[92vh] flex items-center pt-8 pb-20 overflow-hidden" md-id="hero-section">
        {/* Soft Luminous Background Ambient Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-amber-300/10 blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-purple-400/10 blur-[130px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/40 bg-gradient-to-r from-amber-500/15 via-yellow-400/10 to-transparent text-xs font-bold text-[#f7d67b] mb-6 shadow-sm shadow-amber-500/10 backdrop-blur-sm"
          >
            <Sparkles size={14} className="text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-mono tracking-wide">9월 1일 화요일 대오픈! (19시 오대기 / 20시 오픈)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] mb-6 text-[#fbf8f0]"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            황혼서버 하자 지향,<br />
            <span className="bg-gradient-to-r from-[#ffe494] via-[#f5cb5c] to-[#e6b94d] bg-clip-text text-transparent drop-shadow-sm">
              노력과 시간이 미래를 바꾼다.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-8 max-w-2xl mx-auto space-y-3"
          >
            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
              빛과 정령이 숨 쉬는 환상적인 세계로 초대합니다. 
              정교하게 다듬어진 2.0 클래식 편의 시스템과 함께 
              노력한 만큼 반드시 보상받는 정통 성장의 감동을 경험하세요.
            </p>
            <p className="inline-block px-4 py-2 rounded-xl bg-red-500/15 border border-red-400/40 text-rose-200 text-xs sm:text-sm font-bold tracking-wide shadow-md shadow-red-950/30">
              🚨 <span className="text-amber-300 font-extrabold">** 중요**</span> 빡센 농사꾼이 될 자신이 없다면 오지마세요
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row justify-center gap-3.5 mb-10"
          >
            <a
              href="#download"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 font-black text-sm rounded-xl bg-gradient-to-r from-[#fce289] via-[#e6b94d] to-[#c99326] text-[#140c26] hover:brightness-110 transition-all shadow-xl shadow-amber-500/20 active:scale-95 border border-amber-200/70"
              id="hero-download-action"
            >
              <Calendar size={16} />
              8월 31~9월1일 다운로드 오픈
            </a>
            <a
              href="#classes"
              className="flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-sm rounded-xl bg-white/5 border border-amber-300/40 text-[#f7d67b] hover:bg-[#e6b94d]/15 hover:border-amber-300/70 transition-all active:scale-95 shadow-md shadow-black/20"
              id="hero-classes-action"
            >
              <Sparkles size={16} className="text-amber-300" />
              대표 클래스 (군주·기사·요정·법사)
            </a>
            <a
              href="#zones"
              className="flex items-center justify-center gap-2 px-5 py-3.5 font-semibold text-xs rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all"
              id="hero-zones-action"
            >
              <Map size={14} />
              사냥터 정보
            </a>
          </motion.div>

          {/* Server Stats Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {SERVER_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#18112e]/90 border border-amber-300/20 rounded-xl p-3.5 text-center shadow-lg relative overflow-hidden group hover:border-amber-300/50 hover:bg-[#20173d] transition-all"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
                <p className="text-[10px] font-mono tracking-widest text-[#e6b94d] uppercase mb-0.5 font-bold">{stat.sub}</p>
                <p
                  className="text-2xl font-extrabold text-[#fdf8ed] my-1 tracking-tight whitespace-pre-line leading-tight flex items-center justify-center min-h-[32px]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-[11px] font-semibold text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHARACTER & CLASS SHOWCASE SECTION (PRINCE, KNIGHT, ELF, MAGE) ─── */}
      <section id="classes" className="py-24 border-y border-[#e6b94d]/20 bg-gradient-to-b from-[#140e28] via-[#16102d] to-[#0e091c] relative z-10" md-id="classes-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-xs font-bold font-mono uppercase mb-3">
              <Sparkles size={13} /> Class Spotlight
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#fdf8ed]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              황혼을 밝히는 4대 대표 클래스
            </h2>
            <div className="mt-3 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-[#e6b94d] to-transparent" />
            <p className="text-white/70 text-sm mt-3 max-w-lg mx-auto font-light">
              리니지 2.0 클래식 감성을 고스란히 담아낸 군주, 기사, 요정, 마법사. 전장의 승리를 이끌 당신의 주인공을 선택하세요.
            </p>

            {/* Class Toggle Buttons */}
            <div className="inline-flex flex-wrap justify-center mt-8 p-1.5 rounded-2xl bg-[#0b0717] border border-amber-300/30 shadow-inner gap-1">
              {CLASSES.map((cls) => {
                const isSelected = selectedClassTab === cls.id;
                const classIcon = () => {
                  switch (cls.id) {
                    case "prince":
                      return <Crown size={16} />;
                    case "knight":
                      return <Shield size={16} />;
                    case "elf":
                      return <Compass size={16} />;
                    case "mage":
                      return <Wand2 size={16} />;
                  }
                };

                return (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassTab(cls.id)}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-[#fce289] to-[#e6b94d] text-[#120a22] shadow-md shadow-amber-500/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                    id={`btn-class-${cls.id}`}
                  >
                    {classIcon()}
                    <span>{cls.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Class Showcase Card */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentClass.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-12 gap-8 items-center bg-[#181130]/90 border border-amber-300/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md"
              >
                {/* Background Ambient Glow */}
                <div
                  className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40"
                  style={{
                    background:
                      currentClass.id === "prince"
                        ? "rgba(245,158,11,0.4)"
                        : currentClass.id === "knight"
                        ? "rgba(59,130,246,0.4)"
                        : currentClass.id === "elf"
                        ? "rgba(16,185,129,0.4)"
                        : "rgba(168,85,247,0.4)",
                  }}
                />

                {/* Left: Character Portrait Card */}
                <div className="md:col-span-5 relative group">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-xl bg-[#0d091a]">
                    <img
                      src={currentClass.image}
                      alt={currentClass.name}
                      className="w-full h-80 sm:h-96 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140e28] via-transparent to-transparent" />
                    
                    {/* Role Chip Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="inline-block text-xs font-bold text-amber-200 bg-black/60 border border-amber-300/40 px-3.5 py-1 rounded-full backdrop-blur-md">
                        {currentClass.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Character Details, Lore, and Stats */}
                <div className="md:col-span-7 text-left space-y-5">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#e6b94d] uppercase block mb-1">
                      {currentClass.tagline}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#fdf8ed]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                      {currentClass.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-200/80 font-medium mt-1">
                      {currentClass.title}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {currentClass.desc}
                  </p>

                  {/* Signature Skills */}
                  <div>
                    <p className="text-xs font-bold text-amber-300 mb-2.5 flex items-center gap-1.5">
                      <Sparkles size={13} /> 대표 시그니처 스킬
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentClass.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium bg-amber-500/10 border border-amber-300/30 text-amber-100 px-3 py-1.5 rounded-lg shadow-sm"
                        >
                          ✨ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stat Meters */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    {currentClass.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-white/80">{stat.label}</span>
                          <span className="font-mono font-bold text-[#e6b94d]">{stat.value}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.value}%` }}
                            transition={{ duration: 0.8, delay: sIdx * 0.1 }}
                            className="bg-gradient-to-r from-amber-400 to-yellow-200 h-full rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── NOTICES SECTION ─── */}
      <section id="notices" className="py-20 border-b border-white/5 bg-[#100b21]/70 relative z-10" md-id="notices-section">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs tracking-widest text-[#e6b94d] font-mono uppercase mb-1">Bulletin Board</p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#fdf8ed]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                소식 및 패치노트
              </h2>
            </div>
            {/* Filter Tabs */}
            <div className="flex bg-[#191230] p-1 rounded-xl border border-amber-300/20 self-start">
              {(["전체", "공지", "이벤트", "패치"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    noticeTab === tab
                      ? "bg-gradient-to-r from-[#fce289] to-[#e6b94d] text-[#120a22] font-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                  onClick={() => {
                    setNoticeTab(tab);
                    setSelectedNotice(null);
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
                공지: "bg-amber-500/20 text-amber-200 border-amber-400/40",
                이벤트: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/40",
                패치: "bg-sky-500/20 text-sky-200 border-sky-400/40",
              };
              const isSelected = selectedNotice?.title === notice.title;

              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-amber-400/60 bg-[#1c133a]"
                      : "border-white/10 bg-[#160f2e]/80 hover:bg-[#1a1236] hover:border-amber-300/30"
                  }`}
                  onClick={() => setSelectedNotice(isSelected ? null : notice)}
                  id={`notice-item-${i}`}
                >
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border shrink-0 ${badgeColors[notice.tag]}`}>
                        {notice.tag}
                      </span>
                      <h3 className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors">
                        {notice.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className="text-[11px] font-mono text-amber-200/50">{notice.date}</span>
                      <ChevronDown
                        size={14}
                        className={`text-white/40 transition-transform duration-200 ${isSelected ? "rotate-180 text-amber-300" : ""}`}
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
                        <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/5 bg-[#120c24] whitespace-pre-line">
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
            <p className="text-xs tracking-widest text-[#e6b94d] font-mono uppercase mb-2">Designed for Excitement</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#fdf8ed]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              황혼서버 시그니처 특징
            </h2>
            <div className="mt-3 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-[#e6b94d] to-transparent" />
            <p className="text-white/70 text-sm mt-3 max-w-lg mx-auto font-light">
              오직 플레이어의 쾌감과 안정성에 초점을 맞췄습니다. 클래식 본연의 느낌과 추가된 아이템들의 득템을 융합한 시스템입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="features-grid">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="bg-[#150f2b]/90 border border-amber-300/20 rounded-2xl p-6 transition-all hover:border-amber-300/50 group relative overflow-hidden hover:-translate-y-1 duration-300 shadow-xl"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#e6b94d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e6b94d]/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center text-amber-300 transition-all group-hover:scale-110 shadow-sm">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-200/60 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    {feat.badge}
                  </span>
                </div>
                
                <h3 className="font-bold text-base text-[#fdf8ed] mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                  {feat.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed group-hover:text-white/90 transition-colors whitespace-pre-line font-light">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HUNTING ZONES SECTION ─── */}
      <section id="zones" className="py-24 border-t border-white/5 bg-[#120c24]/80 relative z-10" md-id="hunting-zones-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-[#e6b94d] font-mono uppercase mb-2">Tactical Hunting ground</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#fdf8ed]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              실시간 사냥터 가이드
            </h2>
            <div className="mt-3 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-[#e6b94d] to-transparent" />
            <p className="text-white/70 text-sm mt-3 max-w-lg mx-auto font-light">
              자신의 레벨과 장비에 알맞은 구역을 선택해 진입하십시오. 위험도가 높을수록 더 높은 성장과 도전의 재미를 제공합니다.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-[#171030] border border-amber-300/20 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
                <Search size={15} />
              </span>
              <input
                type="text"
                placeholder="사냥터 이름 또는 설명 검색..."
                className="w-full bg-white/5 text-xs text-white placeholder-white/40 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-300/60 transition-colors"
                value={zoneSearch}
                onChange={(e) => setZoneSearch(e.target.value)}
                id="zone-search-input"
              />
            </div>

            {/* Difficulty Filters */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs text-white/50 flex items-center gap-1.5 mr-2 shrink-0">
                <Filter size={12} /> 난이도 정렬:
              </span>
              {(["전체", "하", "중하", "중", "중상", "상", "최상"] as const).map((diff) => (
                <button
                  key={diff}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                    zoneDiffFilter === diff
                      ? "bg-gradient-to-r from-[#fce289] to-[#e6b94d] text-[#120a22] font-bold shadow-sm"
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
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
                  하: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
                  중하: "bg-lime-500/20 text-lime-200 border-lime-400/40",
                  중: "bg-amber-500/20 text-amber-200 border-amber-400/40",
                  중상: "bg-orange-500/20 text-orange-200 border-orange-400/40",
                  상: "bg-red-500/20 text-red-200 border-red-400/40",
                  최상: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/40",
                };

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={zone.name}
                    className={`rounded-2xl border ${zone.border} p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-xl`}
                    style={{
                      background: `linear-gradient(to bottom, ${zone.bgGlow}, rgba(22, 15, 43, 0.95))`
                    }}
                    id={`zone-card-${i}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className={`font-bold text-base ${zone.color}`} style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            {zone.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-white/50">
                            <span>권장 레벨:</span>
                            <span className="text-amber-200 font-bold">{zone.level}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${diffBadgeColors[zone.difficulty]}`}>
                          난이도 {zone.difficulty}
                        </span>
                      </div>

                      <p className="text-xs text-white/75 leading-relaxed font-light">
                        {zone.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredZones.length === 0 && (
            <div className="text-center py-16 bg-[#160f2e]/60 rounded-2xl border border-white/10 mt-4">
              <Info className="mx-auto text-white/30 mb-3" size={24} />
              <p className="text-sm text-white/50">일치하는 사냥터 정보가 없습니다. 다른 검색어를 이용해보세요.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── DOWNLOAD SECTION ─── */}
      <section id="download" className="py-24 border-y border-white/5 bg-[#100a20] relative z-10" md-id="download-section">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-[#e6b94d] font-mono uppercase mb-2">Client Download</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#fdf8ed]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              클라이언트 다운로드 안내
            </h2>
            <div className="mt-3 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-[#e6b94d] to-transparent" />
            <p className="text-white/70 text-sm mt-3 font-light">
              안전하고 확실한 클라이언트 파일을 배포 준비 중입니다. 
              원활한 게임 접속을 위해 보안 프로그램 백신 가이드를 사전에 확인 부탁드립니다.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/20 border border-amber-300/50 rounded-xl px-5 py-2.5 text-xs text-amber-200 font-bold shadow-lg">
              <Calendar size={15} className="shrink-0 text-amber-300" />
              <span>8월 31~9월1일 다운로드 가능</span>
            </div>
          </div>

          <div className="grid gap-3.5 mb-10" id="download-actions-list">
            {DOWNLOAD_LINKS.map((dl, i) => (
              <div
                key={i}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-amber-300/40 bg-gradient-to-r from-amber-500/15 via-yellow-400/5 to-[#160f2d] text-left group gap-4 relative overflow-hidden shadow-xl"
                id={`download-link-btn-${i}`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center shrink-0 text-amber-300">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-base text-white/95 block">
                      {dl.label}
                    </span>
                    <span className="text-xs text-amber-200/80 block mt-0.5 font-mono">다운로드 일정: {dl.availability}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 relative z-10 self-end sm:self-center">
                  <span className="text-xs font-bold text-amber-200 bg-amber-500/20 border border-amber-300/40 px-4 py-2 rounded-xl shadow-sm">
                    8월 31~9월1일 다운로드 가능
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Step Instructions */}
          <div className="bg-[#17102e] border border-amber-300/20 rounded-2xl p-6 relative overflow-hidden shadow-lg">
            <h3 className="text-sm font-bold text-amber-300 mb-4 flex items-center gap-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              <Info size={15} /> 필수 게임 접속 절차 안내
            </h3>
            
            <div className="grid gap-4 text-xs text-white/70">
              <div className="flex gap-3.5 items-start">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <p className="font-bold text-white/95">클라이언트 압축 해제</p>
                  <p className="mt-0.5 font-light">초고속 드라이브를 통해 알집 혹은 반디집으로 바탕화면에 압축을 완벽히 풉니다.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <p className="font-bold text-white/95">백신 예외 등록 (중요)</p>
                  <p className="mt-0.5 font-light">윈도우 디펜더 등 백신이 오인하여 파일 차단하는 것을 막기 위해 사전에 설치 폴더 전체를 백신 예외 리스트에 등록하십시오.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <p className="font-bold text-white/95">최신 패치 수동 적용</p>
                  <p className="mt-0.5 font-light">수동 통합 패치 파일을 복사하여 기존 압축 해제한 설치 폴더에 그대로 덮어씌웁니다.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <div>
                  <p className="font-bold text-white/95">HwanghonLauncher.exe 실행</p>
                  <p className="mt-0.5 font-light">관리자 권한으로 런처를 가동하여 로그인 후 전장으로 이동하시면 모든 준비가 끝납니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY SECTION ─── */}
      <section id="community" className="py-24 border-t border-white/5 bg-[#120c24] relative z-10" md-id="community-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs tracking-widest text-[#e6b94d] font-mono uppercase mb-2">Share the Adventure</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#fdf8ed]" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            활성화된 동료들 커뮤니티
          </h2>
          <div className="mt-3 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-[#e6b94d] to-transparent" />
          <p className="text-white/70 text-sm mt-3 max-w-lg mx-auto font-light">
            매시간 유저 교류 및 거래가 이루어집니다. 파티 매칭 및 각종 공략 정보를 한 눈에 공유하십시오.
          </p>

          <div className="max-w-md mx-auto mt-10" id="community-links-grid">
            {[
              {
                label: "공식 텔레그램 채널",
                sub: "실시간 소식 및 이벤트 소통",
                icon: <Send size={24} />,
                color: "hover:border-sky-300 hover:bg-[#1a1434]",
                bg: "rgba(0,136,204,0.06)",
                accent: "text-sky-300",
                url: "https://t.me/+gXAtzqiPDINhNzBi"
              },
            ].map((comm, i) => (
              <a
                href={comm.url}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                className={`rounded-2xl border border-sky-400/30 p-6 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 shadow-xl ${comm.color}`}
                style={{ background: comm.bg }}
                id={`community-btn-${i}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-sky-400/20 ${comm.accent} border border-sky-300/30 transition-transform group-hover:scale-110 shadow-md`}>
                  {comm.icon}
                </div>
                <h4 className="font-bold text-base text-[#fdf8ed] mb-1">{comm.label}</h4>
                <p className="text-xs text-white/60">{comm.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROMOTIONAL COPY AREA ─── */}
      <section className="py-16 border-y border-amber-300/20 bg-gradient-to-b from-amber-500/10 to-[#100a20] relative z-10" md-id="promotional-section">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs text-[#e6b94d] tracking-widest font-mono uppercase mb-2">Viral Promotion Project</p>
          <h2 className="text-xl sm:text-2xl font-black text-[#fdf8ed] mb-4" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            서버 홍보 이벤트 참여
          </h2>
          <div className="text-xs sm:text-sm text-white/80 leading-relaxed mb-8 max-w-xl mx-auto space-y-4 text-center">
            <p className="text-white/70 font-light">
              아래의 홍보 문구를 복사하여 게임 커뮤니티 사이트에 각 홈페이지당 1개, 5군데에 기재하여 주십시오. 
              홍보내용을 캡쳐, 스크린샷하여 텔레그램으로 보내주시면 확인 후 홍보보상상자를 하루 1개 지급합니다.
            </p>
            <p className="font-bold text-amber-300 text-xs sm:text-sm">
              커뮤니티사이트 5개 홍보 → 홍보보상상자
            </p>

            <div className="bg-[#1a1236] border border-amber-300/30 rounded-2xl p-4 text-left text-xs space-y-2.5 backdrop-blur-sm shadow-md">
              <p className="text-white/90 leading-relaxed">
                하루에 사이트 5곳에 홍보하시고 운영자에게 개인텔레로 스크린샷을 보내주시면 홍보보상상자를 지급해드립니다.
              </p>
              <div className="text-amber-200/90 text-[11px] pt-2 border-t border-amber-300/20 flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-bold text-[#fce289] shrink-0">🎁 (홍보보상상자 -</span>
                <span className="text-white/80">경험치물약20퍼 2개, 픽시깃털 200개, 전강 5개, 자사5시간, 버프물약 5개)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0717] rounded-2xl border border-amber-300/30 p-5 text-left max-w-2xl mx-auto mb-6 relative group shadow-2xl">
            <button
              onClick={handleCopyPromo}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#fce289] to-[#e6b94d] text-[#120a22] text-xs font-bold transition-all hover:brightness-110 active:scale-95 shadow-md shadow-amber-500/20 cursor-pointer"
              id="copy-promo-btn"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-[#120a22]" />
                  <span>복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>텍스트 복사</span>
                </>
              )}
            </button>
            <pre className="text-[11px] sm:text-xs text-white/70 font-mono leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap pr-16 select-all font-light">
              {promoText}
            </pre>
          </div>
          
          <p className="text-[10px] text-white/50">
            * 복사 버튼 클릭 시 클립보드에 자동으로 복사되어 즉시 붙여넣을 수 있습니다.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#0a0614] relative z-10" md-id="footer-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-300/40">
                <img
                  src={twilightLogo}
                  alt="황혼서버 Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <p className="text-[#fdf8ed] font-black tracking-widest text-sm" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                  황혼서버
                </p>
                <p className="text-amber-200/50 text-[10px] uppercase font-mono tracking-wider">Classic Twilight Server</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-xs text-white/60">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-amber-300 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-white/40 text-[11px] leading-relaxed max-w-2xl mx-auto font-light">
            <p className="mb-2">
              본 황혼서버는 비공식 클래식 판타지 팬 프리 커뮤니티로서 원작 상표권 소유 게임 기업의 지식재산권(IP)을 존중합니다.
            </p>
            <p className="mb-4">
              어떠한 영리적 이익 창출 및 불법적 상거래를 지지하지 않는 교육 연구용 테스트 환경입니다.
            </p>
            <p className="font-mono tracking-wider text-amber-200/40">
              © 2026 황혼서버 개발단. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
