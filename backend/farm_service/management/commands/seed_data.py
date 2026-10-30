from django.core.management.base import BaseCommand
from farm_service.models import (
    FarmerProfile,
    FarmField,
    CropActivity,
    FarmExpense,
    HarvestBatch,
    Buyer,
    MarketPricePoint,
    InputShop,
    InputProduct,
    FarmerNotification,
    EquipmentItem,
)

class Command(BaseCommand):
    help = 'Seeds clean baseline platform data (verified buyers, APMC mandis, input shops, equipment store)'

    def handle(self, *args, **options):
        self.stdout.write("Seeding baseline platform market data...")

        # 1. Verified Buyers & Exporters for Maharashtra
        buyers_data = [
            {
                'id': 'buyer-01',
                'name': 'Maharashtra Fresh Produce Exporters',
                'companyName': 'MahaFresh Agro Pvt. Ltd.',
                'companyType': 'Exporter',
                'district': 'Nashik',
                'location': 'Pimpalgaon Baswant Industrial Zone',
                'distanceKm': 24,
                'preferredCrop': 'Grapes',
                'varieties': ['Thompson Seedless', 'Sonaka', 'Sharad Seedless', 'Super Sonaka'],
                'offerPricePerKg': 106,
                'minQuantityKg': 1000,
                'maxQuantityKg': 50000,
                'pickupAvailable': True,
                'paymentTerms': '50% on Loading + 50% within 48 hrs Bank Transfer',
                'verificationStatus': 'Demo Verified',
                'rating': 4.8,
                'completedDealsCount': 142,
                'phone': '+91 94222 18901',
                'contactPerson': 'Sachin Shinde (Procurement Head)',
                'notes': 'Direct farm-gate pickup for refrigerated European containers. Requires 16-18mm berry size.',
                'historySummary': 'Consistent on-time payment track record across 12 FPOs in Nashik.',
            },
            {
                'id': 'buyer-02',
                'name': 'Sahyadri Farmers Producer Co. Aggregator',
                'companyName': 'Sahyadri Farm Fresh Hub',
                'companyType': 'Corporate Retailer',
                'district': 'Nashik',
                'location': 'Mohadi, Dindori Road',
                'distanceKm': 14,
                'preferredCrop': 'Grapes',
                'varieties': ['Thompson Seedless', 'Sonaka', 'Jumbo Purple'],
                'offerPricePerKg': 104,
                'minQuantityKg': 800,
                'maxQuantityKg': 75000,
                'pickupAvailable': True,
                'paymentTerms': '100% Direct DBT Bank Credit in 3 working days',
                'verificationStatus': 'Partner Verified',
                'rating': 4.9,
                'completedDealsCount': 380,
                'phone': '+91 98220 99881',
                'contactPerson': 'Anand Kulkarni (APMC & Direct Sourcing)',
                'notes': 'Largest farmer cooperative hub in Maharashtra. Guaranteed transparent digital weighbridge.',
                'historySummary': 'Partnered with over 18,000 grape and pomegranate growers in Maharashtra.',
            },
            {
                'id': 'buyer-03',
                'name': 'Mahagrapes Export Consortium',
                'companyName': 'Mahagrapes Federation',
                'companyType': 'Exporter',
                'district': 'Sangli',
                'location': 'Tasgaon MIDC & Nashik Branch',
                'distanceKm': 38,
                'preferredCrop': 'Grapes',
                'varieties': ['Thompson Seedless', 'Manik Chaman', 'Sonaka'],
                'offerPricePerKg': 108,
                'minQuantityKg': 2000,
                'maxQuantityKg': 100000,
                'pickupAvailable': False,
                'paymentTerms': 'Letter of Credit / Bank RTGS in 5 days post quality grading',
                'verificationStatus': 'Partner Verified',
                'rating': 4.7,
                'completedDealsCount': 215,
                'phone': '+91 94230 45112',
                'contactPerson': 'Kailas More',
                'notes': 'Highest gross rate for GlobalGAP certified export batches. Farmer delivers to cold chain hub.',
                'historySummary': 'Pioneer grape export federation since 1991.',
            },
            {
                'id': 'buyer-04',
                'name': 'Solapur Pomegranate Export Hub',
                'companyName': 'MahaAnar Agri Logistics',
                'companyType': 'Exporter',
                'district': 'Solapur',
                'location': 'Sangola APMC Yard & Solapur MIDC',
                'distanceKm': 45,
                'preferredCrop': 'Pomegranate',
                'varieties': ['Bhagwa', 'Super Bhagwa', 'Arakta'],
                'offerPricePerKg': 155,
                'minQuantityKg': 1500,
                'maxQuantityKg': 60000,
                'pickupAvailable': True,
                'paymentTerms': '100% RTGS within 48 hours of digital weight check',
                'verificationStatus': 'Partner Verified',
                'rating': 4.8,
                'completedDealsCount': 190,
                'phone': '+91 98233 44556',
                'contactPerson': 'Dattatray Gaikwad',
                'notes': 'Specialized Bhagwa pomegranate procurement for Middle East & European markets.',
                'historySummary': 'Sourcing from over 5,000 Solapur & Sangli growers.',
            }
        ]
        for b in buyers_data:
            Buyer.objects.update_or_create(id=b['id'], defaults=b)

        # 2. Live APMC Mandi Market Prices
        mandi_data = [
            {
                'id': 'mkt-01',
                'date': '2026-02-14',
                'crop': 'Grapes',
                'variety': 'Thompson Seedless',
                'district': 'Nashik',
                'marketName': 'Pimpalgaon Baswant APMC',
                'minPrice': 82,
                'maxPrice': 118,
                'modalPrice': 102,
                'previousPrice': 98,
                'arrivalTonnes': 420,
                'dailyChangePercent': 4.08,
                'trend': 'up',
            },
            {
                'id': 'mkt-02',
                'date': '2026-02-14',
                'crop': 'Grapes',
                'variety': 'Tas-A-Ganesh / Sonaka',
                'district': 'Sangli',
                'marketName': 'Tasgaon APMC Yard',
                'minPrice': 88,
                'maxPrice': 122,
                'modalPrice': 106,
                'previousPrice': 103,
                'arrivalTonnes': 310,
                'dailyChangePercent': 2.91,
                'trend': 'up',
            },
            {
                'id': 'mkt-03',
                'date': '2026-02-14',
                'crop': 'Pomegranate',
                'variety': 'Bhagwa (A-Grade)',
                'district': 'Solapur',
                'marketName': 'Solapur APMC Main Yard',
                'minPrice': 110,
                'maxPrice': 185,
                'modalPrice': 152,
                'previousPrice': 148,
                'arrivalTonnes': 180,
                'dailyChangePercent': 2.7,
                'trend': 'up',
            },
            {
                'id': 'mkt-04',
                'date': '2026-02-14',
                'crop': 'Grapes',
                'variety': 'Sharad Seedless (Black)',
                'district': 'Pune',
                'marketName': 'Pune Gultekdi Market Yard',
                'minPrice': 75,
                'maxPrice': 110,
                'modalPrice': 96,
                'previousPrice': 95,
                'arrivalTonnes': 220,
                'dailyChangePercent': 1.05,
                'trend': 'stable',
            }
        ]
        for m in mandi_data:
            MarketPricePoint.objects.update_or_create(id=m['id'], defaults=m)

        # 3. Input Shops & Certified Agro Centers
        shop, _ = InputShop.objects.update_or_create(
            id='shop-01',
            defaults={
                'shopName': 'Krishi Samruddhi Agro Seva Kendra',
                'ownerName': 'Sambhaji Shinde',
                'district': 'Nashik',
                'location': 'Dindori Market Yard, Nashik',
                'distanceKm': 4.2,
                'phone': '+91 94227 65432',
                'isVerified': True,
                'licenseNumber': 'MH-NSK-AGRO-2022-8871',
                'rating': 4.8,
            }
        )
        InputProduct.objects.update_or_create(
            id='prod-01',
            defaults={
                'shop': shop,
                'name': 'SoluPotash (0:0:50) Potassium Sulphate',
                'category': 'Fertilizer',
                'brand': 'Tessenderlo Kerley',
                'packSize': '25 kg Bag',
                'price': 2950,
                'discountedPrice': 2750,
                'inStock': True,
                'targetCrop': 'Grapes',
                'description': '100% water soluble chlorine-free potassium for grape berry sugar Brix accumulation.',
            }
        )

        # 4. Equipment Store Catalog
        equipment_data = [
            {
                'id': 'eq-1',
                'nameMr': '१६ लिटर २-इन-१ हाय-प्रेशर बॅटरी स्प्रेअर पंप',
                'nameHi': '16 लीटर 2-इन-1 हाई-प्रेशर बैटरी स्प्रेयर पंप',
                'nameEn': '16L 2-in-1 Dual-Motor High Pressure Battery Sprayer',
                'brand': 'KisanKraft / Balwaan',
                'category': 'sprayers',
                'categoryLabelMr': 'स्प्रेअर पंप (Sprayers)',
                'categoryLabelHi': 'स्प्रेयर पंप',
                'categoryLabelEn': 'Sprayers & Pumps',
                'price': 3499,
                'originalPrice': 5200,
                'subsidyEligible': True,
                'subsidyPercent': 50,
                'subsidyAmount': 1750,
                'rating': 4.8,
                'reviews': 240,
                'imageUrl': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
                'warranty': '1 Year Full Motor & Battery Replacement Warranty',
                'deliveryDays': '2-3 Days Free Farm Delivery',
                'specs': {
                    'en': [{'label': 'Tank Capacity', 'value': '16 Litres'}, {'label': 'Battery', 'value': '12V 12Ah Heavy Duty'}]
                },
                'features': {
                    'en': ['Dual high-pressure motor', 'Regulator pressure valve', 'Continuous 6-8 hours battery backup']
                }
            },
            {
                'id': 'eq-2',
                'nameMr': 'इलेक्ट्रिक कॉर्डलेस प्रूनिंग कात्री (Battery Pruner)',
                'nameHi': 'इलेक्ट्रिक कॉर्डलेस प्रूनिंग कैंची',
                'nameEn': 'Professional Cordless Electric Pruning Shear (30mm Cut)',
                'brand': 'STIHL / Falcon Professional',
                'category': 'pruning',
                'categoryLabelMr': 'छाटणी अवजारे (Pruning)',
                'categoryLabelHi': 'छंटाई उपकरण',
                'categoryLabelEn': 'Pruning & Shears',
                'price': 7999,
                'originalPrice': 12500,
                'subsidyEligible': True,
                'subsidyPercent': 40,
                'subsidyAmount': 3200,
                'rating': 4.9,
                'reviews': 185,
                'imageUrl': 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
                'warranty': '2 Years Manufacturer Warranty',
                'deliveryDays': '2-3 Days Free Farm Delivery',
                'specs': {
                    'en': [{'label': 'Cutting Diameter', 'value': '30mm / 1.2 Inch'}, {'label': 'Blade Material', 'value': 'SK5 High-Carbon Steel'}]
                },
                'features': {
                    'en': ['Effortless clean cuts saving 60% labour time', 'Dual lithium battery packs included']
                }
            }
        ]
        for eq in equipment_data:
            EquipmentItem.objects.update_or_create(id=eq['id'], defaults=eq)

        self.stdout.write(self.style.SUCCESS("Successfully seeded baseline platform market data!"))
