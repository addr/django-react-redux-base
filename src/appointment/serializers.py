from rest_framework import serializers

from appointment.models import Appointment
from lib.utils import validate_email as email_is_valid


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('email', 'first_name', 'last_name',)


class AppointmentSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField()

    class Meta:
        model = Appointment
        fields = ('appointment_id', 'student_identifier', 'student_name', 'event', 'reason', 'event_end', 'event_start', 'appointment_originator', 'student_cell_number', 'feedback_prompt', 'advisor_cell_number')

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        # user = User.objects.create(**validated_data)
        appointment = Appointment.objects.create(**validated_data)

        appointment.save()

        return appointment

    def get_serializer(self, instance=None, data=None,
                    files=None, many=True, partial=False):
        return super(ViewName, self).get_serializer(instance, data, files,
                                                    many, partial)