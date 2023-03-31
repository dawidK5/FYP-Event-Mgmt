from rest_framework.response import Response

from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes,permission_classes

@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
def list_clubs(request):
    print("===== API called: listing clubs")
    return Response([ {"id": 0, "name": "Unaffiliated"},
    {"id": 1, "name": "I do not see my club"}, {"id": 2, "name": "St Michaels"} ])
    