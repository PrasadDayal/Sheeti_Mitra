from rest_framework import serializers
from .models import (
    FarmerProfile,
    FarmField,
    CropActivity,
    FarmExpense,
    HarvestBatch,
    Buyer,
    MarketPricePoint,
    InputProduct,
    InputShop,
    FarmerNotification,
    EquipmentItem,
)

class FarmerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmerProfile
        fields = '__all__'
        extra_kwargs = {
            'id': {'required': False},
            'password': {'write_only': True, 'required': False},
            'auth_token': {'write_only': True, 'required': False},
        }


class FarmFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmField
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class CropActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CropActivity
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class FarmExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmExpense
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class HarvestBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = HarvestBatch
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class MarketPricePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketPricePoint
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class InputProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputProduct
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class InputShopSerializer(serializers.ModelSerializer):
    products = InputProductSerializer(many=True, read_only=True)

    class Meta:
        model = InputShop
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class FarmerNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmerNotification
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}


class EquipmentItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentItem
        fields = '__all__'
        extra_kwargs = {'id': {'required': False}}
