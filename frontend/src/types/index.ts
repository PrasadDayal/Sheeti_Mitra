export type CropType = 'Grapes' | 'Pomegranate';

export type DistrictMaharashtra = 
  | 'Nashik' 
  | 'Sangli' 
  | 'Pune' 
  | 'Solapur' 
  | 'Ahilyanagar' 
  | 'Satara' 
  | 'Kolhapur' 
  | 'Beed' 
  | 'Chhatrapati Sambhajinagar';

export type LanguageCode = 'mr' | 'hi' | 'en';

export interface FarmerProfile {
  id: string;
  name: string;
  nameMr?: string;
  mobile: string;
  village: string;
  district: DistrictMaharashtra;
  language: LanguageCode;
  primaryCrop: CropType;
  totalAcres: number;
  waterSource: string;
  soilType: string;
  memberSince: string;
}

export interface FarmField {
  id: string;
  name: string;
  acres: number;
  crop: CropType;
  variety: string;
  plantingYear: number;
  irrigationType: string;
  soilType: string;
  status: 'Active' | 'Harvesting' | 'Pruning' | 'Resting';
  currentStage: string;
}

export type ActivityCategory = 
  | 'Fertilizer' 
  | 'Spraying' 
  | 'Irrigation' 
  | 'Labour' 
  | 'Pruning' 
  | 'Harvest' 
  | 'Canopy' 
  | 'Bagging' 
  | 'Other';

export interface CropActivity {
  id: string;
  fieldId: string;
  fieldName: string;
  crop: CropType;
  stage: string;
  title: string;
  titleMr?: string;
  category: ActivityCategory;
  status: 'Completed' | 'Upcoming' | 'Overdue';
  date: string;
  estimatedCost: number;
  actualCost?: number;
  notes: string;
}

export type ExpenseCategory = 
  | 'Labour' 
  | 'Fertilizer' 
  | 'Crop Protection' 
  | 'Irrigation' 
  | 'Machinery' 
  | 'Transport' 
  | 'Packaging' 
  | 'Other';

export interface FarmExpense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  crop: CropType;
  fieldId: string;
  fieldName: string;
  description: string;
  paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer' | 'Credit';
  receiptAttached?: boolean;
}

export interface HarvestBatch {
  id: string;
  batchNumber: string;
  harvestDate: string;
  crop: CropType;
  fieldId: string;
  fieldName: string;
  quantityKg: number;
  grade: 'Grade A (Export)' | 'Grade A (Domestic)' | 'Grade B' | 'Grade C';
  sugarBrix?: number;
  rejectedKg: number;
  buyerName: string;
  sellingPricePerKg: number;
  totalRevenue: number;
  transportCost: number;
  netRealizationPerKg: number;
  notes: string;
}

export interface MarketPricePoint {
  id: string;
  date: string;
  crop: CropType;
  variety: string;
  district: DistrictMaharashtra;
  marketName: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  previousPrice: number;
  arrivalTonnes: number;
  dailyChangePercent: number;
  trend: 'up' | 'down' | 'stable';
}

export type BuyerVerification = 'Demo Verified' | 'Partner Verified' | 'Verification Pending';

export interface Buyer {
  id: string;
  name: string;
  companyName: string;
  companyType: 'Exporter' | 'APMC Commission Agent' | 'Corporate Retailer' | 'Processor / Winery' | 'Local Aggregator';
  district: DistrictMaharashtra;
  location: string;
  distanceKm: number;
  preferredCrop: CropType;
  varieties: string[];
  offerPricePerKg: number;
  minQuantityKg: number;
  maxQuantityKg: number;
  pickupAvailable: boolean;
  paymentTerms: string;
  verificationStatus: BuyerVerification;
  rating: number;
  completedDealsCount: number;
  phone: string;
  contactPerson: string;
  notes: string;
  historySummary?: string;
}

export interface SellingOptionComparison {
  id: string;
  targetName: string;
  targetType: 'Buyer Pickup' | 'Direct APMC Mandi' | 'Cold Storage Sale' | 'Exporter Hub';
  location: string;
  distanceKm: number;
  offerPricePerKg: number;
  transportCostPerKg: number;
  loadingUnloadingCostPerKg: number;
  marketCessCommissionPerKg: number;
  packagingOtherCostPerKg: number;
  estimatedNetRealizationPerKg: number;
  totalGrossRevenue: number;
  totalEstimatedSellingExpenses: number;
  totalEstimatedNetRealization: number;
  totalEstimatedProfit: number;
  isRecommended: boolean;
  differenceVsTopOption: number;
  reasoning: string;
}

export interface InputProduct {
  id: string;
  name: string;
  category: 'Fertilizer' | 'Crop Protection' | 'Seeds' | 'Bio-stimulants' | 'Specialty Nutrition';
  brand: string;
  packSize: string;
  price: number;
  discountedPrice?: number;
  inStock: boolean;
  targetCrop: CropType | 'All';
  description: string;
}

export interface InputShop {
  id: string;
  shopName: string;
  ownerName: string;
  district: DistrictMaharashtra;
  location: string;
  distanceKm: number;
  phone: string;
  isVerified: boolean;
  licenseNumber: string;
  rating: number;
  products: InputProduct[];
}

export interface FarmerNotification {
  id: string;
  type: 'market' | 'buyer' | 'expense' | 'profit' | 'service' | 'weather';
  title: string;
  titleMr?: string;
  message: string;
  messageMr?: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionableRoute?: string;
  actionText?: string;
}

export interface StressScenario {
  priceChangePercent: number;
  yieldChangePercent: number;
  inputCostChangePercent: number;
  transportCostChangePercent: number;
}
