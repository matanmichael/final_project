from django.contrib import admin
from .models import Category, Order, Order_detail, Product
 
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(Order_detail)


