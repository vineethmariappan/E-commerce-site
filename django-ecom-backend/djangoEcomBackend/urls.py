from rest_framework import routers
from django.contrib import admin
from django.urls import path
from django.urls import include
from djangoEcomBackend.eCom import views
from rest_framework.authtoken.views import ObtainAuthToken
router=routers.DefaultRouter()
# router.register(r'customer_detail',views.Customer_detail_ViewSet)
router.register(r'product_detail',views.Product_detail_ViewSet)
router.register(r'supplier',views.Supplier_ViewSet)
router.register(r'order_list',views.Order_list_ViewSet)
router.register(r'payment',views.Payment_ViewSet)
router.register(r'wish_list',views.Wish_List_ViewSet)
router.register(r'category',views.Category_ViewSet)
router.register(r'users',views.UserViewSet)
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('<int:pk>/', include(router.urls)), #for product update
    path(r'auth/',ObtainAuthToken.as_view()),
    path('find_user/<str:email>/',views.find_user),
    path('supplier_products/<str:email>/',views.supplier_products),
    path('orders_placed/<str:email>/',views.orders_placed)
]

urlpatterns+= static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

