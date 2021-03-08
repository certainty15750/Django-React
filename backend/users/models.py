from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=True)
    name = models.CharField(blank=True, max_length=255)
    password = models.CharField(max_length=150, default="pbkdf2_sha256$120000$CiDWyW9i73Mk$gcG7niiK+rrX6a4luUROCAnkvw0PQDCgAdP3RmJ23mI=")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email
