from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view, parser_classes
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
# from .forms import UploadFileForm

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

from appointment.models import Appointment
from appointment.serializers import AppointmentSerializer

from lib.utils import AtomicMixin

from io import TextIOWrapper

import json

from twilio.rest import Client

import csv

# In forms.py...
from django import forms

account_sid = "AC326998e2f134ab17a5f17dbc38154b10"
auth_token = "9b17270514b2f825f6c4e33186b43c57"
        
class AppointmentCreate(GenericAPIView):

    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def get(self, request):
        appointment = Appointment.objects.all()
        serializer = AppointmentSerializer(feedback, many=True)
        return Response(feedback, status=status.HTTP_200_OK)

    def post(self, request):

        serializer = AppointmentSerializer(request.data, many=True)
        if serializer.is_valid():

            # try:
                # send_message(serializer.data['student_cell_number'])
            # except TypeError:
                # print("Sent, but type error")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
