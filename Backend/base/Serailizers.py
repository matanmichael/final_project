from .models import Category, Order, Order_detail, Product,Customer
from rest_framework.serializers import ModelSerializer
 
 
class ProductSerializer(ModelSerializer):
    class Meta:
        model =Product
        fields ='__all__'

class CategorySerializer(ModelSerializer):
    class Meta:
        model =Category
        fields ='__all__'

class OrderSerializer(ModelSerializer):
    class Meta:
        model =Order
        fields ='__all__'

class Order_detailSerializer(ModelSerializer):
    class Meta:
        model =Order_detail
        fields ='__all__'

class CustomerSerializer(ModelSerializer):
    class Meta:
        model =Customer
        fields ='__all__'

