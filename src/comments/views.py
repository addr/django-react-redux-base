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

from lib.utils import AtomicMixin

from io import TextIOWrapper

import json

import csv

# In forms.py...
from django import forms
        
class CommentCreate(GenericAPIView):

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def post(self, request):
        """User registration view."""
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            comment = Comment(feedback_id=serializer.data['feedback_id'], comment=serializer.data['comment'], author_id=serializer.data['author_id'], author_name=serializer.data['author_name'])
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
        print(request.data)
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