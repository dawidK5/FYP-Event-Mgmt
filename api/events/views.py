from rest_framework.response import Response
from .serializers import *
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes, permission_classes, parser_classes
from event_mgmt.models import EventCards, SeriesType, ValidCategories
from rest_framework.parsers import JSONParser

@api_view(['GET', 'POST'])
@permission_classes([])
@renderer_classes([JSONRenderer])
@parser_classes([JSONParser])
def manage_events(request):
    if request.method == 'POST' :
        print("Creating new event")
        details_obj = request.data
        print(request.data)
        print(request.FILES)
        try:
            evd = EventDetailsSerializer().create(details_obj)
            ec = EventCardsSerializer().create(evd)
            return Response({"Success": "Event has been registered on the system"}, status=201)
        except Exception as exc:
            print(exc)
            return Response({"Error": "Event not registered: " + str(exc)}, status=400)


        # ed = EventDetailsSerializer(details_obj)
        # try:
        #     ed.is_valid(raise_exception=True)
        #     ed.save()
        #     return Response(ed)
        # except Exception as exc:
        #     return Response({'error': str(exc)}, status=400)

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
    # allTableHeadings = (ValidCategories.objects, context={'request': request}, many=True)
    # return Response(allTableHeadings)

# @api_view(['GET'])
# @permission_classes([])
# @renderer_classes([JSONRenderer])
# def list_(request):
#     return Response([item.value for item in EventCategory])

@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
def is_event_title_unique(request):
    return Response(EventDetails.objects().get(title=request.data))







# import json

# with open('.\\api\\events\\setup.json') as f:
#     all_headings = json.loads(f.read())
#     # print(all_headings)
#     for headings in all_headings:
#         # print(headings)
#         serializer = ValidCategoriesSerializer(data=headings)
#         try:
#             serializer.is_valid(raise_exception=True)
#         except Exception as exc:
#             # print(exc)
#             print()