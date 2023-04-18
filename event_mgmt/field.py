from mongoengine.fields import ObjectIdField

from functools import partial

ObjectIdField = partial(ObjectIdField, editable=False, auto_created=True, blank=True)
