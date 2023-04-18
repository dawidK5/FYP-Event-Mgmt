from event_mgmt.models import EventsUser
from rest_framework_mongoengine import serializers
from dateutil.relativedelta import relativedelta
from datetime import date

class UserSerializer(serializers.DocumentSerializer):
    class Meta:
        model = EventsUser
        fields = [key for key in EventsUser._fields]

    # def get_instance(self):
    #     print("Creating user in the database, using validated data")
    #     return EventsUser(**self.validated_data).save()
    def get_instance(self, **kwargs):
        print("Retrieving user")
        print(**kwargs)
        print(EventsUser.objects.get(**kwargs))

    def is_minor(self):
        if relativedelta(dt1=date.today(), dt2=self.validated_data.get('dob')).years < 18:
            return True
        return False