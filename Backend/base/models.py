from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    desc = models.TextField(max_length=25,null=False,default='SOME STRING')
    def __str__(self):
     	return self.desc


class Product(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    desc = models.TextField(null=True,unique=True)
    cat_id =models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False,to_field='_id')
    price = models.DecimalField(max_digits=4,decimal_places=0,default=0)
    quantity = models.IntegerField(null=True)    
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    created_time=models.DateTimeField(auto_now_add=True,null=True)
    def __str__(self):
     	return self.desc

class Order(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_time=models.DateTimeField(auto_now_add=True)
    total = models.IntegerField(null=True)
    def __str__(self):
     	return str(self._id)

class Order_detail(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    order_id =models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    prod_id =models.ForeignKey(Product,on_delete=models.SET_NULL,null=True,to_field='desc')
    amount= models.IntegerField(null=True)
    total = models.IntegerField(null=True)
    def __str__(self):
     	return str(self.total)

class Customer(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    customer_name = models.CharField(max_length=30,null=False)
    address = models.CharField(max_length=25,null=False)
    city = models.CharField(max_length=25,null=False)
    country = models.CharField(max_length=25,null=False)
    created_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.customer_name



    
