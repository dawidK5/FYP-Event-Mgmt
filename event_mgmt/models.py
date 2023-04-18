from bson.objectid import ObjectId
from os import environ
from enum import Enum

from django_mongoengine import document as dmdocument, fields as dmfields
import django_mongoengine.mongo_auth.models as dmmodels
from mongoengine import connect, get_connection


connect(host="mongodb://"+ getattr(environ, 'MONGO_USERNAME', 'z12Admin') + ":" + getattr(environ, 'MONGO_PASSWORD', 'rowing2023') + "@"+ getattr(environ, 'MONGO_HOST', 'localhost')+':'+getattr(environ, 'MONGO_PORT', '27017')+"/?authMechanism=DEFAULT", db="eventmgmt")

class MinimalUser(dmmodels.AbstractUser, dmdocument.Document):
    class Meta:
        app_label = "event_mgmt"
        abstract = True
    #     allow_inheritance = True
    
    meta = {
        'allow_inheritance': True,
    }
    _meta = {'pk' : { 'to_python': lambda ob: int.from_bytes(ObjectId.binary(ob)) }}
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["usename", "password"]
    username = dmfields.StringField(blank=True)
    email = dmfields.StringField(unique=True, blank=False)
    password = dmfields.StringField(blank=False)

MinimalUser._meta.pk.to_python = ObjectId

# MinimalUser._meta.pk.to_python = lambda ob: int.from_bytes(ObjectId.binary(ob))

class EventsUser(MinimalUser):
    class Meta:
        app_label = "event_mgmt"
        abstract = False
        proxy = True
    
    # USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = ["username", "password"]
    # username = dmfields.StringField(blank=True)
    USERNAME_FIELD = "email"
    name = dmfields.StringField(blank=False)
    # email = dmfields.StringField(unique=True, blank=False)
    phone = dmfields.StringField(blank=False)
    dob = dmfields.DateField(blank=False)
    club = dmfields.StringField(blank=True)
    bank_details = dmfields.ListField(dmfields.DictField(blank=True), blank=True)

# EventsUser._meta.pk.to_python = bson.ObjectId

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

class EventDetails(dmdocument.Document):
    title = dmfields.StringField(blank=False, max_length=200, unique=True)
    description = dmfields.StringField(blank=False)
    host_id = dmfields.StringField(blank=False)
    series_type = dmfields.StringField(choices=[opt.value for opt in SeriesType], blank=False)
    event_category = dmfields.StringField(choices=[opt.value for opt in EventCategory], blank=False)
    location = dmfields.StringField(blank=False)
    country = dmfields.StringField(blank=False)
    reg_start = dmfields.DateTimeField(blank=False)
    reg_end = dmfields.DateTimeField(blank=False)
    event_start = dmfields.DateTimeField(blank=False)
    event_end = dmfields.DateTimeField(blank=False)
    fees = dmfields.DictField(blank=False)
    allowed_participants = dmfields.DictField(blank=False) 

class EventCards(dmdocument.Document):
    event_title = dmfields.StringField(blank=False)
    event_dates = dmfields.StringField(blank=False)
    venue_name = dmfields.StringField(blank=False)
    country = dmfields.StringField(blank=False)
    cover_path = dmfields.StringField(blank=False)

class Clubs(dmdocument.Document):
    name = dmfields.StringField(max_length=200, blank=False)
    manager = dmfields.ObjectIdField()
    coaches = dmfields.ListField(dmfields.ObjectIdField())
    atheletes = dmfields.ListField(dmfields.ObjectIdField())
    
class ValidCategories(dmdocument.Document):
    table_name = dmfields.StringField(blank=False)
    gender = dmfields.EnumField(Genders, blank=False)
    distance = dmfields.EnumField(Distances, blank=False)
    age_categories = dmfields.ListField(dmfields.EnumField(Ages), blank=False)
    boat_classes = dmfields.ListField(dmfields.EnumField(BoatClasses), blank=False)
    weight_categories = dmfields.ListField(dmfields.EnumField(Weights), blank=False)


