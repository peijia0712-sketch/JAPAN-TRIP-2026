import { ItineraryItem, ProductRecommendation, TranslationItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const initialItinerary: ItineraryItem[] = [
  {
    id: uuidv4(),
    date: '2026-04-04',
    time: '22:00',
    title: 'KL → 东京 (过夜机)',
    duration: '7h',
    travelTime: '6h 30m',
    location: 'Kuala Lumpur International Airport',
    transport: 'train',
    notes: '养精蓄锐 ✈️',
    link: 'https://www.malaysiaairlines.com',
    photo: 'https://picsum.photos/seed/klia/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-05',
    time: '08:00',
    title: '关西机场 → 伏见稻荷 → 锦市场 → 鸭川',
    duration: '10h',
    travelTime: '1h 15m (Haruka)',
    location: 'Fushimi Inari Taisha',
    transport: 'train',
    notes: 'Haruka 特急直达. Stay: Comfort Hotel ERA Kyoto Toji',
    link: 'https://www.westjr.co.jp/global/en/travel-information/pass/icoca-haruka/',
    photo: 'https://picsum.photos/seed/inari/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-06',
    time: '09:00',
    title: '清水寺 → 二年坂三年坂 → 八坂神社 → 祇园',
    duration: '8h',
    travelTime: '20m (Bus/Walk)',
    location: 'Kiyomizu-dera',
    transport: 'walk',
    notes: '樱花合照日 🌸. Stay: Comfort Hotel ERA Kyoto Toji',
    link: 'https://www.kiyomizudera.or.jp/en/',
    photo: 'https://picsum.photos/seed/kiyomizu/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-07',
    time: '09:00',
    title: '岚山小火车 → 竹林 → 渡月桥',
    duration: '8h',
    travelTime: '30m (JR Line)',
    location: 'Arashiyama Bamboo Grove',
    transport: 'train',
    notes: '岚山全天深度游. Stay: Comfort Hotel ERA Kyoto Toji',
    link: 'https://www.sagano-kanko.co.jp/en/',
    photo: 'https://picsum.photos/seed/arashiyama/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-08',
    time: '10:00',
    title: '京都补漏 → 大阪 (梅田入住)',
    duration: '4h',
    travelTime: '45m (JR Special Rapid)',
    location: 'Hotel Hankyu Respire Osaka',
    transport: 'train',
    notes: '晚间梅田晚餐. Stay: Hotel Hankyu Respire',
    link: 'https://www.hankyu-hotel.com/en/hotel/respire/osaka',
    photo: 'https://picsum.photos/seed/umeda/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-09',
    time: '10:00',
    title: '黑门市场 → 南波八阪神社 → 心斋桥 → 道顿堀',
    duration: '8h',
    travelTime: '15m (Subway)',
    location: 'Dotonbori',
    transport: 'walk',
    notes: '扫货模式开启 🛍️. Stay: Hotel Hankyu Respire',
    link: 'https://osaka-info.jp/en/spot/dotonbori/',
    photo: 'https://picsum.photos/seed/dotonbori/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-10',
    time: '07:30',
    title: 'USJ 环球影城全天',
    duration: '12h',
    travelTime: '25m (JR Yumesaki Line)',
    location: 'Universal Studios Japan',
    transport: 'train',
    notes: '07:30 准时出门. Stay: Hotel Hankyu Respire',
    link: 'https://www.usj.co.jp/web/en/us',
    photo: 'https://picsum.photos/seed/usj/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-11',
    time: '09:00',
    title: '奈良公园 (鹿) → 生驹山山顶乐园',
    duration: '8h',
    travelTime: '50m (Kintetsu Line)',
    location: 'Nara Park',
    transport: 'train',
    notes: '治愈系行程. Stay: Hotel Hankyu Respire',
    link: 'https://www.nara-park.com/en/',
    photo: 'https://picsum.photos/seed/nara/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-12',
    time: '09:00',
    title: '须磨海洋世界 → 海滩 → 神户港夜景',
    duration: '10h',
    travelTime: '1h (JR Line)',
    location: 'Suma Aqualife Park',
    transport: 'train',
    notes: '浪漫海滨线. Stay: Hotel Hankyu Respire',
    link: 'https://kobe-sumasui.jp/',
    photo: 'https://picsum.photos/seed/kobe/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-12',
    time: '14:00',
    title: '大阪儿童乐园 (Kids Plaza) → 扇町公园',
    duration: '4h',
    travelTime: '20m (Subway)',
    location: 'Kids Plaza Osaka',
    transport: 'train',
    notes: '亲子/深度必选. Stay: Hotel Hankyu Respire',
    link: 'https://www.kidsplaza.or.jp/en/',
    photo: 'https://picsum.photos/seed/kidsplaza/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-13',
    time: '06:30',
    title: '大阪 → 东京 (晴空塔 → 上野公园)',
    duration: '8h',
    travelTime: '3h (Shinkansen)',
    location: 'Tokyo Skytree',
    transport: 'train',
    notes: '06:30 往机场/车站. Stay: Inn Narita',
    link: 'https://www.tokyo-skytree.jp/en/',
    photo: 'https://picsum.photos/seed/skytree/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-14',
    time: '08:00',
    title: '富士山包车日 (河口湖/山中湖)',
    duration: '10h',
    travelTime: '2h (Private Car)',
    location: 'Lake Kawaguchiko',
    transport: 'taxi',
    notes: '记得带厚外套 🗻. Stay: Inn Narita',
    link: 'https://fujisan.ne.jp/en/',
    photo: 'https://picsum.photos/seed/fuji/600/300'
  },
  {
    id: uuidv4(),
    date: '2026-04-15',
    time: '08:00',
    title: '酒店出发去机场 → 回 KL',
    duration: '4h',
    travelTime: '1h (Narita Express)',
    location: 'Narita Airport',
    transport: 'train',
    notes: '11:25 航班 ✈️',
    link: 'https://www.narita-airport.jp/en/',
    photo: 'https://picsum.photos/seed/narita/600/300'
  },
];

export const regionalPicks: ProductRecommendation[] = [
  {
    id: 'k1',
    region: 'Kyoto',
    nameCN: '宇治抹茶粉',
    nameJP: '宇治抹茶',
    price: '¥1,500~',
    description: '京都必买伴手礼，适合制作拿铁或烘焙。推荐中村藤吉或伊藤久右卫门。'
  },
  {
    id: 'k2',
    region: 'Kyoto',
    nameCN: '吸油面纸',
    nameJP: 'あぶらとり紙',
    price: '¥400',
    description: 'Yojiya (よーじや) 的经典艺伎脸谱吸油面纸，精致好用。'
  },
  {
    id: 'o1',
    region: 'Osaka',
    nameCN: '老爷爷起司蛋糕',
    nameJP: 'りくろーおじさんの店',
    price: '¥965',
    description: '口感绵密如空气，现烤出炉最好吃。'
  },
  {
    id: 'o2',
    region: 'Osaka',
    nameCN: '食倒太郎布丁',
    nameJP: 'くいだおれ太郎プリン',
    price: '¥1,200',
    description: '包装可爱，附带小帽子，焦糖酱稍微苦甜，很有大阪特色。'
  },
  {
    id: 't1',
    region: 'Tokyo',
    nameCN: '东京香蕉',
    nameJP: '東京ばな奈',
    price: '¥1,200',
    description: '经典伴手礼，海绵蛋糕包裹香蕉卡仕达酱。'
  },
  {
    id: 't2',
    region: 'Tokyo',
    nameCN: 'Press Butter Sand',
    nameJP: 'プレスバターサンド',
    price: '¥1,000',
    description: '焦糖奶油夹心饼干，口感酥脆，包装现代时尚。'
  },
];

export const translations: TranslationItem[] = [
  { category: 'General', cn: '这个多少钱？', jp: 'これはいくらですか？', pronunciation: 'Kore wa ikura desu ka?' },
  { category: 'General', cn: '有免税吗？', jp: '免税（めんぜい）はありますか？', pronunciation: 'Menzei wa arimasu ka?' },
  { category: 'Drugstore', cn: '感冒药', jp: '風邪薬（かぜぐすり）', pronunciation: 'Kazegusuri' },
  { category: 'Drugstore', cn: '止痛药', jp: '痛み止め（いたみどめ）', pronunciation: 'Itamidome' },
  { category: 'Drugstore', cn: '眼药水', jp: '目薬（目薬）', pronunciation: 'Megusuri' },
  { category: 'Drugstore', cn: '肠胃药', jp: '胃腸薬（いちょうやく）', pronunciation: 'Ichouyaku' },
  { category: 'Drugstore', cn: '面膜', jp: 'フェイスマスク', pronunciation: 'Feisu masuku' },
  { category: 'Drugstore', cn: '防晒霜', jp: '日焼け止め', pronunciation: 'Hiyakedome' },
  { category: 'Dining', cn: '请给我菜单', jp: 'メニューをください', pronunciation: 'Menyu o kudasai' },
  { category: 'Dining', cn: '我不吃辣', jp: '辛いものは食べられません', pronunciation: 'Karai mono wa taberaremasen' },
];
