from django.urls import path
from .views import *

urlpatterns = [
    path('register/',register_view,name='register'),
    path('token/',MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh_access_token/',refresh_access_token,name='token_refresh'),
    path('logout/',logout,name='logout'),
    path('protected/',permitted_view,name='protected')
]