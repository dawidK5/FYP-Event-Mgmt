from rest_framework.response import Response
from rest_framework.exceptions import ParseError, ValidationError
from rest_framework.renderers import JSONRenderer
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view, renderer_classes, permission_classes

from django.contrib.auth import login, authenticate
from argon2 import PasswordHasher

from event_mgmt.models import User




@api_view(['GET'])
@permission_classes([])
@renderer_classes([JSONRenderer])
def get_csrf_token(request):
    token = get_token(request)
    print(str(authenticate(request)))
    print("===== Requesting new CSRF session cookie: " + token)
    return Response(headers={'Set-Cookie': 'X-CSRFToken={}; HttpOnly'.format(token) })

@api_view(['GET'])
@renderer_classes([JSONRenderer])
@permission_classes([])
def get_session(request):
    print(str(request.GET))
    if not request.session.session_key:
        session_key = request.session.create()
        print("==== session_key: " + session_key)
        request.session['authenticated'] = False
        return Response(session_key)

@api_view(['POST'])
@renderer_classes([JSONRenderer])
@permission_classes([])
@ensure_csrf_cookie
def login_view(request):
    data = request.data
    if len(data['email']) < 3 or len(data['password']) < 1:
        return ParseError('User credentials malformed')
    email = data['email']
    ph = PasswordHasher()
    hash = ph.hash(data['password'])
    user = User.objects.get(email=email, password=hash)
    if user is not None:
        login(request, user)
        print("---- " + User.objects(email=email, password=hash).id)
        request.session['user_id'] = User.objects(email=email, password=hash).id
        return Response('Session set: {}, for user {}'.format(request.session.session_key, request.session.get('user_id', 'error')))
    raise ValidationError('Wrong email or password')



















def is_authenticated():
    pass

def is_authorized(userId, resource):
    pass