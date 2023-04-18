from rest_framework.response import Response
from .serializers import *
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes, permission_classes, parser_classes
from event_mgmt.models import EventCards, SeriesType, ValidCategories
from rest_framework.parsers import JSONParser
import json

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([])
# @renderer_classes([JSONRenderer])
# @parser_classes([JSONParser])
def manage_events(request):
    if request.method == 'POST' :
        print("Creating new event")
        details_obj = request.data
        try:
            evd = EventDetailsSerializer().create(details_obj)
            ec = EventCardsSerializer().create_from_details(evd)
            return Response({"Success": "Event has been registered on the system"}, status=201)
        except Exception as exc:
            print(exc)
            return Response({"Error": "Event not registered: " + str(exc)}, status=400)
    if request.method == 'GET':
        
        cards = [card for card in EventCards.objects.as_pymongo()]
        # print(cards)
        for card in cards:
            card['_id'] = str(card['_id'])
            print(str(card) + ':')
        return Response(cards)
    return Response({'error': 'Wrong method: POST expected'})

@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
def list_event_series(request):
    return Response([item.value for item in SeriesType])

@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
def list_event_categories(request):
    return Response([item.value for item in EventCategory])

@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
@parser_classes([JSONParser])
def list_event_details(request, event_id):
    serializer = EventDetailsSerializer(EventDetails.objects.get(id=event_id), many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([])
def register_event(request):
    print(request['POST'])
    return Response(status=201)


@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
def list_table_headings(request):
    return Response(ValidCategories.objects, context={"request": request}, many=True)
   

@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
def is_event_title_unique(request):
    return Response(EventDetails.objects().get(title=request.data))
