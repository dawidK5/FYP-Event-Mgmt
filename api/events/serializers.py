from event_mgmt.models import *
from rest_framework_mongoengine import serializers

class EventDetailsSerializer(serializers.DocumentSerializer):
    class Meta:
        model = EventDetails
        fields = [key for key in EventDetails._fields]

    def create(self, validated_data):
        try:
            event_created = EventDetails(**validated_data)
            return event_created.save()
        except Exception as exc:
            raise exc

class EventCardsSerializer(serializers.DocumentSerializer):
    class Meta:
        model = EventCards
        fields = [key for key in EventCards._fields]

    def create(self, details_obj):
        try:
            dates = details_obj['event_start']
            print(type(dates))
            card_created = EventCards()
            card_created.save()
            return card_created
        except Exception as exc:
            raise exc

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



