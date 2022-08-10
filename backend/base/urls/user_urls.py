from django.urls import URLPattern, path
from base.views import user_views as views 

urlpatterns = [

    path('register/',views.registerUser,name='register'),
    path('profile/', views.getUserProfile, name="User Profile"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getUsers, name='token_obtain_pair')
]
