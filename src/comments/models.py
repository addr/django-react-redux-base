import uuid
from datetime import timedelta
import datetime

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Comment(models.Model):

    """
    Model that represents an user.

    To be active, the user must register and confirm his email.
    """
    feedback_id = models.CharField(default=uuid.uuid4, max_length=50)

    comment = models.CharField(default='Default Comment', max_length=500)

    author_id = models.CharField(default='810xxxxxx', max_length=20)

    author_name = models.CharField(default='John Smith', max_length=50)

    time_stamp = models.DateTimeField(default=timezone.now)

    # def create(**validated_data):
    #     comment = Comment(validated_data)

    #     comment.save()

    #     return HttpResponse(status=status.HTTP_201_CREATED)


    # GENDER_CHOICES = (
        # (GENDER_MALE, 'Male'),
        # (GENDER_FEMALE, 'Female')
    # )
    # id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    # student_ugaid = models.CharField(_('Student UGAID'), max_length=10)

    # advisor_myid = models.CharField(_('Advisor MyID'), max_length=20)

    # relationship_type = models.CharField(_('Relationship Type'), max_length=20)

    # # active = models.BooleanField(_('Active'), default=True)
    # active = models.BooleanField(_('Active'))

    # created_date = models.DateTimeField(_('Created Date'),default=timezone.now)

    # modified_date = models.DateTimeField(_('Modified Date'), default=timezone.now)

    # previous_advisor_myid = models.CharField(_('Previous Advisor MyID'), max_length=30, default='')
