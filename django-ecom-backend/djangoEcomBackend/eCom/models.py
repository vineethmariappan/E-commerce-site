from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings


def upload_path(instance, filename):
    return '/'.join(['covers',str(instance.prod_name), filename])

class MyAccountManager(BaseUserManager):
    def create_user(self,email,username,password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username: 
            raise ValueError("Users must have an username")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            is_customer=is_customer,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email,username,password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username
        )
        user.is_admin=True
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    email=models.EmailField(verbose_name="email",max_length=60,unique=True)
    username= models.CharField(max_length=30,unique=True)
    date_joined= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_customer=models.BooleanField(default=False)
    is_supplier=models.BooleanField(default=False)

    cust_id=models.ForeignKey('Customer_detail',null=True, on_delete=models.CASCADE,blank=True)
    sup_id=models.ForeignKey('Supplier',null=True, on_delete=models.CASCADE,blank=True)
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']

    objects=MyAccountManager()
    
    def __str__(self):
        return self.email 
    
    def has_perm(self,perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self,app_label):
        return True

    

class Customer_detail(models.Model):
    cust_id=models.AutoField(primary_key=True)
    address=models.CharField(max_length=256)
    vinecoins=models.IntegerField()
    # def __str__(self): return self.cust_id

class Product_detail(models.Model):
    product_id=models.AutoField(primary_key=True)
    prod_name=models.CharField(max_length=256)
    # sup_id=models.ForeignKey('Supplier',null=True, on_delete=models.CASCADE,blank=True)
    sup_id=models.ForeignKey(settings.AUTH_USER_MODEL,null=True, on_delete=models.CASCADE,blank=True) #supplier user account, user we could say
    availability=models.IntegerField()
    category=models.ForeignKey('Category',null=True,on_delete=models.CASCADE,blank=True)
    price=models.IntegerField()
    rating=models.IntegerField()
    cover=models.ImageField(blank=True,null=True,upload_to=upload_path)
    def __str__(self): return self.prod_name

class Supplier(models.Model):
    sup_id=models.AutoField(primary_key=True)
    sup_address=models.CharField(max_length=256,default="no value")
    # def __str__(self): return self.sup_name

class Order_list(models.Model):
    product_id=models.ForeignKey('Product_detail', on_delete=models.CASCADE)
    # cust_id=models.ForeignKey('Customer_detail',on_delete=models.CASCADE)
    cust_id=models.ForeignKey(settings.AUTH_USER_MODEL,null=True, on_delete=models.CASCADE,blank=True)
    quantity=models.IntegerField()
    def __str__(self): return self.product_id + self.cust_id

class Payment(models.Model):
    total_pricing=models.IntegerField()
    no_of_product=models.IntegerField()
    # cust_id=models.ForeignKey('Customer_detail',on_delete=models.CASCADE)
    cust_id=models.ForeignKey(settings.AUTH_USER_MODEL,null=True, on_delete=models.CASCADE,blank=True)
    def __str__(self): return self.total_pricing

class Wish_List(models.Model):
    product_id=models.ForeignKey('Product_detail',on_delete=models.CASCADE)
    # cust_id=models.ForeignKey('Customer_detail',on_delete=models.CASCADE)
    cust_id=models.ForeignKey(settings.AUTH_USER_MODEL,null=True, on_delete=models.CASCADE,blank=True)
    def __str__(self):   return self.product_id + self.cust_id

class Category(models.Model):
    catag_id=models.AutoField(primary_key=True)
    category_name=models.CharField(max_length=30)
    def __str__(self): return self.category_name