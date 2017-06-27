from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import appointment.views

urlpatterns = [
    url(_(r'^/$'),
        appointment.views.AppointmentCreate.as_view(),
        name='appointment_create'),
    # url(_(r'^/update/$'),
        # feedback.views.FeedbackUpdate.as_view(),
        # name='feedback_update'),
    # url(_(r'^/create/$'),
    #     relationships.views.RelationshipCreateFile.as_view(),
    #     name='relationship_create_file'),
    # url(_(r'^/remove/$'),
    #     relationships.views.RelationshipRemoveFile.as_view(),
    #     name='relationship_remove_file'),
    # url(_(r'^/update/$'),
    #     relationships.views.RelationshipUpdateFile.as_view(),
    #     name='relationship_list'),
    # url(_(r'^/create_individual/$'),
    #     relationships.views.RelationshipCreateIndividual.as_view(),
    #     name='relationship_create_individual'),
    # url(_(r'^/remove_individual/$'),
    #     relationships.views.RelationshipRemoveIndividual.as_view(),
    #     name='relationship_remove_individual'),
    # url(_(r'^get/$'),
    #     relationships.views.CreateRelationship.as_view(),
    #     name='get_relationships')

]