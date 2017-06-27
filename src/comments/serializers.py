from rest_framework import serializers

from comments.models import Comment
from lib.utils import validate_email as email_is_valid


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('email', 'first_name', 'last_name',)


class CommentSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField()

    class Meta:
        model = Comment
        fields = ('feedback_id', 'comment', 'author_id', 'author_name', 'time_stamp')

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        # user = User.objects.create(**validated_data)
        comment = Comment.objects.create(**validated_data)

        comment.save()

        return comment

    def get_serializer(self, instance=None, data=None,
                    files=None, many=True, partial=False):
        return super(ViewName, self).get_serializer(instance, data, files,
                                                    many, partial)