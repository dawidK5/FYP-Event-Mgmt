from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user
from django.contrib.auth.forms import UserCreationForm
# Create your views here.

def form_submitted(request):

    if request.method == 'POST':
        print("==== " + request.POST)
    else:
        print("Please sign in")
