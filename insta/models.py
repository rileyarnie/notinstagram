from django.db import models
from django.contrib.auth import get_user_model
import datetime
from django.contrib.auth.models import User
import PIL
from PIL import Image

# Create your models here.


class Post(models.Model):
    image = models.ImageField(null=False)
    caption = models.TextField(null=False)
    posted_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    date_posted = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["date_posted"]


class Profile(models.Model):
    pic = models.ImageField(default="default.jpg", upload_to="profile_pics")
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}'s profile"

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)
        img = PIL.Image.open(self.pic.path)

        if img.height > 300 or img.width > 300:
            output_size = (152, 152)
            img.thumbnail(output_size)
            img.save(self.pic.path)


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments", null=True
    )
    content = models.TextField()
    posted_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    date_posted = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["date_posted"]


class Like(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True)
    track = models.ForeignKey(Post, related_name="likes", on_delete=models.CASCADE)

