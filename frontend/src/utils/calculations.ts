import { Buyer, FarmExpense, SellingOptionComparison, StressScenario } from '../types';

export interface TransportVehicleOption {
  type: string;
  capacityKg: number;
  baseRatePerKm: number;
  minCharge: number;
  loadingUnloadingCost: number;
}

export const VEHICLE_OPTIONS: TransportVehicleOption[] = [
  {
    type: 'Mini Pickup (Tata Ace / Bolero Maxi)',
    capacityKg: 1200,
    baseRatePerKm: 28,
    minCharge: 800,
    loadingUnloadingCost: 500,
  },
  {
    type: 'Medium Truck (14ft Eicher / Ashok Leyland)',
    capacityKg: 4000,
    baseRatePerKm: 42,
    minCharge: 1800,
    loadingUnloadingCost: 1200,
  },
  {
    type: 'Large Heavy Truck (10 Wheeler / 16 Tonner)',
    capacityKg: 12000,
    baseRatePerKm: 75,
    minCharge: 4000,
    loadingUnloadingCost: 2800,
  },
];

/**
 * Calculates estimated transport cost per kg based on total load and distance.
 */
export function calculateTransportCostPerKg(
  distanceKm: number,
  quantityKg: number,
  customVehicleRate?: number
): { totalTransportCost: number; costPerKg: number } {
  if (quantityKg <= 0 || distanceKm <= 0) {
    return { totalTransportCost: 0, costPerKg: 0 };
  }

  // Find most suitable vehicle
  let vehicle = VEHICLE_OPTIONS[0];
  if (quantityKg > 4000) {
    vehicle = VEHICLE_OPTIONS[2];
  } else if (quantityKg > 1200) {
    vehicle = VEHICLE_OPTIONS[1];
  }

  const ratePerKm = customVehicleRate || vehicle.baseRatePerKm;
  // Round trip or loaded trip calculation (typically 1.4x for empty return factor or direct hire)
  const totalTransportCost = Math.max(vehicle.minCharge, Math.round(distanceKm * ratePerKm * 1.3));
  const costPerKg = parseFloat((totalTransportCost / quantityKg).toFixed(2));

  return { totalTransportCost, costPerKg };
}

/**
 * Calculates Net Realization comparison across all potential buyers and mandis.
 */
