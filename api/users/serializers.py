from event_mgmt.models import User
from rest_framework_mongoengine import serializers
from dateutil.relativedelta import relativedelta
from datetime import date

class UserSerializer(serializers.DocumentSerializer):
    class Meta:
        model = User
        fields = [key for key in User._fields]

    def get_instance(self):
        print("Creating user in the database, using validated data")
        return User(**self.validated_data).save()
    
    # def validate(self, data):
    #     super().is_valid()
    #     if self.is_minor():
    #         print("Redirecting")

    def is_minor(self):
        # print(relativedelta(dt1=self.validated_data.get('dob'), dt2=date.today()))
        if relativedelta(dt1=date.today(), dt2=self.validated_data.get('dob')).years < 18:
            return True
        return False    
   
# UserSerializer().create(validated_data={"name": "John Doe", "email": "j.doe@gmail.com", "password": "rowing2023"})
