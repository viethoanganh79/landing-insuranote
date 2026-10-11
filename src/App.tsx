import React, { useState } from 'react';
import {
  Shield,
  Bell,
  Search,
  FolderLock,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  ChevronDown,
  ChevronUp,
  Mail,
  Smartphone,
  Share2,
  Check,
  AlertCircle
} from 'lucide-react';

interface BenefitItem {
  category: string;
  keyword: string;
  limit: string;
  condition: string;
  hospital: string;
}

export default function App() {
  const [emailHero, setEmailHero] = useState('');
  const [emailBottom, setEmailBottom] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeTab, setActiveTab] = useState<'agent' | 'client'>('agent');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [waitlistNumber, setWaitlistNumber] = useState<number>(482);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sample data for quick lookup demo
  const sampleBenefits: BenefitItem[] = [
    {
      category: 'Nội trú & Nằm viện',
      keyword: 'nằm viện nội trú viện phí qua đêm',
      limit: '1.500.000.000 đ / năm',
      condition: 'Chi trả 100% chi phí phòng tiêu chuẩn, tối đa 3.500.000 đ/ngày. Không áp dụng đồng chi trả.',
      hospital: 'Bảo lãnh trực tiếp tại Vinmec, Việt Pháp, FV, Hoàn Mỹ...'
    },
    {
      category: 'Phẫu thuật & Thủ thuật',
      keyword: 'phẫu thuật mổ gây mê thủ thuật',
      limit: 'Chi trả thực tế lên tới 250.000.000 đ / đợt',
      condition: 'Bao gồm tiền phòng mổ, bác sĩ phẫu thuật, vật tư y tế theo danh mục hợp đồng.',
      hospital: 'Tất cả bệnh viện công/tư tuyến quận trở lên.'
    },
    {
      category: 'Ngoại trú & Nha khoa',
      keyword: 'ngoại trú khám nha khoa răng răng miệng',
      limit: '15.000.000 đ / năm',
      condition: 'Khám bệnh 1.200.000 đ/lần. Nha khoa hỗ trợ cạo vôi, trám răng, nhổ răng bệnh lý.',
      hospital: 'Phòng khám đa khoa quốc tế & nha khoa liên kết.'
    },
    {
      category: 'Bệnh hiểm nghèo & Ung thư',
      keyword: 'ung thư bệnh hiểm nghèo giai đoạn đầu đột quỵ tim',
      limit: '1.000.000.000 đ (Tiền mặt)',
      condition: 'Giai đoạn sớm: 25% (250tr); Giai đoạn sau: 100% (1 tỷ); Bệnh hiểm nghèo kép chi trả thêm 50%.',
      hospital: 'Hồ sơ bệnh án & chẩn đoán mô bệnh học tuyến trung ương.'
    },
    {
      category: 'Tai nạn mở rộng & Thương tật',
      keyword: 'tai nạn gãy xương bỏng thương tật chấn thương',
      limit: '500.000.000 đ',
      condition: 'Chi trả theo bảng tỷ lệ thương tật chuẩn. Hỗ trợ viện phí do tai nạn gấp đôi ngày thường.',
      hospital: 'Bệnh viện cấp cứu và điều trị chấn thương toàn quốc.'
    }
  ];

  const filteredBenefits = sampleBenefits.filter(item => {
    if (!searchKeyword.trim()) return true;
    const query = searchKeyword.toLowerCase();
    return (
      item.category.toLowerCase().includes(query) ||
      item.keyword.toLowerCase().includes(query) ||
      item.condition.toLowerCase().includes(query)
    );
  });

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailHero || !emailHero.includes('@')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }
    setSubmittedEmail(emailHero);
    setWaitlistNumber(prev => prev + 1);
  };

  const handleBottomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailBottom || !emailBottom.includes('@')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }
    setSubmittedEmail(emailBottom);
    setWaitlistNumber(prev => prev + 1);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'Dữ liệu khách hàng và hợp đồng có an toàn không? Insuranote có đọc được không?',
      a: 'Tuyệt đối an toàn. Insuranote áp dụng kiến trúc Mã hóa đầu cuối (E2EE - End-to-End Encryption) với thuật toán AES-GCM 256-bit chuẩn quân sự. Dữ liệu được mã hóa ngay trên thiết bị của bạn trước khi gửi lên máy chủ. Khóa giải mã nằm độc quyền trên thiết bị của bạn và khách hàng. Ngay cả kỹ sư của Insuranote hay bất kỳ bên thứ ba nào cũng KHÔNG THỂ đọc được thông tin hợp đồng hay thông tin cá nhân của khách hàng.'
    },
    {
      q: 'Tôi là đại lý của một công ty, khách hàng có thể lưu hợp đồng của hãng bảo hiểm khác không?',
      a: 'Hoàn toàn được! Đây chính là điểm mạnh vượt trội của Insuranote. Khách hàng có thể tự tải lên hợp đồng bảo hiểm nhân thọ từ hãng khác, bảo hiểm y tế, bảo hiểm xe máy/ô tô hoặc bảo hiểm sức khỏe phi nhân thọ. Điều này giúp bạn trở thành "người quản lý rủi ro và cố vấn tài chính trọn đời" của khách hàng, tạo cơ hội mở rộng và bán thêm hợp đồng mới khi quyền lợi cũ của khách chưa đủ.'
    },
    {
      q: 'Khách hàng của tôi khi sử dụng ứng dụng có phải trả phí không?',
      a: 'Khách hàng cuối được sử dụng kho lưu trữ hợp đồng cá nhân HOÀN TOÀN MIỄN PHÍ trọn đời. Họ có thể xem tóm tắt quyền lợi, thẻ bảo hiểm số, lịch đóng phí và yêu cầu hỗ trợ bồi thường ngay trên ứng dụng mà không mất bất kỳ khoản phí nào.'
    },
    {
      q: 'Tính năng nhắc lịch tái tục hoạt động qua những kênh nào?',
      a: 'Hệ thống tự động đồng bộ và thông báo đa kênh: Thông báo đẩy qua app, tin nhắn Zalo ZNS tiện lợi, và gửi email nhắc nhở tự động theo các mốc quan trọng (30 ngày, 15 ngày, 7 ngày và 3 ngày trước hạn đóng phí). Đại lý cũng nhận được danh sách tổng hợp khách hàng cần tái tục trong tuần.'
    },
    {
      q: 'Chính sách ưu đãi cho đại lý đăng ký danh sách chờ (Waitlist) là gì?',
      a: '100 đại lý đầu tiên đăng ký danh sách chờ sẽ nhận được gói tài khoản Insuranote PRO hoàn toàn miễn phí trong 06 tháng (trị giá 1.800.000 VNĐ) ngay khi nền tảng chính thức ra mắt, đi kèm quyền ưu tiên trải nghiệm tính năng OCR quét hợp đồng tự động và hỗ trợ 1-1 chuyên sâu.'
    }
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#F8F9FA] text-[#0F172A] selection:bg-[#FFE500] selection:text-black">
      {/* Top Banner */}
      <div className="bg-[#0B2046] text-white text-xs md:text-sm font-bold py-2.5 px-3 text-center border-b-2 border-black flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <span className="bg-[#FFE500] text-black px-2 py-0.5 text-[11px] sm:text-xs font-black uppercase brutal-border-sm shrink-0">
          EARLY ACCESS
        </span>
        <span className="leading-tight">
          Tặng <strong>6 tháng PRO miễn phí</strong> cho 100 đại lý đầu tiên vào danh sách chờ!
        </span>
      </div>

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
          {/* Brand Wordmark */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0 group min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FFE500] brutal-border flex items-center justify-center shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#0B2046] uppercase leading-none truncate">
                INSURANOTE
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5 truncate">
                E2EE Insurance SaaS
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-bold text-[#0B2046]">
            <a href="#features" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Tính năng
            </a>
            <a href="#demo" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Tra cứu thử
            </a>
            <a href="#security" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Bảo mật E2EE
            </a>
            <a href="#faq" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Hỏi đáp
            </a>
          </nav>

          {/* Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={scrollToWaitlist}
              className="bg-[#FFE500] text-black font-extrabold text-xs sm:text-sm px-3.5 py-2 sm:px-5 sm:py-2.5 brutal-btn uppercase tracking-wide flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Đăng ký sớm</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-20 md:pt-20 md:pb-28 overflow-hidden bg-[#F8F9FA] border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start min-w-0 w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#E0E7FF] border-2 border-black px-3 py-1.5 brutal-shadow-sm mb-4 sm:mb-6 font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#0B2046] max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                <span className="truncate">Dành riêng cho Đại lý Bảo hiểm Nhân thọ &amp; Phi nhân thọ</span>
              </div>

              {/* H1 Headline */}
              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B2046] tracking-tight leading-[1.2] mb-4 sm:mb-6 text-balance break-words w-full">
                Quản lý hợp đồng bảo hiểm &amp;{' '}
                <span className="bg-[#FFE500] px-1.5 sm:px-2 py-0.5 brutal-border-sm inline-block shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
                  Không bao giờ
                </span>{' '}
                bỏ lỡ lịch tái tục.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                Công cụ giúp đại lý tra cứu nhanh quyền lợi khách hàng trong 3 giây và trao quyền cho khách hàng tự quản
                lý mọi hợp đồng cá nhân ở cùng một nơi. An toàn tuyệt đối với mã hóa đầu cuối (E2EE).
              </p>

              {/* Waitlist Form Component */}
              <div id="waitlist-form" className="w-full max-w-xl mb-6">
                <form
                  onSubmit={handleHeroSubmit}
                  className="bg-white p-2.5 sm:p-3 brutal-border brutal-shadow flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full"
                >
                  <div className="relative flex-1 min-w-0 w-full">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <input
                      type="email"
                      value={emailHero}
                      onChange={e => setEmailHero(e.target.value)}
                      placeholder="Nhập email của bạn (vd: hoa.mdrt@gmail.com)..."
                      required
                      className="w-full min-w-0 pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-[#F8FAFC] border-2 border-black text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFE500] text-xs sm:text-sm md:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#FFE500] hover:bg-[#FFD000] text-black font-black uppercase text-xs sm:text-sm md:text-base px-5 py-3 sm:px-6 sm:py-3.5 brutal-border brutal-shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Vào danh sách chờ</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </form>

                {/* Micro commitments below form */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-600 mt-3 pl-0.5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Miễn phí 6 tháng Pro</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#0B2046] shrink-0" />
                    <span>Mã hóa E2EE không lộ dữ liệu</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Đăng ký chỉ 30 giây</span>
                  </div>
                </div>
              </div>

              {/* Social Proof Counter */}
              <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t-2 border-black/10 w-full max-w-xl">
                <div className="flex -space-x-2 shrink-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-400 rounded-full border-2 border-black flex items-center justify-center text-[10px] sm:text-xs font-black">
                    MP
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-400 rounded-full border-2 border-black flex items-center justify-center text-[10px] sm:text-xs font-black">
                    HD
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-sky-400 rounded-full border-2 border-black flex items-center justify-center text-[10px] sm:text-xs font-black">
                    TL
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-purple-400 rounded-full border-2 border-black flex items-center justify-center text-[10px] sm:text-xs font-black">
                    +480
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-700 leading-snug">
                  <span className="text-[#0B2046] font-black">{waitlistNumber}+ đại lý</span> từ Manulife, Dai-ichi Life,
                  Prudential, AIA, Bảo Việt đã tham gia.
                </div>
              </div>
            </div>

            {/* Right Visual Dashboard Mockup Column */}
            <div className="lg:col-span-5 relative w-full pr-1.5 pb-1.5 sm:pr-3 sm:pb-3">
              {/* Decorative background box safely positioned */}
              <div className="absolute inset-0 bg-[#0B2046] translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3 brutal-border -z-10" />

              <div className="bg-white brutal-border p-4 sm:p-5 relative w-full">
                {/* Simulated App Header */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-black mb-3 sm:mb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 border border-black" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400 border border-black" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border border-black" />
                    <span className="font-mono text-[10px] sm:text-xs font-bold ml-1 text-slate-700">Insuranote Agent</span>
                  </div>
                  <span className="bg-[#D1FAE5] text-emerald-800 text-[10px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.5 border border-black uppercase shrink-0">
                    E2EE BẢO MẬT
                  </span>
                </div>

                {/* Contract Status Card */}
                <div className="bg-[#FEF08A] border-2 border-black p-3 sm:p-3.5 mb-3 brutal-shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-2">
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase text-amber-900 tracking-wider block">
                        CẢNH BÁO TÁI TỤC SẮP ĐẾN HẠN
                      </span>
                      <h4 className="font-display font-black text-xs sm:text-sm text-[#0B2046] truncate">
                        Khách hàng: Nguyễn Hoàng Nam
                      </h4>
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-700 truncate">
                        HĐ #PRU-9824102 · Gói Phú-Bảo Gia
                      </p>
                    </div>
                    <span className="bg-red-500 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 border border-black self-start shrink-0">
                      Còn 7 ngày
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-black/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                      Phí: <strong>26.400.000 đ</strong>
                    </span>
                    <button className="bg-white hover:bg-slate-50 text-black font-black text-[10px] sm:text-[11px] px-2 py-1 border border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer shrink-0">
                      Nhắc Zalo 1 chạm ⚡
                    </button>
                  </div>
                </div>

                {/* Benefits Quick Summary Card */}
                <div className="bg-[#EFF6FF] border-2 border-black p-3 sm:p-3.5 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] sm:text-xs font-black text-[#0B2046] uppercase flex items-center gap-1.5 truncate">
                      <Search className="w-3.5 h-3.5 shrink-0" />
                      Tra cứu nhanh 3 giây
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-500 shrink-0">
                      TỨC THÌ
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="bg-white p-2 border border-black flex justify-between items-center gap-2">
                      <span className="font-bold text-slate-800 text-[11px] sm:text-xs truncate">Nội trú / Nằm viện:</span>
                      <span className="font-black text-emerald-700 text-[11px] sm:text-xs shrink-0">1.000.000.000 đ/năm</span>
                    </div>
                    <div className="bg-white p-2 border border-black flex justify-between items-center gap-2">
                      <span className="font-bold text-slate-800 text-[11px] sm:text-xs truncate">Bệnh hiểm nghèo:</span>
                      <span className="font-black text-blue-700 text-[11px] sm:text-xs shrink-0">100% (500 triệu)</span>
                    </div>
                    <div className="bg-white p-2 border border-black flex justify-between items-center gap-2">
                      <span className="font-bold text-slate-800 text-[11px] sm:text-xs truncate">Tai nạn thương tật:</span>
                      <span className="font-black text-amber-700 text-[11px] sm:text-xs shrink-0">Tối đa 300 triệu</span>
                    </div>
                  </div>
                </div>

                {/* Client Space Feature Badge */}
                <div className="bg-[#F3E8FF] border-2 border-black p-2.5 sm:p-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FolderLock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[11px] sm:text-xs font-black text-purple-950 truncate">Kho số khách hàng tự tải HĐ</div>
                      <div className="text-[10px] sm:text-[11px] text-purple-800 font-medium truncate">Bảo hiểm xe, BHYT, PVI gia đình</div>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] bg-purple-200 border border-black px-1.5 sm:px-2 py-0.5 font-bold shrink-0">
                    +3 HĐ
                  </span>
                </div>

                {/* Floating E2EE Badge */}
                <div className="mt-3 text-center">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 border border-black max-w-full truncate">
                    <Lock className="w-3 h-3 text-[#0B2046] shrink-0" />
                    <span className="truncate">Chỉ bạn và khách hàng giữ khóa giải mã E2EE 256-bit</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Company Logos Section */}
      <section className="bg-white py-6 sm:py-8 border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
            <span className="font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider text-slate-500">
              Được thiết kế cho đại lý bảo hiểm thuộc các tập đoàn hàng đầu:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-black text-slate-800 text-xs sm:text-sm tracking-wider uppercase opacity-85">
              <span>MANULIFE</span>
              <span>PRUDENTIAL</span>
              <span>DAI-ICHI LIFE</span>
              <span>AIA VIETNAM</span>
              <span>BẢO VIỆT</span>
              <span>SUN LIFE</span>
              <span>FWD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points: The Problem vs. The Insuranote Solution */}
      <section id="difference" className="py-14 sm:py-20 bg-[#F1F5F9] border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <div className="inline-block bg-[#FFE500] text-black font-black text-xs px-3 py-1 border-2 border-black brutal-shadow-sm uppercase mb-3">
              THỰC TRẠNG NGHỀ TƯ VẤN
            </div>
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-black text-[#0B2046] tracking-tight">
              Đại lý đang mất bao nhiêu hợp đồng và thời gian mỗi tháng?
            </h2>
            <p className="mt-3 text-slate-700 font-medium text-xs sm:text-base">
              Hầu hết đại lý xuất sắc đều quá tải vì công việc giấy tờ, tra cứu thủ công và nỗi lo khách hàng trễ hạn
              đóng phí tái tục.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* The Old Painful Way */}
            <div className="bg-white brutal-border brutal-shadow p-4 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-black mb-5">
                  <h3 className="font-display font-black text-base sm:text-lg text-red-600 uppercase flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    Cách quản lý cũ (Excel &amp; Giấy tờ)
                  </h3>
                  <span className="text-[11px] sm:text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 border border-black shrink-0">
                    Tốn thời gian &amp; Rủi ro
                  </span>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 border border-black text-red-600 font-black flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✕
                    </span>
                    <span>
                      <strong>Quên lịch tái tục:</strong> Khách hàng trễ hạn đóng phí năm 2 (K2) do bận rộn, đại lý mất
                      thưởng MDRT và sụt giảm chỉ số duy trì hợp đồng.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 border border-black text-red-600 font-black flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✕
                    </span>
                    <span>
                      <strong>Tra cứu lúng túng:</strong> Khách gọi điện hỏi viện phí lúc nửa đêm, đại lý phải lật 60 trang
                      hợp đồng giấy hoặc tìm file scan mờ nhòe.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 border border-black text-red-600 font-black flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✕
                    </span>
                    <span>
                      <strong>Mất kết nối sau khi ký:</strong> Khách hàng cất hợp đồng vào tủ và quên lãng; không có
                      công cụ để tương tác thường xuyên với đại lý.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 border border-black text-red-600 font-black flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✕
                    </span>
                    <span>
                      <strong>Nguy cơ lộ dữ liệu:</strong> Lưu số CMND/CCCD và thông tin y tế trên file Excel hoặc Zalo dễ bị
                      mất cắp và vi phạm quyền riêng tư khách hàng.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t-2 border-black/10 text-[11px] sm:text-xs font-bold text-red-600 bg-red-50 p-2.5 sm:p-3 border border-black">
                Hậu quả: Giảm 20 - 35% doanh thu tái tục &amp; Khách hàng rời bỏ khi có đại lý khác chăm sóc tận tình hơn.
              </div>
            </div>

            {/* The Insuranote Way */}
            <div className="bg-[#FFE500] brutal-border brutal-shadow p-4 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-black mb-5">
                  <h3 className="font-display font-black text-base sm:text-lg text-black uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-black stroke-[3] shrink-0" />
                    Giải pháp với Insuranote
                  </h3>
                  <span className="text-[11px] sm:text-xs font-black bg-black text-[#FFE500] px-2 py-0.5 border border-black shrink-0">
                    Hiệu quả 10x
                  </span>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm font-bold text-slate-900">
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-black text-[#FFE500] font-black flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </span>
                    <span>
                      <strong>Tự động nhắc lịch 30 - 15 - 7 ngày:</strong> Hệ thống tự động gửi thông báo Zalo &amp; Email
                      chuẩn chỉnh, giúp bạn luôn chủ động chăm sóc khách hàng.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-black text-[#FFE500] font-black flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </span>
                    <span>
                      <strong>Tra cứu quyền lợi chỉ 3 giây:</strong> Gõ nhanh từ khóa (nằm viện, nha khoa, ung thư), hệ
                      thống trả về bảng tóm tắt quyền lợi tức thì.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-black text-[#FFE500] font-black flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </span>
                    <span>
                      <strong>Kho lưu trữ cho khách hàng:</strong> Khách tự tải lên hợp đồng của hãng khác, bạn trở thành
                      cố vấn quản lý toàn diện cả gia đình họ.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-black text-[#FFE500] font-black flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </span>
                    <span>
                      <strong>Mã hóa đầu cuối E2EE:</strong> Chuẩn bảo mật cấp ngân hàng, thông tin hợp đồng được mã hóa
                      chỉ người dùng xem được.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t-2 border-black/20 text-[11px] sm:text-xs font-black text-black bg-white p-2.5 sm:p-3 border-2 border-black">
                Kết quả: Tăng tỷ lệ duy trì hợp đồng (K2) trên 90% &amp; Tiết kiệm 4.5 giờ làm việc giấy tờ mỗi tuần!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features: Chunky Neo-brutalist Cards */}
      <section id="features" className="py-16 sm:py-24 bg-white border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-block bg-[#0B2046] text-white font-black text-xs px-3.5 py-1.5 border-2 border-black brutal-shadow-sm uppercase mb-3">
              TÍNH NĂNG CỐT LÕI
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#0B2046] tracking-tight">
              Mọi thứ đại lý cần để nâng tầm dịch vụ &amp; giữ chân khách hàng
            </h2>
            <p className="mt-3 text-slate-700 font-medium text-xs sm:text-base">
              Không chỉ là phần mềm ghi chú. Insuranote là trợ lý số bảo mật đồng hành trọn vòng đời hợp đồng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Feature 1: Auto Renewal Reminders */}
            <div className="bg-[#FEF08A] brutal-card p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white brutal-border flex items-center justify-center mb-5 brutal-shadow-sm">
                  <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-black stroke-[2.5]" />
                </div>
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-900 mb-1">
                  TÍNH NĂNG 01 · TỰ ĐỘNG HÓA
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#0B2046] mb-3">
                  Nhắc lịch tái tục tự động
                </h3>
                <p className="text-slate-800 font-medium text-xs sm:text-sm leading-relaxed mb-5">
                  Quản lý vòng đời hợp đồng trọn vẹn, nhắc bạn và khách hàng trước 30, 15 và 7 ngày đóng phí. Soạn sẵn
                  nội dung tin nhắn Zalo/SMS cá nhân hóa để bạn gửi lời chúc và nhắc phí chỉ với 1 chạm.
                </p>

                <div className="space-y-2 bg-white/80 p-3.5 border-2 border-black text-xs font-bold text-slate-900 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-700 font-black shrink-0">●</span>
                    <span>Tự động tính ngày ân hạn 60 ngày đóng phí bảo hiểm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-700 font-black shrink-0">●</span>
                    <span>Báo cáo danh sách hợp đồng cần thu phí hàng tháng/quý</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-700 font-black shrink-0">●</span>
                    <span>Bảo vệ tỷ lệ duy trì hợp đồng K2 &gt; 85% để đạt chuẩn MDRT</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-black">
                <span className="text-[#0B2046]">Chăm sóc đúng thời điểm</span>
                <span className="bg-black text-white px-2 py-0.5 sm:px-2.5 sm:py-1">Zero trễ hạn</span>
              </div>
            </div>

            {/* Feature 2: Instant Benefits Lookup */}
            <div className="bg-[#BFDBFE] brutal-card p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white brutal-border flex items-center justify-center mb-5 brutal-shadow-sm">
                  <Search className="w-6 h-6 sm:w-7 sm:h-7 text-black stroke-[2.5]" />
                </div>
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-blue-900 mb-1">
                  TÍNH NĂNG 02 · HIỆU SUẤT CAO
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#0B2046] mb-3">
                  Tra cứu quyền lợi siêu tốc
                </h3>
                <p className="text-slate-800 font-medium text-xs sm:text-sm leading-relaxed mb-5">
                  Xem nhanh tóm tắt quyền lợi mà không cần lật tìm tài liệu rườm rà. Chỉ cần gõ tên khách hàng hoặc quyền
                  lợi (viện phí, ung thư, tai nạn), Insuranote hiển thị hạn mức chi trả, điều khoản loại trừ và bệnh viện
                  bảo lãnh ngay lập tức.
                </p>

                <div className="space-y-2 bg-white/80 p-3.5 border-2 border-black text-xs font-bold text-slate-900 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-700 font-black shrink-0">●</span>
                    <span>Tìm kiếm từ khóa thông minh: viện phí, phẫu thuật, nha khoa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-700 font-black shrink-0">●</span>
                    <span>Tóm tắt giới hạn thanh toán cho từng đợt điều trị</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-700 font-black shrink-0">●</span>
                    <span>Xuất ảnh thẻ tóm tắt quyền lợi gửi nhanh cho khách qua Zalo</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-black">
                <span className="text-[#0B2046]">Phản hồi khách trong 3 giây</span>
                <span className="bg-black text-white px-2 py-0.5 sm:px-2.5 sm:py-1">Chuyên nghiệp</span>
              </div>
            </div>

            {/* Feature 3: Client Space / Family Storage */}
            <div className="bg-[#D1FAE5] brutal-card p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white brutal-border flex items-center justify-center mb-5 brutal-shadow-sm">
                  <FolderLock className="w-6 h-6 sm:w-7 sm:h-7 text-black stroke-[2.5]" />
                </div>
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-900 mb-1">
                  TÍNH NĂNG 03 · GIỮ CHÂN KHÁCH HÀNG
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#0B2046] mb-3">
                  Kho lưu trữ cho khách hàng cuối
                </h3>
                <p className="text-slate-800 font-medium text-xs sm:text-sm leading-relaxed mb-5">
                  Cung cấp không gian số riêng để khách hàng tự tải lên và lưu trữ các hợp đồng cá nhân khác của họ (kể cả
                  hợp đồng của các hãng khác, bảo hiểm y tế, xe cộ). Biến đại lý thành cố vấn tài chính toàn diện và gia
                  tăng sự gắn kết trọn đời.
                </p>

                <div className="space-y-2 bg-white/80 p-3.5 border-2 border-black text-xs font-bold text-slate-900 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-black shrink-0">●</span>
                    <span>Khách hàng có ứng dụng di động riêng, dùng hoàn toàn miễn phí</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-black shrink-0">●</span>
                    <span>Lưu trữ hợp đồng phi nhân thọ, bảo hiểm xe, sức khỏe gia đình</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-black shrink-0">●</span>
                    <span>Mở ra cơ hội tư vấn gói bổ trợ khi phát hiện khoảng trống bảo vệ</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-black">
                <span className="text-[#0B2046]">Gắn kết khách hàng trọn đời</span>
                <span className="bg-black text-white px-2 py-0.5 sm:px-2.5 sm:py-1">Tăng Cross-sell</span>
              </div>
            </div>

            {/* Feature 4: E2EE Security */}
            <div className="bg-[#E9D5FF] brutal-card p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white brutal-border flex items-center justify-center mb-5 brutal-shadow-sm">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-black stroke-[2.5]" />
                </div>
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-purple-900 mb-1">
                  TÍNH NĂNG 04 · AN TOÀN TUYỆT ĐỐI
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#0B2046] mb-3">
                  Bảo mật mã hóa E2EE (Zero-Knowledge)
                </h3>
                <p className="text-slate-800 font-medium text-xs sm:text-sm leading-relaxed mb-5">
                  Dữ liệu của đại lý và khách hàng được mã hóa đầu cuối với chuẩn AES-GCM 256-bit. Chỉ người dùng mới sở
                  hữu chìa khóa giải mã trên thiết bị. Ngay cả đội ngũ kỹ thuật của Insuranote cũng không thể xem nội dung
                  hợp đồng.
                </p>

                <div className="space-y-2 bg-white/80 p-3.5 border-2 border-black text-xs font-bold text-slate-900 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-700 font-black shrink-0">●</span>
                    <span>Không lưu khóa giải mã trên máy chủ (Zero-Knowledge)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-700 font-black shrink-0">●</span>
                    <span>Tuân thủ nghị định bảo vệ dữ liệu cá nhân (PDPD)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-700 font-black shrink-0">●</span>
                    <span>Đại lý an tâm tuyệt đối về danh bạ khách hàng của mình</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-black">
                <span className="text-[#0B2046]">Quyền riêng tư là tối thượng</span>
                <span className="bg-black text-white px-2 py-0.5 sm:px-2.5 sm:py-1">Chuẩn 256-bit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section: Try Quick Benefits Lookup */}
      <section id="demo" className="py-14 sm:py-20 bg-[#F8F9FA] border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-block bg-[#FFE500] text-black font-black text-xs px-3 py-1 border-2 border-black brutal-shadow-sm uppercase mb-3">
              TRẢI NGHIỆM TRỰC TIẾP
            </div>
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-black text-[#0B2046] tracking-tight">
              Thử nghiệm tra cứu quyền lợi siêu tốc
            </h2>
            <p className="mt-3 text-slate-700 font-medium text-xs sm:text-base">
              Hãy thử gõ từ khóa như <em>&ldquo;nằm viện&rdquo;</em>, <em>&ldquo;ung thư&rdquo;</em>, <em>&ldquo;nha khoa&rdquo;</em>, hoặc <em>&ldquo;tai nạn&rdquo;</em> để xem tốc độ tóm tắt của Insuranote.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white brutal-border brutal-shadow p-4 sm:p-6 md:p-8">
            {/* View Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b-2 border-black mb-5">
              <div className="flex items-center gap-1.5 bg-[#F1F5F9] p-1 border-2 border-black w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('agent')}
                  className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black uppercase transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'agent'
                      ? 'bg-[#0B2046] text-white shadow-[1.5px_1.5px_0px_#000]'
                      : 'text-slate-700 hover:text-black'
                  }`}
                >
                  Giao diện Đại lý
                </button>
                <button
                  onClick={() => setActiveTab('client')}
                  className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black uppercase transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'client'
                      ? 'bg-[#0B2046] text-white shadow-[1.5px_1.5px_0px_#000]'
                      : 'text-slate-700 hover:text-black'
                  }`}
                >
                  Không gian Khách hàng
                </button>
              </div>

              <div className="text-[11px] sm:text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black animate-pulse shrink-0" />
                <span className="truncate">Hợp đồng mẫu: Nguyễn Minh Anh · An Tâm Song Hành</span>
              </div>
            </div>

            {/* Search Input Box */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-[11px] sm:text-xs font-black uppercase text-[#0B2046] mb-2">
                Gõ từ khóa quyền lợi cần kiểm tra:
              </label>
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  placeholder="Ví dụ: nằm viện, ung thư, nha khoa, tai nạn..."
                  className="w-full pl-10 sm:pl-12 pr-12 py-3 bg-[#FAF5FF] border-2 border-black font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFE500] text-xs sm:text-sm"
                />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-black bg-slate-200 hover:bg-slate-300 px-2 py-1 border border-black cursor-pointer"
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* Quick Tag Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500">Gợi ý nhanh:</span>
                {['Nội trú', 'Ung thư', 'Nha khoa', 'Phẫu thuật', 'Tai nạn'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchKeyword(tag)}
                    className="text-[11px] sm:text-xs font-bold bg-[#F8FAFC] hover:bg-[#FFE500] text-slate-800 px-2 sm:px-2.5 py-1 border border-black shadow-[1.5px_1.5px_0px_#000] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-3">
              {filteredBenefits.length === 0 ? (
                <div className="text-center py-6 sm:py-8 border-2 border-dashed border-black/30 bg-slate-50">
                  <p className="font-bold text-slate-600 text-xs sm:text-sm">Không tìm thấy quyền lợi phù hợp với từ khóa này.</p>
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="mt-2 text-xs font-black text-blue-700 underline cursor-pointer"
                  >
                    Xem toàn bộ quyền lợi
                  </button>
                </div>
              ) : (
                filteredBenefits.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 bg-white border-2 border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 pb-2 mb-2 border-b border-black/10">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 bg-[#FFE500] border border-black shrink-0" />
                        <h4 className="font-display font-black text-sm sm:text-base text-[#0B2046] truncate">
                          {item.category}
                        </h4>
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-black text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 border border-emerald-800 self-start sm:self-auto break-words">
                        {item.limit}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-700 leading-relaxed mb-2">
                      <strong className="text-slate-900">Chi tiết:</strong> {item.condition}
                    </p>

                    <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                      <span className="text-blue-600 shrink-0">🏥 Bảo lãnh:</span>
                      <span className="truncate">{item.hospital}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Demo Footer Strip */}
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8FAFC] p-3 border border-black">
              <span className="text-xs font-bold text-slate-600 text-center sm:text-left">
                Thao tác thực tế chỉ mất <strong>0.3 giây</strong> trên ứng dụng Insuranote.
              </span>
              <button
                onClick={scrollToWaitlist}
                className="w-full sm:w-auto bg-[#FFE500] text-black text-xs font-black uppercase px-4 py-2 brutal-border shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] cursor-pointer text-center"
              >
                Đăng ký dùng thử miễn phí
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security E2EE Deep-Dive Section */}
      <section id="security" className="py-14 sm:py-20 bg-[#0B2046] text-white border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-block bg-[#FFE500] text-black font-black text-xs px-3 py-1 border-2 border-black brutal-shadow-sm uppercase mb-4">
                AN TOÀN BẢO MẬT TUYỆT ĐỐI
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4 sm:mb-6">
                Tại sao mã hóa E2EE là chìa khóa sống còn của đại lý bảo hiểm?
              </h2>
              <p className="text-slate-300 font-medium text-xs sm:text-base leading-relaxed mb-6">
                Thông tin hợp đồng chứa dữ liệu nhạy cảm nhất của khách hàng: số CCCD, tình trạng sức khỏe, viện phí,
                người thụ hưởng tài chính. Nếu lưu trữ bất cẩn, đại lý có thể đối mặt với rủi ro pháp lý và mất uy tín cá
                nhân vĩnh viễn.
              </p>

              <div className="space-y-3.5">
                <div className="bg-[#132D5A] border-2 border-white/40 p-3.5 sm:p-4 shadow-[3px_3px_0px_#000]">
                  <h4 className="font-bold text-xs sm:text-sm text-[#FFE500] mb-1 flex items-center gap-2">
                    <Lock className="w-4 h-4 shrink-0" />
                    Không bên thứ ba nào xem được (Zero-Knowledge)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Dữ liệu được mã hóa ngay trước khi rời điện thoại của bạn. Insuranote không lưu mật mã giải mã trên
                    máy chủ.
                  </p>
                </div>

                <div className="bg-[#132D5A] border-2 border-white/40 p-3.5 sm:p-4 shadow-[3px_3px_0px_#000]">
                  <h4 className="font-bold text-xs sm:text-sm text-[#FFE500] mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4 shrink-0" />
                    Khách hàng hoàn toàn yên tâm chia sẻ hợp đồng
                  </h4>
                  <p className="text-xs text-slate-300">
                    Khách hàng nắm quyền quyết định chia sẻ hợp đồng nào cho bạn xem qua kết nối mã hóa riêng biệt giữa hai thiết bị.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 w-full">
              <div className="bg-white text-black brutal-border brutal-shadow-lg p-4 sm:p-6 md:p-8 w-full">
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-black mb-4 sm:mb-6">
                  <span className="font-display font-black text-xs sm:text-sm uppercase">SƠ ĐỒ BẢO MẬT E2EE</span>
                  <span className="bg-[#FFE500] text-black font-black text-[11px] sm:text-xs px-2 py-0.5 border border-black shrink-0">
                    AES-GCM 256-BIT
                  </span>
                </div>

                {/* Architecture diagram steps */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#F8FAFC] border-2 border-black">
                    <div className="font-bold text-blue-900 mb-1 text-[11px] sm:text-xs">BƯỚC 1: THIẾT BỊ ĐẠI LÝ</div>
                    <div className="text-slate-600 font-sans text-xs">
                      Hợp đồng được mã hóa cục bộ bằng khóa riêng (Private Key) trước khi lưu.
                    </div>
                  </div>

                  <div className="text-center font-bold text-slate-500 py-1 text-[11px] sm:text-xs break-words">
                    ▼ DỮ LIỆU ĐÃ MÃ HÓA (CIPHERTEXT KHÔNG THỂ ĐỌC) ▼
                  </div>

                  <div className="p-3 bg-red-50 border-2 border-black">
                    <div className="font-bold text-red-900 mb-1 text-[11px] sm:text-xs">BƯỚC 2: CLOUD SERVER (ZERO-KNOWLEDGE)</div>
                    <div className="text-slate-600 font-sans text-xs">
                      Chỉ lưu chuỗi ký tự đã mã hóa. Quản trị viên máy chủ hoàn toàn KHÔNG THỂ đọc nội dung.
                    </div>
                  </div>

                  <div className="text-center font-bold text-slate-500 py-1 text-[11px] sm:text-xs break-words">
                    ▼ ĐỒNG BỘ AN TOÀN TỚI THIẾT BỊ KHÁCH HÀNG ▼
                  </div>

                  <div className="p-3 bg-emerald-50 border-2 border-black">
                    <div className="font-bold text-emerald-900 mb-1 text-[11px] sm:text-xs">BƯỚC 3: THIẾT BỊ KHÁCH HÀNG</div>
                    <div className="text-slate-600 font-sans text-xs">
                      Ứng dụng giải mã hợp đồng trên điện thoại khách hàng bằng khóa bảo mật FaceID/Vân tay.
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-black text-center text-xs font-bold text-slate-700">
                  🛡️ Bảo vệ trọn vẹn danh tiếng nghề nghiệp và cam kết bảo mật của bạn.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial section: Tạm ẩn theo yêu cầu người dùng */}

      {/* FAQ Section */}
      <section id="faq" className="py-14 sm:py-20 bg-[#F1F5F9] border-b-[3px] border-black">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-block bg-[#FFE500] text-black font-black text-xs px-3 py-1 border-2 border-black brutal-shadow-sm uppercase mb-3">
              GIẢI ĐÁP THẮC MẮC
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#0B2046] tracking-tight">
              Câu hỏi thường gặp của đại lý
            </h2>
            <p className="mt-3 text-slate-700 font-medium text-xs sm:text-base">
              Mọi điều bạn cần biết trước khi tham gia danh sách chờ của Insuranote.
            </p>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white brutal-border brutal-shadow transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-display font-black text-sm sm:text-base text-[#0B2046] hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FFE500] brutal-border-sm flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[3]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[3]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed border-t-2 border-black/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-14 sm:py-20 bg-[#0B2046] border-b-[3px] border-black relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative">
          <div className="bg-[#FFE500] brutal-border brutal-shadow p-5 sm:p-8 md:p-12 text-center relative w-full">
            <span className="inline-block bg-black text-[#FFE500] font-black text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 uppercase tracking-wider mb-3 sm:mb-4 border border-black">
              ĐỪNG ĐỂ KHÁCH HÀNG RƠI RỤNG
            </span>

            <h2 className="font-display text-xl sm:text-3xl md:text-5xl font-black text-black tracking-tight mb-3 sm:mb-4">
              Sẵn sàng nâng tầm dịch vụ đại lý và giữ chân khách hàng trọn đời?
            </h2>

            <p className="text-slate-900 font-bold text-xs sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
              Tham gia ngay hôm nay để nhận quyền sử dụng <strong>Insuranote PRO miễn phí 06 tháng</strong> dành cho 100
              đại lý đầu tiên. Không cần thẻ tín dụng.
            </p>

            {/* Bottom Form */}
            <form
              onSubmit={handleBottomSubmit}
              className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5 sm:gap-3 bg-white p-2.5 sm:p-3 brutal-border brutal-shadow mb-5 sm:mb-6 w-full"
            >
              <div className="relative flex-1 min-w-0 w-full">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input
                  type="email"
                  value={emailBottom}
                  onChange={e => setEmailBottom(e.target.value)}
                  placeholder="Nhập email của bạn (vd: hoa.mdrt@gmail.com)..."
                  required
                  className="w-full min-w-0 pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-[#F8FAFC] border-2 border-black text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFE500] text-xs sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#0B2046] hover:bg-[#132D5A] text-white font-black uppercase text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 brutal-border shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <span>Nhận ưu đãi 6 tháng Pro</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-black text-slate-800">
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-black stroke-[3]" /> Đã có {waitlistNumber} đại lý đăng ký
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-black stroke-[3]" /> Không spam
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-black stroke-[3]" /> Mã hóa E2EE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 sm:py-12 border-t-[3px] border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Col 1: Wordmark & Statement */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#FFE500] brutal-border flex items-center justify-center">
                  <Shield className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <span className="font-display text-xl font-black text-[#0B2046] uppercase">
                  INSURANOTE
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium max-w-sm leading-relaxed mb-4">
                Nền tảng SaaS quản lý hợp đồng bảo hiểm an toàn (E2EE) và tự động nhắc lịch tái tục dành riêng cho đại lý
                và khách hàng bảo hiểm tại Việt Nam.
              </p>
              <div className="text-xs font-bold text-slate-500">
                🔒 Cam kết bảo mật tiêu chuẩn mã hóa AES-GCM 256-bit &amp; Zero-Knowledge.
              </div>
            </div>

            {/* Col 2: Liên kết nhanh */}
            <div>
              <h4 className="font-display font-black text-xs uppercase tracking-wider text-[#0B2046] mb-3">
                Khám phá
              </h4>
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li>
                  <a href="#features" className="hover:text-amber-600 transition-colors">
                    Nhắc lịch tái tục tự động
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-amber-600 transition-colors">
                    Tra cứu quyền lợi siêu tốc
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-amber-600 transition-colors">
                    Kho lưu trữ cho khách hàng
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-amber-600 transition-colors">
                    Kiến trúc bảo mật E2EE
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Thông tin liên hệ */}
            <div>
              <h4 className="font-display font-black text-xs uppercase tracking-wider text-[#0B2046] mb-3">
                Liên hệ hợp tác
              </h4>
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href="mailto:contact@insuranote.vn" className="hover:underline truncate">
                    contact@insuranote.vn
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Hỗ trợ đại lý: 1900 xxxx (8h-20h)</span>
                </li>
                <li className="text-slate-500 font-medium text-[11px] pt-1">
                  Hà Nội &amp; TP. Hồ Chí Minh, Việt Nam
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t-2 border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-slate-500 text-center sm:text-left">
            <div>
              © 2026 Insuranote. Bảo lưu mọi quyền. Sản phẩm công nghệ phục vụ cộng đồng đại lý bảo hiểm Việt Nam.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">Điều khoản</a>
              <span>·</span>
              <a href="#" className="hover:underline">Bảo mật E2EE</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {submittedEmail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white brutal-border brutal-shadow-lg max-w-md w-full p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFE500] brutal-border flex items-center justify-center mx-auto mb-4 brutal-shadow-sm">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-black stroke-[2.5]" />
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-center text-[#0B2046] mb-2">
              Chúc mừng bạn đã vào Waitlist!
            </h3>

            <p className="text-center text-xs font-medium text-slate-700 mb-5">
              Email xác nhận kèm mã ưu đãi <strong>6 tháng PRO miễn phí</strong> đã được gửi tới:
              <br />
              <strong className="text-black font-black text-sm break-all">{submittedEmail}</strong>
            </p>

            <div className="bg-[#FEF08A] border-2 border-black p-3.5 mb-5 text-center">
              <span className="text-[11px] font-black uppercase text-amber-900 block mb-1">
                SỐ THỨ TỰ TRONG DANH SÁCH CHỜ:
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-black">
                #{waitlistNumber}
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 block mt-1">
                (Nằm trong nhóm 500 đại lý tiên phong nhận hỗ trợ VIP)
              </span>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={copyShareLink}
                className="w-full bg-[#0B2046] hover:bg-[#132D5A] text-white font-black uppercase text-xs py-3 brutal-border shadow-[2px_2px_0px_#000] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'Đã sao chép liên kết!' : 'Chia sẻ cho đồng đội'}</span>
              </button>

              <button
                onClick={() => setSubmittedEmail(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-black font-bold text-xs py-2.5 border-2 border-black cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
