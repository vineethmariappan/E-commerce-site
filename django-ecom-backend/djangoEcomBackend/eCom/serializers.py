from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Customer_detail,Product_detail,Supplier,Order_list,Payment,Wish_List,Category
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class Category_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['catag_id','category_name']


class Supplier_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Supplier
        fields=['sup_id','sup_address']


class Customer_detail_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Customer_detail
        fields=['cust_id','address','vinecoins']
        # extra_kwargs={'user_password' : {'write_only' : True, 'required' : True}}

class Users_Serializer(serializers.ModelSerializer):
    cust_id=Customer_detail_Serializer()
    sup_id=Supplier_Serializer()
    class Meta:
        User=get_user_model()
        model=User
        fields=['username','password','is_customer','email','cust_id','sup_id','is_supplier']

class Product_detail_Serializer(serializers.ModelSerializer):
    category=Category_Serializer()
    sup_id=Users_Serializer()

    class Meta:
        model=Product_detail
        fields=['product_id','prod_name','sup_id','availability','category','price','rating','cover','product_description']
    

#   
class Order_list_Serializer(serializers.ModelSerializer):
    product_id=Product_detail_Serializer()
    cust_id=Users_Serializer()
    class Meta:
        model=Order_list
        fields=['product_id','cust_id','quantity']

class Payment_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Payment
        fields=['total_pricing','no_of_product','cust_id']

class Wish_List_Serializer(serializers.ModelSerializer):
    class Meta:
        fields=['product_id','cust_id']
