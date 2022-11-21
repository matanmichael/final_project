from django.urls import path
from .viewsUsers import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from . import viewsProduct,viewsCategory,viewsOrder, viewsUsers

urlpatterns = [
    #login, register, logout
    path('register/', viewsUsers.register),
    path('logout/', viewsUsers.myLogout),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #product
    path('products/', viewsProduct.productAdmin),
    path('products/<id>', viewsProduct.productAdmin),
    path('getallproducts/', viewsProduct.getAllProducts),
    path('getproducts/<id>', viewsProduct.getProductsPerCategoty),
    
    #category
    path('categories/', viewsCategory.categoryAdmin),
    path('categories/<id>', viewsCategory.categoryAdmin),
    path('getcategories/', viewsCategory.getCategories),
    path('getcategories/<id>', viewsCategory.getCategories),
    
    #order
    path('addorder/', viewsOrder.addOrder),
    path('getordersforuser/', viewsOrder.getOrdersForUser),
    path('getorderdetails/<id>', viewsOrder.getOrderDetails),
    # Admin
    path('getorders/', viewsOrder.getOrders),
    path('getorderDetails/', viewsOrder.getOrderDetails),
    path('deleteorder/', viewsOrder.deleteOrder),
    path('deleteorder/<id>', viewsOrder.deleteOrder),
    path('updateorderDetail/<id>', viewsOrder.updateOrderDetail),
]

