from rest_framework import serializers

from feedback.models import Feedback
from lib.utils import validate_email as email_is_valid


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('email', 'first_name', 'last_name',)


class FeedbackSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField()

    class Meta:
        model = Feedback
        fields = ('feedback_id', 'student_identifier', 'student_name', 'event', 'reason', 'event_end', 'event_start', 'appointment_originator', 'student_cell_number', 'feedback_prompt', 'student_rating', 'feedback_status', 'initial_comment', 'advisor_cell_number')

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        # user = User.objects.create(**validated_data)
        feedback = Feedback.objects.create(**validated_data)

        feedback.save()

        return feedback

    def get_serializer(self, instance=None, data=None,
                    files=None, many=True, partial=False):
        return super(ViewName, self).get_serializer(instance, data, files,
                                                    many, partial)

class FeedbackListSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField()

    class Meta:
        model = Feedback
        fields = ('feedback_id', 'student_identifier', 'student_name', 'event', 'reason', 'event_end', 'event_start', 'appointment_originator', 'student_cell_number', 'feedback_prompt', 'student_rating', 'feedback_status', 'feedback_time_stamp', 'initial_comment', 'advisor_cell_number')

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        # user = User.objects.create(**validated_data)
        feedback = Feedback.objects.create(**validated_data)

        feedback.save()

        return feedback

    def get_serializer(self, instance=None, data=None,
                    files=None, many=True, partial=False):
        return super(ViewName, self).get_serializer(instance, data, files,
                                                    many, partial)

class FeedbackUpdateSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField()

    class Meta:
        model = Feedback
        fields = ('search_feedback_id', 'student_rating', 'initial_comment')

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        # user = User.objects.create(**validated_data)
        feedback = Feedback.objects.create(**validated_data)

        feedback.save()

        return feedback

    def get_serializer(self, instance=None, data=None,
                    files=None, many=True, partial=False):
        return super(ViewName, self).get_serializer(instance, data, files,
                                                    many, partial)