export function calculateSellingComparisons(
  buyers: Buyer[],
  quantityKg: number,
  totalIncurredCost: number,
  mandiBenchmarkPrice: number = 102
): SellingOptionComparison[] {
  const options: SellingOptionComparison[] = [];

  // Add buyer options
  buyers.forEach((b) => {
    // If pickup is available by buyer at farm gate, transport cost is 0 for farmer
    const transportCalc = b.pickupAvailable
      ? { totalTransportCost: 0, costPerKg: 0 }
      : calculateTransportCostPerKg(b.distanceKm, quantityKg);

    const transportPerKg = transportCalc.costPerKg;
    const loadingPerKg = b.pickupAvailable ? 0.3 : 0.6; // crates loading helper
    const marketCommissionPerKg = 0; // Private buyer direct deal (no mandi cess)
    const packagingPerKg = 0.5; // Corrugated box / plastic lining crate charge

    const totalSellingCostPerKg = transportPerKg + loadingPerKg + marketCommissionPerKg + packagingPerKg;
    const netRealizationPerKg = parseFloat((b.offerPricePerKg - totalSellingCostPerKg).toFixed(2));

    const totalGrossRevenue = Math.round(b.offerPricePerKg * quantityKg);
    const totalEstimatedSellingExpenses = Math.round(totalSellingCostPerKg * quantityKg);
    const totalEstimatedNetRealization = Math.round(netRealizationPerKg * quantityKg);
    const totalEstimatedProfit = totalEstimatedNetRealization - totalIncurredCost;

    options.push({
      id: b.id,
      targetName: b.name,
      targetType: b.pickupAvailable ? 'Buyer Pickup' : 'Exporter Hub',
      location: `${b.location} (${b.district})`,
      distanceKm: b.distanceKm,
      offerPricePerKg: b.offerPricePerKg,
      transportCostPerKg: transportPerKg,
      loadingUnloadingCostPerKg: loadingPerKg,
      marketCessCommissionPerKg: marketCommissionPerKg,
      packagingOtherCostPerKg: packagingPerKg,
      estimatedNetRealizationPerKg: netRealizationPerKg,
      totalGrossRevenue,
      totalEstimatedSellingExpenses,
      totalEstimatedNetRealization,
      totalEstimatedProfit,
      isRecommended: false,
      differenceVsTopOption: 0,
      reasoning: b.pickupAvailable 
        ? `Zero transport deduction (Farm-gate pickup). Fast clearance with ${b.paymentTerms}.` 
        : `Requires self-transport (${b.distanceKm} km). Good gross rate of ₹${b.offerPricePerKg}/kg.`,
    });
  });

  // Add APMC Mandi Benchmark Option
  const mandiDistance = 35; // typical distance to major APMC (e.g. Pimpalgaon or Tasgaon)
  const mandiTransport = calculateTransportCostPerKg(mandiDistance, quantityKg);
  const mandiLoading = 0.8; // Hamali / Varai
  const mandiCommission = parseFloat((mandiBenchmarkPrice * 0.05).toFixed(2)); // ~5% APMC cess/commission
  const mandiPackaging = 0.5;

  const mandiTotalSellingCost = mandiTransport.costPerKg + mandiLoading + mandiCommission + mandiPackaging;
  const mandiNetRealization = parseFloat((mandiBenchmarkPrice - mandiTotalSellingCost).toFixed(2));
  const mandiGrossRev = Math.round(mandiBenchmarkPrice * quantityKg);
  const mandiNetRev = Math.round(mandiNetRealization * quantityKg);

  options.push({
    id: 'mandi-pimpalgaon-bench',
    targetName: 'Pimpalgaon / Lasalgaon APMC Auction',
    targetType: 'Direct APMC Mandi',
    location: 'APMC Yard (Nashik District)',
    distanceKm: mandiDistance,
    offerPricePerKg: mandiBenchmarkPrice,
    transportCostPerKg: mandiTransport.costPerKg,
    loadingUnloadingCostPerKg: mandiLoading,
    marketCessCommissionPerKg: mandiCommission,
    packagingOtherCostPerKg: mandiPackaging,
    estimatedNetRealizationPerKg: mandiNetRealization,
    totalGrossRevenue: mandiGrossRev,
    totalEstimatedSellingExpenses: Math.round(mandiTotalSellingCost * quantityKg),
    totalEstimatedNetRealization: mandiNetRev,
    totalEstimatedProfit: mandiNetRev - totalIncurredCost,
    isRecommended: false,
    differenceVsTopOption: 0,
    reasoning: 'Open auction price with standard APMC Hamali (₹0.8/kg) and market commission (5%). Daily cash settlement.',
  });

  // Sort by highest net realization
  options.sort((a, b) => b.estimatedNetRealizationPerKg - a.estimatedNetRealizationPerKg);

  if (options.length > 0) {
    options[0].isRecommended = true;
    const topNet = options[0].estimatedNetRealizationPerKg;
    options.forEach((opt) => {
      opt.differenceVsTopOption = parseFloat((topNet - opt.estimatedNetRealizationPerKg).toFixed(2));
    });
  }

  return options;
}

/**
 * Calculates break-even price per kg
 */
export function calculateBreakEven(totalCost: number, marketableQuantityKg: number): number {
  if (marketableQuantityKg <= 0) return 0;
  return parseFloat((totalCost / marketableQuantityKg).toFixed(2));
}

/**
 * Computes stress test scenario output
 */
export function computeStressScenario(
  basePrice: number,
  baseYieldKg: number,
  baseCost: number,
  baseTransportCost: number,
  scenario: StressScenario
) {
  const adjustedPrice = basePrice * (1 + scenario.priceChangePercent / 100);
  const adjustedYield = baseYieldKg * (1 + scenario.yieldChangePercent / 100);
  const adjustedCost = baseCost * (1 + scenario.inputCostChangePercent / 100);
  const adjustedTransport = baseTransportCost * (1 + scenario.transportCostChangePercent / 100);

  const totalRevenue = Math.round(adjustedPrice * adjustedYield);
  const totalCost = Math.round(adjustedCost + adjustedTransport);
  const netProfit = totalRevenue - totalCost;
  const profitMarginPercent = totalRevenue > 0 ? parseFloat(((netProfit / totalRevenue) * 100).toFixed(1)) : 0;
  const breakEvenPrice = adjustedYield > 0 ? parseFloat((totalCost / adjustedYield).toFixed(2)) : 0;

  return {
    adjustedPrice: parseFloat(adjustedPrice.toFixed(2)),
    adjustedYield: Math.round(adjustedYield),
    totalRevenue,
    totalCost,
    netProfit,
    profitMarginPercent,
    breakEvenPrice,
    isLoss: netProfit < 0,
  };
}

/**
 * Formats numbers in Indian Lakhs / Rupees notation
 */
export function formatINR(val: number): string {
  if (Math.abs(val) >= 100000) {
    const inLakhs = (val / 100000).toFixed(2);
    return `₹${inLakhs}L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatNumberIndian(val: number): string {
  return new Intl.NumberFormat('en-IN').format(val);
}
