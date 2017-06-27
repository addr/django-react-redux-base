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

from comments.models import Comment
from comments.serializers import CommentSerializer

from feedback.models import Feedback
from accounts.models import User

from lib.utils import AtomicMixin

from io import TextIOWrapper

from twilio.rest import Client

import json

import csv

# In forms.py...
from django import forms

account_sid = "AC326998e2f134ab17a5f17dbc38154b10"
auth_token = "9b17270514b2f825f6c4e33186b43c57"
        
class CommentCreate(GenericAPIView):

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """User registration view."""
        serializer = CommentSerializer(data=request.data)
        # print(request.user.email)
        user = User.objects.get(email=request.user.email)
        if serializer.is_valid():
            feed = Feedback.objects.get(feedback_id=serializer.data['feedback_id'])
            if user.is_superuser():
                for f in feed:
                    f.feedback_status = 'Awaiting student'
            else:
                for f in feed:
                    f.feedback_status = 'Awaiting advisor'

            comment = Comment(feedback_id=serializer.data['feedback_id'], comment=serializer.data['comment'], author_name=user.first_name + ' ' + user.last_name)
            comment.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentLookup(GenericAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get(self, request, feedback_id=1):
        # print('feedback id' + feedback_id)
        comments = Comment.objects.filter(feedback_id=feedback_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CommentReply(GenericAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def post(self, request):

        def send_message(cell_number, body):
            client = Client(account_sid, auth_token)

            message = client.api.account.messages.create(to=cell_number,
                                                        from_="+16787265181",
                                                        body='Feedback ID Number :' + body + '\nhttp://ec2-54-85-202-169.compute-1.amazonaws.com/feedback/3/comments')

        print('Body' + request.data['Body'])
        print ('From ' + request.data['From'])

        from_ = request.data['From']
        body = request.data['Body']
        split_bod = body.split('\n')
        feedback_id = split_bod[0].trim()
        comment = split_bod[1]

        feed = Feedback.objects.filter(feedback_id=feedback_id)
        if len(feed) == 0:
            print('no existe')
        originator = feed[0].appointment_originator

        print (originator)

        print(feedback_id)

        if from_ == feed[0].student_cell_number:
            print('student')
            for f in feed:
                f.feedback_status = 'Awaiting Advisor'
            author_name = feed[0].student_name
            send_message(feed[0].advisor_cell_number, body)
        else:
            author_name = feed[0].appointment_originator
            for f in feed:
                f.feedback_status = 'Awaiting Student'
            send_message(feed[0].student_cell_number, body)
            print('advisor')

        comment = Comment(feedback_id=feedback_id, comment=comment, author_name=author_name)
        comment.save()

        return Response(status=status.HTTP_200_OK)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class CommentList(GenericAPIView):

        # if len(request.FILES) > 0:
        #     print('create_file')

        #     f = TextIOWrapper(request.FILES['file'].file, encoding='ascii', errors='replace')
        #     reader = csv.DictReader(f)

        #     self.create_from_file(reader)
        #     return HttpResponse(status=status.HTTP_201_CREATED)
        # else:
        #     print(request.data)
        #     if isinstance(request.data, dict):
        #         print('querydict')
        #         serializer = RelationshipSerializer(data=request.data)
        #         invalid = False
        #         if serializer.is_valid():
        #             student = Student.objects.filter(ugaid=request.data['student_ugaid'])
        #             if len(student) == 0:
        #                 print('Student does not exist')
        #                 invalid = True
                    
        #             advisor = User.objects.filter(myid=request.data['advisor_myid'])
        #             if len(advisor) == 0:
        #                 print('Advisor does not exist')
        #                 invalid = True
                
                
        #             obj = Relationship.objects.filter(student_ugaid=request.data['student_ugaid'], advisor_myid=request.data['advisor_myid'])
        #             if not invalid:
        #                 if len(obj) == 0:
        #                     serializer.save()
        #                     return Response(serializer.data, status=status.HTTP_201_CREATED)
        #                 else:
        #                     for o in obj:
        #                         o.active = True
        #                         o.save()
        #     else:
        #         serializer = RelationshipSerializer(data=request.data, many=True)
        #         invalid = False
        #         if serializer.is_valid():
        #             data = request.data[:]
        #             for d in data:
        #                 student = Student.objects.filter(ugaid=d['student_ugaid'])
        #                 if len(student) == 0:
        #                     print('Student does not exist')
        #                     invalid = True
                            
        #                 advisor = Users.objects.filter(myid=d['advisor_myid'])
        #                 if len(advisor) == 0:
        #                     print('Advisor does not exist')
        #                     invalid = True
                    
        #                 obj = Relationship.objects.filter(student_ugaid=d['student_ugaid'], advisor_myid=d['advisor_myid'])
        #                 if not invalid:
        #                     if len(obj) == 0:
        #                         rel = Relationship(student_ugaid=d['student_ugaid'], advisor_myid=d['advisor_myid'], relationship_type=d['relationship_type'], active=d['active'])
        #                         rel.save()
        #                         print('created?')
        #                     else:
        #                         for o in obj:
        #                             o.active = True
        #                             o.save()
        #             return Response(serializer.data, status=status.HTTP_201_CREATED)
        #     # if serializer.is_valid():
        #     #     serializer.save()
        #     #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)