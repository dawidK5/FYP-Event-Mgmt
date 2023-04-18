from django.apps import AppConfig


class EventMgmtConfig(AppConfig):
    default_auto_field = 'event_mgmt.field.ObjectIdField'
    # default_auto_field = 'django.db.models.BigAutoField'
    name = 'event_mgmt'
    verbose_name = 'Event Management'
