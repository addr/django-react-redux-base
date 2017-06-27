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

from feedback.models import Feedback
from feedback.serializers import FeedbackSerializer, FeedbackListSerializer, FeedbackUpdateSerializer

from lib.utils import AtomicMixin

from io import TextIOWrapper

import json

from twilio.rest import Client

import csv

# In forms.py...
from django import forms

account_sid = "AC326998e2f134ab17a5f17dbc38154b10"
auth_token = "9b17270514b2f825f6c4e33186b43c57"
        
class FeedbackCreate(GenericAPIView):

    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()

    def get(self, request):
        feedback = Feedback.objects.all()
        serializer = FeedbackListSerializer(feedback, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):

        def send_message(student_cell_number):
            client = Client(account_sid, auth_token)

            message = client.api.account.messages.create(to="+1" + student_cell_number,
                                                        from_="+16787265181",
                                                        body="Hello")

        """User registration view."""
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            # feedback = Feedback(
            #     student_identifier = serializer.data['student_identifier'],
            #     student_name = serializer.data['student_name'],
            #     event = serializer.data['event'],
            #     reason = serializer.data['reason'],
            #     event_end = serializer.data['event_end'],
            #     event_start = serializer.data['event_start'],
            #     appointment_originator = serializer.data['appointment_originator'],
            #     student_cell_number = serializer.data['student_cell_number'],
            #     feedback_prompt = serializer.data['feedback_prompt'],
            #     student_rating = serializer.data['student_rating'],
            #     feedback_status = serializer.data['feedback_status'],
            #     initial_comment = serializer.data['initial_comment']
            #     )
            # feedback.save()
            serializer.save()

            # client = Client(account_sid, auth_token)

            # body = str("Hello welcome to the feedback messaging service.")

            # # str_response = body.decode('utf-8')
            # # obj = json.loads(body)

            # message = client.api.account.messages.create(to="+1" + serializer.data['student_cell_number'],
            #                                     from_="+16787265181",
            #                                     body=body)
            try:
                send_message(serializer.data['student_cell_number'])
            except TypeError:
                print("Sent, but type error")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FeedbackUpdate(GenericAPIView):
    serializer_class = FeedbackUpdateSerializer
    queryset = Feedback.objects.all()

    def post(self, request):
        serializer = FeedbackUpdateSerializer(data=request.data)
        if serializer.is_valid():
            feedback = Feedback.objects.filter(feedback_id=serializer.data['search_feedback_id'])
            feedback[0].initial_comment = serializer.data['initial_comment']
            feedback[0].student_rating = serializer.data['student_rating']
            feedback[0].save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


# class FeedbackList(GenericAPIView):
#     serializer_class = FeedbackSerializer
#     queryset = Feedback.objects.all()

#     def get(self):
#         feedback = Feedback.objects.all()
#         return Response(feedback,status=status.HTTP_200_OK)