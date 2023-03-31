from rest_framework.response import Response
from rest_framework.exceptions import ParseError, ValidationError
from rest_framework.renderers import JSONRenderer
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view, renderer_classes, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
# from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib.auth import login, authenticate
from argon2 import PasswordHasher
from ..users.serializers import UserSerializer
from event_mgmt.models import User

def is_authenticated():
    pass

def is_authorized(userId, resource):
    pass

#UserSerializer().create({"name": "John Doe", "email": "j.doe@gmail.com", "password": "rowing2023"})
print("222222222222222222222222222222")

@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
def get_csrf_token(request):
    token = get_token(request)
    print(str(authenticate(request)))
    print("===== Requesting new CSRF session cookie: " + token)
    return Response({}) # Response(headers={'Set-Cookie': 'X-CSRFToken={}; HttpOnly'.format(token) })

@api_view(['GET'])
@renderer_classes([JSONRenderer])
@permission_classes([])
def get_session(request):
    print(str(request.GET))
    # for sth in request.session:
    #     print(sth)
    if not request.session.session_key:
        session_key = request.session.create()
        print("==== session_key: " + session_key)
        request.session['authenticated'] = False
        return Response(session_key)

@api_view(['POST'])
@renderer_classes([JSONRenderer])
# @authentication_classes([SessionAuthentication])
@permission_classes([])
@ensure_csrf_cookie
def login_view(request):
    data = request.data
    if len(data['email']) < 3 or len(data['password']) < 1:
        return ParseError('User credentials malformed')
    email = data['email']
    ph = PasswordHasher()
    hash = ph.hash(data['password'])
    user = authenticate(username=email, password=hash)
    if user is not None:
        login(request, user)
        print("---- " + User.objects(email=email, password=hash).id)
        request.session['user_id'] = User.objects(email=email, password=hash).id
        return Response('Session set: {}, for user {}'.format(request.session.session_key, request.session.get('user_id', 'error')))
    raise ValidationError('Wrong email or password')
