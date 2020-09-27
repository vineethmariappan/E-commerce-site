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
from django.contrib.auth.hashers import make_password #by default django stores encryrted password, we encrypt the password that user provides as we explicity post new user account into db, if we dont encrypt then we'll have problem getting token auth since django by default decrypts the provided password when user tries to get token logging in
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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
            new_cust=Customer_detail.objects.get(address=request.data['address']) # users have same address face issues in creating account got to fix it.
            User.objects.create(is_customer=True,email=request.data['email'],password=make_password(request.data['user_password']),username=request.data['username'],cust_id=new_cust)
         elif request.data['is_supplier']:
            Supplier.objects.create(sup_address=request.data['sup_address'])
            new_sup=Supplier.objects.get(sup_address=request.data['sup_address'])
            User.objects.create(is_supplier=True,email=request.data['sup_email'],password=make_password(request.data['sup_password']),username=request.data['sup_name'],sup_id=new_sup)
         return HttpResponse(status=200)

# class Customer_detail_ViewSet(viewsets.ModelViewSet):
#     queryset=Customer_detail.objects.all()
#     serializer_class=Customer_detail_Serializer
#     def create(self, request):
#         try:
#             usrobj=Customer_detail.objects.get(email=request.data['email']) # check if email exists
#         except Customer_detail.DoesNotExist:
#             usrobj=None
#         if usrobj:
#              return HttpResponse({'message' : 'Customer user already exists'},status=406)
#         Customer_detail.objects.create(username=request.data['username'],user_password=request.data['user_password'],email=request.data['email'],address=request.data['address'],vinecoins=0)
#         return HttpResponse(status=200)
        # return HttpResponse({'message' : "User Created"},status=200)

class Product_detail_ViewSet(viewsets.ModelViewSet):
    queryset=Product_detail.objects.all()
    serializer_class=Product_detail_Serializer
    filter_backends= [SearchFilter, OrderingFilter]
    search_fields=['prod_name','category__category_name']
    # authentication_classes = (TokenAuthentication,) # view products only if user is registered
    # permission_classes = (IsAuthenticated, )
    def create(self, request):
        cover=request.data['cover']
        print(cover)
        prod_name=request.data['prod_name']   
        availability=int(request.data['availability'])
        category=request.data['category']
        price=int(request.data['price'])
        rating=int(request.data['rating'])
        supplier_id=request.data['sup_id']
        product_description=request.data['product_description']
        User=get_user_model()
        sup_obj = User.objects.get(sup_id=supplier_id)
        catag_obj = Category.objects.get(category_name = category)
        Product_detail.objects.create(prod_name=prod_name,cover=cover,availability=availability,price=price,rating=1,category=catag_obj,sup_id=sup_obj,product_description=product_description)
        return HttpResponse({'message' : 'Product Created'},status=200)

    # def retrieve(self,request, pk=None): # used for both put(updates one obj based on pk) and get (gets one obj based on pk)
	# 	queryset = Product_detail.objects.all()
	# 	product = get_object_or_404(queryset,pk=pk)	

    
    def update(self, request, pk=None):
		# queryset = Product_detail.objects.all()
		# product=self.get_object_or_404(queryset,pk=pk)
        prod_name=request.data['prod_name']   
        hasImage=True;
        try:
            if request.data['cover']:
                cover=request.data['cover']
        except:
            hasImage=False;
        # print(cover)
        availability=int(request.data['availability'])
        category=request.data['category']
        price=int(request.data['price'])
        product_description=request.data['product_description']
        # rating=int(request.data['rating'])
        supplier_id=request.data['sup_id']
        User=get_user_model()
        sup_obj = User.objects.get(sup_id=supplier_id)
        catag_obj = Category.objects.get(category_name = category)
        if hasImage:
            Product_detail.objects.create(prod_name=prod_name+"_img_update",cover=cover,availability=availability,price=price,rating=1,category=catag_obj,sup_id=sup_obj,product_description=product_description)
            product_temp=Product_detail.objects.get(prod_name=prod_name+"_img_update",sup_id=sup_obj)
            Product_detail.objects.filter(pk=pk).update(prod_name=prod_name,cover=product_temp.cover,availability=availability,price=price,category=catag_obj,sup_id=sup_obj,product_description=product_description)
            Product_detail.objects.filter(prod_name=prod_name+"_img_update",sup_id=sup_obj).delete()
        else:
            Product_detail.objects.filter(pk=pk).update(prod_name=prod_name,availability=availability,price=price,category=catag_obj,sup_id=sup_obj,product_description=product_description)
		
        return HttpResponse({'message' : 'Product Created'},status=200)

class Supplier_ViewSet(viewsets.ModelViewSet):
    queryset=Supplier.objects.all()
    serializer_class=Supplier_Serializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated, )
    def create(self, request):
        Product_detail.objects.create(sup_name="vineeth",sup_email="email",sup_address="asd",sup_password="passswa")
        return HttpResponse({'message' : 'Supplier Registered'},status=200)

class Order_list_ViewSet(viewsets.ModelViewSet):
    queryset=Order_list.objects.all()
    serializer_class=Order_list_Serializer
    def create(self, request):
            User=get_user_model()
            print(request.data['product_id'])
            print(request.data['email'])
            cust_id = User.objects.get(email=request.data['email'])
            product_id=Product_detail.objects.get(pk=request.data['product_id'])
            Order_list.objects.create(product_id=product_id,cust_id=cust_id,quantity="1")
            return HttpResponse({'message' : 'Order Placed'},status=200)

class Category_ViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=Category_Serializer
class Payment_ViewSet(viewsets.ModelViewSet):
    queryset=Payment.objects.all()
    serializer_class=Payment_Serializer


class Wish_List_ViewSet(viewsets.ModelViewSet):
    queryset=Wish_List.objects.all()
    serializer_class=Wish_List_Serializer

@api_view(['GET','POST'])
def find_user(request,email): #returns the id of the given email
        User=get_user_model()
        try:
            user=User.objects.get(email=email)
        except:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer=Users_Serializer(user)
        return Response(serializer.data)

@api_view(['GET','POST'])
def supplier_products(request,email): #returns products of the supplier
        User=get_user_model()
        try:
            supplier=User.objects.get(email=email);
            print(supplier)
            products=Product_detail.objects.all();
            products=products.filter(sup_id=supplier)
        except:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer=Product_detail_Serializer(products, many=True)
        return Response(serializer.data)
@api_view(['GET','POST'])
def orders_placed(request,email): # returns the orders placed for the supplier
    User=get_user_model()
    try:
            supplier=User.objects.get(email=email);
            order_list=Order_list.objects.all();
            order_list=order_list.filter(product_id__sup_id=supplier)
    except:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    serializer=Order_list_Serializer(order_list, many=True)
    return Response(serializer.data)


