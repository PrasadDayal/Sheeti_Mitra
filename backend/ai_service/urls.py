from django.urls import path
from . import views

urlpatterns = [
    path('chat/', views.ai_chat, name='ai_chat'),
    path('diagnose/', views.diagnose_crop, name='diagnose_crop'),
    path('negotiate/', views.negotiate_copilot, name='negotiate_copilot'),
]
