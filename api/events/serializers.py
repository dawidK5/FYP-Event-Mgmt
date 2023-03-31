from event_mgmt.models import *
from rest_framework_mongoengine import serializers

class EventDetailsSerializer(serializers.DocumentSerializer):
    class Meta:
        model = EventDetails
        fields = [key for key in EventDetails._fields]
    
    # def __init__(self, passedData):
    #     super().__init__(data=passedData)

    # def get_instance(self):
    #     print("Creating event in the database, using validated data")
    #     return EventDetailsSerializer(**self.validated_data).save()

    def create(self, validated_data):
        print("888888888 ")
        print(type(validated_data))
        try:
            eventCreated = EventDetails(**validated_data)
            eventCreated.save()
            return eventCreated
        except Exception as exc:
            raise exc

    # def validate(self, passedData):
    #     super().validate(passedData)





# class EventCardsSerializer(serializers.DocumentSerializer):
#     class Meta:
#         model = EventCards
#         fields = [key for key in EventCards._fields]

#     def create(self, validated_data):
#         return EventCards(**validated_data).save()

# class ValidCategoriesSerializer(serializers.DocumentSerializer):
#     class Meta:
#         model = ValidCategories
#         fields = [key for key in ValidCategories._fields]
    
#     def get_instance(self):
#         print("Creating valid category in the database, using validated data")
#         return ValidCategories(**self.validated_data).save()
    
#     def validate(self):
#         super.validate()
#         print("Validated categories now")
    # def create(self, validated_data):
    #     return EventDetails(**validated_data).save()
    # def validate(self):
    #     super.validate()
    #     print("")



