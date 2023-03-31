from enum import Enum
# from mongoengine.document import *
# from mongoengine.fields import *
from django_mongoengine import Document, EmbeddedDocument, fields
from django.conf import settings
from mongoengine import connect
from mongoengine.connection import get_db
from django_mongoengine.mongo_auth.models import MongoUserManager, BaseUser

connect(host="mongodb://z12Admin:rowing2023@localhost:27017/?authMechanism=DEFAULT", db="eventmgmt")
db = get_db()

# from django.contrib.auth.models import User as DUser

class EventType(Enum):
    INDIVIDUAL = "Individual"
    GROUP = "Group"

class SeriesType(Enum):
    Regional = "Regional"
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
    # sweep
    # PAIR = "2-"
    # FOUR = "4-"

    # COXED_PAIR = "2+"
    # COXED_FOUR = "4+"
    # COXED_EIGHT = "8+"
    
    # scull
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
    MALE = "M"
    FEMALE = "F"

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

# class AgeCategories(Enum):
#     age_band = fields.EnumField(AgeBand, blank=False)

# class WeightCategories(EmbeddedDocument):
#     weight = fields.EnumField(Weight)
    # age_categories = fields.ListField(EmbeddedDocument())
    

# class GenderCategories(EmbeddedDocument):
#     gender = fields.EnumField(Gender, blank=False)
#     weight_categories = fields.ListField(fields.EmbeddedDocumentField(WeightCategories))

# class AllowedParticipants(EmbeddedDocument):
#     gender = fields.StringField(max_length=2)

class FeesField(EmbeddedDocument):
    amount = fields.IntField(default=0)
    currency = fields.StringField(maxLength=4, blank=False)

class EventDetails(Document):
    title = fields.StringField(blank=False, max_length=200, unique=True)
    description = fields.StringField(blank=False)
    host_id = fields.ObjectIdField(blank=False)
    # event_type = fields.StringField(choices=[[opt.value for opt in EventType]], blank=False, default=EventType.GROUP)
    series_type = fields.StringField(choices=[opt.value for opt in SeriesType], blank=False)
    event_category = fields.StringField(choices=[opt.value for opt in EventCategory], blank=False)
    location = fields.StringField(blank=False)
    country = fields.StringField(blank=False)
    # EmbeddedDocumentField(Location, blank=False)
    reg_start = fields.StringField(blank=False)
    reg_end = fields.StringField(blank=False)
    event_start = fields.StringField(blank=False)
    event_end = fields.StringField(blank=False)
    fees = fields.DictField(blank=False)
    # imagename = fields.FileField(upload_to=None, blank=True)
    # rowers_limit = fields.IntField(default=24, blank=False)
    # category = fields.EnumField(EventCategory, blank=False)
    # all_boat_classes = fields.ListField(fields.EnumField(BoatClass, blank=False))
    # all_distances = fields.ListField(fields.StringField(max_length=20))
    # gender_categories = fields.ListField(fields.EmbeddedDocumentField(GenderCategories, blank=False))
    # allowed_participants = fields.EmbeddedDocumentField(AllowedParticipants, blank=False)
    allowed_participants = fields.DictField(blank=False) 
    
    
class EventCards(Document):
    event_title = fields.StringField(blank=False)
    event_dates = fields.StringField(blank=False)
    venue_name = fields.StringField(blank=False)
    country = fields.StringField(blank=False)
    cover_path = fields.URLField(blank=False)


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

    # def set_password(self, password):
        # django bug workaround
        
        # make_password(password)

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


