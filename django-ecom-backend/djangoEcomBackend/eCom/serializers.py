from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Customer_detail,Product_detail,Supplier,Order_list,Payment,Wish_List,Category
class Users_Serializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
class Category_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['catag_id','category_name']


class Supplier_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Supplier
        fields=['sup_id','sup_name','sup_password','sup_email','sup_address']


class Customer_detail_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Customer_detail
        fields=['cust_id','username','email','address','vinecoins','user_password']
        # extra_kwargs={'user_password' : {'write_only' : True, 'required' : True}}


class Product_detail_Serializer(serializers.ModelSerializer):
    category=Category_Serializer()
    sup_id=Supplier_Serializer()

    class Meta:
        model=Product_detail
        fields=['product_id','prod_name','sup_id','availability','category','price','rating','cover']
    

#   
class Order_list_Serializer(serializers.ModelSerializer):
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
