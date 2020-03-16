from django.db import models
from django.contrib.auth import get_user_model
import datetime
# Create your models here.

class Post(models.Model):
    image=models.ImageField(null=False)
    caption=models.TextField(null=False)
    posted_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    date_posted=models.DateField(auto_now_add=True)
