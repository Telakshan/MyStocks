from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class ChartArray(models.Model):
    date = ArrayField(models.CharField(max_length=200))
    compound = ArrayField(models.CharField(max_length=200))
