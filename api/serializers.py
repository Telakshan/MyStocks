from rest_framework import serializers
from .models import ChartArray

class ChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChartArray
        fields = ('date','compound')