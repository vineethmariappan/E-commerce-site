from django.contrib import admin
from .models import Customer_detail,Product_detail,Supplier,Order_list,Payment,Wish_List,Category
# Register your models here.
admin.site.register(Customer_detail)
admin.site.register(Product_detail)
admin.site.register(Supplier)
admin.site.register(Order_list)
admin.site.register(Payment)
admin.site.register(Wish_List)
admin.site.register(Category)
