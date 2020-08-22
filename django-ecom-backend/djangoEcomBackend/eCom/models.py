from django.db import models

# Create your models here.

def upload_path(instance, filename):
    return '/'.join(['covers',str(instance.prod_name), filename])


class Customer_detail(models.Model):
    cust_id=models.AutoField(primary_key=True)
    username=models.CharField(max_length=52)
    user_password=models.CharField(max_length=56,null=True)
    email=models.CharField(max_length=52)
    address=models.CharField(max_length=256)
    vinecoins=models.IntegerField()
    def __str__(self): return self.username

class Product_detail(models.Model):
    product_id=models.AutoField(primary_key=True)
    prod_name=models.CharField(max_length=256)
    sup_id=models.ForeignKey('Supplier',null=True, on_delete=models.CASCADE,blank=True)
    availability=models.IntegerField()
    category=models.ForeignKey('Category',null=True,on_delete=models.CASCADE,blank=True)
    price=models.IntegerField()
    rating=models.IntegerField()
    cover=models.ImageField(blank=True,null=True,upload_to=upload_path)
    def __str__(self): return self.prod_name

class Supplier(models.Model):
    sup_id=models.AutoField(primary_key=True)
    sup_name=models.CharField(max_length=56)
    sup_email=models.CharField(max_length=56,default="no value")
    sup_address=models.CharField(max_length=256,default="no value")
    sup_password=models.CharField(max_length=56,default="no value")
    def __str__(self): return self.sup_name

class Order_list(models.Model):
    product_id=models.ForeignKey('Product_detail', on_delete=models.CASCADE)
    cust_id=models.ForeignKey('Customer_detail',on_delete=models.CASCADE)
    quantity=models.IntegerField()
    def __str__(self): return self.product_id + self.cust_id

class Payment(models.Model):
    total_pricing=models.IntegerField()
    no_of_product=models.IntegerField()
    cust_id=models.ForeignKey('Customer_detail',on_delete=models.CASCADE)
    def __str__(self): return self.total_pricing

class Wish_List(models.Model):
    product_id=models.ForeignKey('Product_detail',on_delete=models.CASCADE)
    cust_id=models.ForeignKey('Customer_detail',on_delete=models.CASCADE)
    def __str__(self):   return self.product_id + self.cust_id

class Category(models.Model):
    catag_id=models.AutoField(primary_key=True)
    category_name=models.CharField(max_length=30)
    def __str__(self): return self.category_name