from django.test import TestCase
from .models import EventDetails
import mongomock
from mongoengine import connect, disconnect, get_connection
import json

class TestEvent(TestCase):
   def _fixture_teardown(self):
      pass

   @classmethod
   def setUpClass(cls):
      disconnect()
      connect( 'eventmgmt',
               host='mongodb://z12Admin:rowing2023@localhost:27017/?authMechanism=DEFAULT',
               mongo_client_class=mongomock.MongoClient)
      db = get_connection()
      print(db)

   @classmethod
   def tearDownClass(cls):
       disconnect()

   def test_creation(self):
      with open('.\\event_mgmt\\constants.json', 'r') as fi:
         data = json.load(fi)
      ed = EventDetails(**data)
      ed.save()
      created = EventDetails.objects().first()
      assert created.title ==  'Munster Rowing Event 2k'
      assert created.reg_start.year == 2023 and created.reg_start.hour == 0 and created.reg_start.minute == 1
      assert created.allowed_participants['F']['2000m']['U23'][1] == '70kg'

