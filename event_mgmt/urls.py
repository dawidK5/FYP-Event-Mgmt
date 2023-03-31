from django.urls import path
from . import views

urlpatterns = [
    path('/register', views.form_submitted, name='login_clicked'),
]