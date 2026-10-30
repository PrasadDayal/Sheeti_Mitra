from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FarmerProfileViewSet,
    FarmFieldViewSet,
    CropActivityViewSet,
    FarmExpenseViewSet,
    HarvestBatchViewSet,
    BuyerViewSet,
    MarketPricePointViewSet,
    InputShopViewSet,
    FarmerNotificationViewSet,
    EquipmentItemViewSet,
    auth_login,
    auth_login_password,
    auth_register,
    auth_forgot_password,
    farm_analytics,
    live_weather,
    sync_market_prices,
)

router = DefaultRouter()
router.register(r'farmers', FarmerProfileViewSet, basename='farmer')
router.register(r'fields', FarmFieldViewSet, basename='field')
router.register(r'activities', CropActivityViewSet, basename='activity')
router.register(r'expenses', FarmExpenseViewSet, basename='expense')
router.register(r'harvest', HarvestBatchViewSet, basename='harvest')
router.register(r'buyers', BuyerViewSet, basename='buyer')
router.register(r'market-prices', MarketPricePointViewSet, basename='market-price')
router.register(r'input-shops', InputShopViewSet, basename='input-shop')
router.register(r'notifications', FarmerNotificationViewSet, basename='notification')
router.register(r'equipment', EquipmentItemViewSet, basename='equipment')

urlpatterns = [
    path('auth/login/', auth_login, name='auth_login'),
    path('auth/login-password/', auth_login_password, name='auth_login_password'),
    path('auth/register/', auth_register, name='auth_register'),
    path('auth/forgot-password/', auth_forgot_password, name='auth_forgot_password'),
    path('analytics/', farm_analytics, name='farm_analytics'),
    path('weather/', live_weather, name='live_weather'),
    path('market-prices/sync_live/', sync_market_prices, name='sync_market_prices'),
    path('', include(router.urls)),
]
