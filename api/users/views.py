import bcrypt
from event_mgmt.models import *
from .serializers import UserSerializer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, permission_classes, renderer_classes, parser_classes


@api_view(['POST'])
@permission_classes([])
@parser_classes([JSONParser])
@renderer_classes([JSONRenderer])
def create(request):
    print("<<< " + str(request.data))
    unvalidated_data = request.data
    # hashed = bcrypt.hashpw(
    #         unvalidated_data['password'], bcrypt.gensalt())
    # print("--- Generated hash on the server: " + hashed)
    # unvalidated_data['password'] = hashed
    user = UserSerializer(data=unvalidated_data)
    try:

        if user.is_valid(raise_exception=True):
            print("Saving a valid user")
            user.save()
            if user.is_minor():
                return Response({'isMinor': True})
            else:
                return Response({'isMinor': False}, status=201)
        else:
            return Response(status=400)
    except Exception as ex:
        print("==== " + str(ex))
        return Response(data=str(ex), status=400)
