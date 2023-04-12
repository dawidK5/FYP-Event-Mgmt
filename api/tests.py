from rest_framework.test import force_authenticate, APIRequestFactory, APITestCase
from rest_framework_mongoengine import serializers

from django.urls import reverse
from rest_framework import status
from event_mgmt.models import EventDetails
from mongomock import MongoClient
from mongoengine import connect, disconnect, get_connection
import json

class EventsTest(APITestCase):
    def _fixture_teardown(self):
      pass

    @classmethod
    def setUpClass(cls):
      disconnect()
      connect('eventmgmt',
              host='mongodb://z12Admin:rowing2023@localhost:27017/?authMechanism=DEFAULT',
              mongo_client_class=MongoClient)
      db = get_connection()
      print(db)

    @classmethod
    def tearDownClass(cls):
       disconnect()
    
    def test_register_event(self):
        url = reverse('events')
        with open('.\\event_mgmt\\constants.json', 'r') as fi:
          data = json.load(fi)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(EventDetails.objects.count(), 1)
        self.assertEqual(EventDetails.objects.get().event_start.year, 2023)

    # factory = APIRequestFactory()
    # user = User.objects.get(username='olivia')
    # view = AccountDetail.as_view()

    # # Make an authenticated request to the view...
    # request = factory.get('/accounts/django-superstars/')
    # force_authenticate(request, user=user)
    # response = view(request)