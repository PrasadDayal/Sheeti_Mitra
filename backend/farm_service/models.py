from django.db import models

class FarmerProfile(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=120)
    nameMr = models.CharField(max_length=120, blank=True, null=True)
    mobile = models.CharField(max_length=20, unique=True)
    village = models.CharField(max_length=120)
    district = models.CharField(max_length=64)
    language = models.CharField(max_length=10, default='mr')
    primaryCrop = models.CharField(max_length=30, default='Grapes')
    totalAcres = models.FloatField(default=3.5)
    waterSource = models.CharField(max_length=200, blank=True)
    soilType = models.CharField(max_length=200, blank=True)
    memberSince = models.CharField(max_length=30, default='2023')
    password = models.CharField(max_length=128, blank=True, null=True)
    auth_token = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.mobile})"


class FarmField(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, related_name='fields', null=True, blank=True)
    name = models.CharField(max_length=120)
    acres = models.FloatField(default=1.0)
    crop = models.CharField(max_length=30, default='Grapes')
    variety = models.CharField(max_length=100)
    plantingYear = models.IntegerField(default=2020)
    irrigationType = models.CharField(max_length=100)
    soilType = models.CharField(max_length=100)
    status = models.CharField(max_length=30, default='Active')
    currentStage = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class CropActivity(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, related_name='activities', null=True, blank=True)
    fieldId = models.CharField(max_length=64)
    fieldName = models.CharField(max_length=120)
    crop = models.CharField(max_length=30, default='Grapes')
    stage = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    titleMr = models.CharField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=50)
    status = models.CharField(max_length=30, default='Upcoming')
    date = models.CharField(max_length=30)
    estimatedCost = models.FloatField(default=0)
    actualCost = models.FloatField(null=True, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.title} - {self.status}"


class FarmExpense(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, related_name='expenses', null=True, blank=True)
    category = models.CharField(max_length=50)
    amount = models.FloatField(default=0)
    date = models.CharField(max_length=30)
    crop = models.CharField(max_length=30, default='Grapes')
    fieldId = models.CharField(max_length=64)
    fieldName = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    paymentMethod = models.CharField(max_length=50, default='UPI')
    receiptAttached = models.BooleanField(default=False)

    def __str__(self):
        return f"₹{self.amount} - {self.category} ({self.date})"


class HarvestBatch(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, related_name='harvest_batches', null=True, blank=True)
    batchNumber = models.CharField(max_length=100)
    harvestDate = models.CharField(max_length=30)
    crop = models.CharField(max_length=30, default='Grapes')
    fieldId = models.CharField(max_length=64)
    fieldName = models.CharField(max_length=120)
    quantityKg = models.FloatField(default=0)
    grade = models.CharField(max_length=50)
    sugarBrix = models.FloatField(null=True, blank=True)
    rejectedKg = models.FloatField(default=0)
    buyerName = models.CharField(max_length=120)
    sellingPricePerKg = models.FloatField(default=0)
    totalRevenue = models.FloatField(default=0)
    transportCost = models.FloatField(default=0)
    netRealizationPerKg = models.FloatField(default=0)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.batchNumber} - {self.quantityKg}kg"


class Buyer(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=150)
    companyName = models.CharField(max_length=150)
    companyType = models.CharField(max_length=100)
    district = models.CharField(max_length=64)
    location = models.CharField(max_length=200)
    distanceKm = models.FloatField(default=0)
    preferredCrop = models.CharField(max_length=30, default='Grapes')
    varieties = models.JSONField(default=list)
    offerPricePerKg = models.FloatField(default=0)
    minQuantityKg = models.FloatField(default=0)
    maxQuantityKg = models.FloatField(default=0)
    pickupAvailable = models.BooleanField(default=True)
    paymentTerms = models.CharField(max_length=200)
    verificationStatus = models.CharField(max_length=50, default='Demo Verified')
    rating = models.FloatField(default=4.5)
    completedDealsCount = models.IntegerField(default=0)
    phone = models.CharField(max_length=50)
    contactPerson = models.CharField(max_length=120)
    notes = models.TextField(blank=True)
    historySummary = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} (₹{self.offerPricePerKg}/kg)"


class MarketPricePoint(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    date = models.CharField(max_length=30)
    crop = models.CharField(max_length=30, default='Grapes')
    variety = models.CharField(max_length=100)
    district = models.CharField(max_length=64)
    marketName = models.CharField(max_length=120)
    minPrice = models.FloatField(default=0)
    maxPrice = models.FloatField(default=0)
    modalPrice = models.FloatField(default=0)
    previousPrice = models.FloatField(default=0)
    arrivalTonnes = models.FloatField(default=0)
    dailyChangePercent = models.FloatField(default=0)
    trend = models.CharField(max_length=20, default='stable')

    def __str__(self):
        return f"{self.marketName} - {self.crop} (₹{self.modalPrice}/kg)"


class InputShop(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    shopName = models.CharField(max_length=150)
    ownerName = models.CharField(max_length=120)
    district = models.CharField(max_length=64)
    location = models.CharField(max_length=200)
    distanceKm = models.FloatField(default=0)
    phone = models.CharField(max_length=50)
    isVerified = models.BooleanField(default=True)
    licenseNumber = models.CharField(max_length=100)
    rating = models.FloatField(default=4.5)

    def __str__(self):
        return self.shopName


class InputProduct(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    shop = models.ForeignKey(InputShop, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=150)
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    packSize = models.CharField(max_length=50)
    price = models.FloatField(default=0)
    discountedPrice = models.FloatField(null=True, blank=True)
    inStock = models.BooleanField(default=True)
    targetCrop = models.CharField(max_length=50, default='All')
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - ₹{self.price}"


class FarmerNotification(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    type = models.CharField(max_length=50, default='market')
    title = models.CharField(max_length=200)
    titleMr = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    messageMr = models.TextField(blank=True, null=True)
    timestamp = models.CharField(max_length=50)
    read = models.BooleanField(default=False)
    priority = models.CharField(max_length=20, default='medium')
    actionableRoute = models.CharField(max_length=200, blank=True, null=True)
    actionText = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"[{self.type}] {self.title}"


class EquipmentItem(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    nameMr = models.CharField(max_length=200)
    nameHi = models.CharField(max_length=200)
    nameEn = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    categoryLabelMr = models.CharField(max_length=100)
    categoryLabelHi = models.CharField(max_length=100)
    categoryLabelEn = models.CharField(max_length=100)
    price = models.FloatField(default=0)
    originalPrice = models.FloatField(default=0)
    subsidyEligible = models.BooleanField(default=False)
    subsidyPercent = models.FloatField(default=0)
    subsidyAmount = models.FloatField(default=0)
    rating = models.FloatField(default=4.5)
    reviews = models.IntegerField(default=0)
    imageUrl = models.TextField(blank=True)
    warranty = models.CharField(max_length=100, blank=True)
    deliveryDays = models.CharField(max_length=100, blank=True)
    specs = models.JSONField(default=dict)
    features = models.JSONField(default=dict)

    def __str__(self):
        return self.nameEn
