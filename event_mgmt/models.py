from enum import Enum
from mongoengine import Document, EmbeddedDocument, fields
# from mongoengine.document import *
# from mongoengine.fields import *
# from rest_framework_mongoengine import fields
# from django.conf import settings
from mongoengine import connect, get_connection
# from mongomock import *
# from mongoengine.connection import get_db
from django_mongoengine.mongo_auth.models import MongoUserManager, BaseUser

connect(host="mongodb://z12Admin:rowing2023@localhost:27017/?authMechanism=DEFAULT", db="eventmgmt")
# db = get_db()
# connect('eventmgmt', host='mongodb://z12Admin:rowing2023@localhost:27017/?authMechanism=DEFAULT', mongo_client_class=MongoClient)
db = get_connection()
# from django.contrib.auth.models import User as DUser

class EventType(Enum):
    INDIVIDUAL = "Individual"
    GROUP = "Group"

class SeriesType(Enum):
    REGIONAL = "Regional"
    REGIONAL_SERIES = "Regional Series"
    NATIONAL = "National"
    NATIONAL_SERIES = "National Series"
    INTERNATIONAL = " International"

class EventCategory(Enum):
    ROWING = "Rowing"
    OFFSHORE = "Offshore"
    Z12_MALE = "Z12 Male Challenge"
    Z12_FEMALE = "Z12 Female Challenge"

class BoatClasses(Enum):
    SINGLE = "1X"
    DOUBLE = "2X"
    PAIR = "2-"
    QUAD = "4X"


class Location(EmbeddedDocument):
    country = fields.StringField(blank=False, max_length=160)
    region = fields.StringField(blank=False, max_length=160)
    venue_name = fields.StringField(blank=False, max_length=220)
    coordinates = fields.StringField(blank=False, max_length=100)

class Genders(Enum):
    MALE = "Men"
    FEMALE = "Women"

class Weights(Enum):
    LIGHTWEIGHT = "60kg"
    MEDIUM = "70kg"
    HEAVY = "80kg"
    OPEN = "Open"

class Distances(Enum):
    TWO_K = "2000m"
    SIX_K = "6000m"

class Ages(Enum):
    # JUNIOR
    J14 = "J14"
    J15 = "J15"
    J16 = "J16"
    
    # YOUTH 
    U19 = "U19"
    U21 = "U21"
    U23 = "U23"

    # MASTERS
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    E = "E"
    F = "F"
    G = "G"

class FeesField(EmbeddedDocument):
    amount = fields.IntField(default=0)
    currency = fields.StringField(maxLength=4, blank=False)

class EventDetails(Document):
    title = fields.StringField(blank=False, max_length=200, unique=True)
    description = fields.StringField(blank=False)
    host_id = fields.StringField(blank=False)
    series_type = fields.StringField(choices=[opt.value for opt in SeriesType], blank=False)
    event_category = fields.StringField(choices=[opt.value for opt in EventCategory], blank=False)
    location = fields.StringField(blank=False)
    country = fields.StringField(blank=False)
    reg_start = fields.DateTimeField(blank=False)
    reg_end = fields.DateTimeField(blank=False)
    event_start = fields.DateTimeField(blank=False)
    event_end = fields.DateTimeField(blank=False)
    fees = fields.DictField(blank=False)
    allowed_participants = fields.DictField(blank=False) 
    
    
class EventCards(Document):
    event_title = fields.StringField(blank=False)
    event_dates = fields.StringField(blank=False)
    venue_name = fields.StringField(blank=False)
    country = fields.StringField(blank=False)
    cover_path = fields.StringField(blank=False)


class Clubs(Document):
    name = fields.StringField(max_length=200, blank=False)
    manager = fields.ObjectIdField()
    coaches = fields.ListField(fields.ObjectIdField())
    atheletes = fields.ListField(fields.ObjectIdField())
    
class User(BaseUser, Document):
    objects = MongoUserManager()

    class Meta:
        app_label = "event_mgmt"
        abstract = False

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password"]
    name = fields.StringField(blank=False)
    email = fields.StringField(unique=True, blank=False)
    phone = fields.StringField(blank=False)
    password = fields.StringField(blank=False)
    active = fields.BooleanField(blank=True)
    image = fields.StringField(blank=True)
    dob = fields.DateField(blank=False)
    weight = fields.LongField(blank=True)
    arm_span = fields.FloatField(blank=True)
    club = fields.StringField(blank=True)
    category = fields.StringField(blank=True)
    location = fields.StringField(blank=True)
    bank_details = fields.ListField(fields.DictField(blank=True), blank=True)
    isAdmin = fields.BooleanField(blank=True)
    isMinor = fields.BooleanField(blank=True)

class ValidCategories(Document):
    table_name = fields.StringField(blank=False)
    gender = fields.EnumField(Genders, blank=False)
    distance = fields.EnumField(Distances, blank=False)
    age_categories = fields.ListField(fields.EnumField(Ages), blank=False)
    boat_classes = fields.ListField(fields.EnumField(BoatClasses), blank=False)
    weight_categories = fields.ListField(fields.EnumField(Weights), blank=False)


