from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Customer_detail,Product_detail,Supplier,Order_list,Payment,Wish_List,Category
from .serializers import Customer_detail_Serializer, Supplier_Serializer, Payment_Serializer, Product_detail_Serializer, Order_list_Serializer, Wish_List_Serializer, Category_Serializer, Users_Serializer
from rest_framework.filters import SearchFilter,OrderingFilter
from django.http import HttpResponse
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model # added custom user 
class UserViewSet(viewsets.ModelViewSet):
    User=get_user_model() 
    queryset=User.objects.all()
    serializer_class = Users_Serializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated, )
    def create(self, request):
         User=get_user_model()  # have to initialize whenever we want to use our custom user model
         if request.data['is_customer']:
            Customer_detail.objects.create(address=request.data['address'],vinecoins=0)
            new_cust=Customer_detail.objects.get(address=request.data['address'])
            User.objects.create(is_customer=True,email=request.data['email'],password=request.data['user_password'],username=request.data['username'],cust_id=new_cust)
         elif request.data['is_supplier']:
            Supplier.objects.create(sup_address=request.data['sup_address'])
            new_sup=Supplier.objects.get(sup_address=request.data['sup_address'])
            User.objects.create(is_supplier=True,email=request.data['sup_email'],password=request.data['sup_password'],username=request.data['sup_name'],sup_id=new_sup)
         return HttpResponse(status=200)

class Customer_detail_ViewSet(viewsets.ModelViewSet):
    queryset=Customer_detail.objects.all()
    serializer_class=Customer_detail_Serializer
    def create(self, request):
        try:
            usrobj=Customer_detail.objects.get(email=request.data['email']) # check if email exists
        except Customer_detail.DoesNotExist:
            usrobj=None
        if usrobj:
             return HttpResponse({'message' : 'Customer user already exists'},status=406)
        Customer_detail.objects.create(username=request.data['username'],user_password=request.data['user_password'],email=request.data['email'],address=request.data['address'],vinecoins=0)
        return HttpResponse(status=200)
        # return HttpResponse({'message' : "User Created"},status=200)

class Product_detail_ViewSet(viewsets.ModelViewSet):
    queryset=Product_detail.objects.all()
    serializer_class=Product_detail_Serializer
    filter_backends= [SearchFilter, OrderingFilter]
    search_fields=['prod_name','category__category_name']
    def create(self, request):
        cover=request.data['cover']
        prod_name=request.data['prod_name']   
        availability=int(request.data['availability'])
        category=request.data['category']
        price=int(request.data['price'])
        rating=int(request.data['rating'])
        supplier_id=int(request.data['sup_id'])
        print(prod_name)
        print(availability)
        print(price)
        User=get_user_model()
        sup_obj = User.objects.get(id=supplier_id)
        catag_obj = Category.objects.get(category_name = category)
        Product_detail.objects.create(prod_name=prod_name,cover=cover,availability=1,price=price,rating=1,category=catag_obj,sup_id=sup_obj)
        return HttpResponse({'message' : 'Product Created'},status=200)

class Supplier_ViewSet(viewsets.ModelViewSet):
    queryset=Supplier.objects.all()
    serializer_class=Supplier_Serializer
    def create(self, request):
        Product_detail.objects.create(sup_name="vineeth",sup_email="email",sup_address="asd",sup_password="passswa")
        return HttpResponse({'message' : 'Supplier Registered'},status=200)

class Order_list_ViewSet(viewsets.ModelViewSet):
    queryset=Order_list.objects.all()
    serializer_class=Order_list_Serializer


class Category_ViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=Category_Serializer
class Payment_ViewSet(viewsets.ModelViewSet):
    queryset=Payment.objects.all()
    serializer_class=Payment_Serializer


class Wish_List_ViewSet(viewsets.ModelViewSet):
    queryset=Wish_List.objects.all()
    serializer_class=Wish_List_Serializer


