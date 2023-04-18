# from django.contrib import admin

import django_mongoengine.mongo_admin as djm_admin
from event_mgmt.models import EventsUser
# # admin.register(EventDetails)
djm_admin.register(EventsUser)