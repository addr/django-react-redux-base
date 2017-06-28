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

        def send_message(student_cell_number, feedback_id):
            client = Client(account_sid, auth_token)

            body = {
            "\nHey thanks for attending your appointment. We would love to receive some feedback about your appointment. You can visit the link below." +
            "\n\n http://ec2-54-152-192-141.compute-1.amazonaws.com/feedback/" + feedback_id +"/feedback-prompt"
            }

            message = client.api.account.messages.create(to=student_cell_number,
                                                        from_="+16787265181",
                                                        body="Feedback ID Number : " + feedback_id + body)

        """User registration view."""
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            feedback = Feedback.objects.latest('feedback_id')
            print(feedback)
            # try:
            send_message(serializer.data['student_cell_number'], feedback.feedback_id)
            # except TypeError as e:
                # print("Sent, but type error")
                # print(e)


            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FeedbackUpdate(GenericAPIView):
    serializer_class = FeedbackUpdateSerializer
    queryset = Feedback.objects.all()

    def post(self, request):
        serializer = FeedbackUpdateSerializer(data=request.data)
        if serializer.is_valid():
            feedback = Feedback.objects.filter(feedback_id=serializer.data['search_feedback_id'])
            # print(feedback[0])
            # print(serializer.data['initial_comment'])
            # print(serializer.data['student_rating'])
            # feedback[0].initial_comment = serializer.data['initial_comment']
            # feedback[0].student_rating = serializer.data['student_rating']
            # feedback[0].save()
            for f in feedback:
                f.initial_comment = serializer.data['initial_comment']
                f.student_rating = serializer.data['student_rating']
                f.feedback_status = serializer.data['feedback_status']
                f.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


# class FeedbackList(GenericAPIView):
#     serializer_class = FeedbackSerializer
#     queryset = Feedback.objects.all()

#     def get(self):
#         feedback = Feedback.objects.all()
#         return Response(feedback,status=status.HTTP_200_OK)