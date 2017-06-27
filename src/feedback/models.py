import uuid
from datetime import timedelta
import datetime

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Feedback(models.Model):

    """
    Model that represents an user.

    To be active, the user must register and confirm his email.
    """
    feedback_id = models.AutoField(primary_key=True)
    student_identifier = models.CharField(default='810xxxxxx', max_length=20)
    student_name = models.CharField(default='John Smith', max_length=50)
    event = models.CharField(default='Appointment', max_length=50)
    reason = models.CharField(default='Advising', max_length=50)
    event_end = models.DateTimeField(default=timezone.now)
    event_start = models.DateTimeField(default=timezone.now)
    appointment_originator = models.CharField(default='810xxxxxx', max_length=20)
    student_cell_number = models.CharField(default='555-555-5555', max_length=15)
    feedback_prompt = models.CharField(default='How was your appointment?', max_length=100)
    
    student_rating = models.CharField(default='0', max_length=5)
    feedback_time_stamp = models.DateTimeField(default=timezone.now)
    feedback_status = models.CharField(default=False, max_length=20)

    advisor_cell_number = models.CharField(default='5555555555', max_length=15)

    #add initial comment
    initial_comment = models.CharField(default='Initial Comment', max_length=500)



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
