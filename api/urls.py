from django.urls import path
from .views import Sentiment

urlpatterns = [
    path('sentiment/', Sentiment.as_view())
]
