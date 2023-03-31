"""
Django settings for z12event project.

Generated by 'django-admin startproject' using Django 4.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

import os.path
from pathlib import Path

# from mongoengine.connection import connect

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-+@0mayurchc7pg2s&3ku+0@drvma2+vh$j!oax&#gqup%(8q=)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# ALLOWED_HOSTS = ['http://localhost',
#                  'http://localhost:3000',
#                  'http://localhost:8000',
#                  'http://127.0.0.1:8000'
#                  ]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'event_mgmt',
    'api',
    'corsheaders',
    'django_mongoengine',
    'django_mongoengine.mongo_auth',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'z12event.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'z12eventui/build'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'z12event.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.dummy',
#         # 'ENGINE': '',
#         # 'NAME': '',
#         # 'ENGINE': 'django.db.backends.sqlite3',
#         # 'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR,  'z12eventui/build/static'),
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTHENTICATION_BACKENDS = [
    'django_mongoengine.mongo_auth.backends.MongoEngineBackend',
]
# AUTH_USER_MODEL = 'mongo_auth.MongoUser'
# MONGOENGINE_USER_DOCUMENT = 'mongoengine.django.auth.User'
# SESSION_ENGINE = 'mongoengine.django.sessions'
# SESSION_SERIALIZER = 'mongoengine.django.sessions.BSONSerializer'

CORS_ALLOWED_ORIGINS = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]
# CORS_ORIGIN_WHITELIST = (
#     'http://localhost',
#     'http://localhost:3000',
#     'http://localhost:8000',
#     'http://127.0.0.1:8000'
# )

CORS_ALLOW_HEADERS = [
    'Set-Cookie',
    '*',
    'credentials'
]

CSRF_COOKIE_HTTPONLY = False
SESSION_COOKIE_HTTPONLY = True

CSRF_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_SAMESITE = 'Strict'


REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 5,
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.IsAuthenticated'],
    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.SessionAuthentication', 'rest_framework.authentication.BasicAuthentication'],
    'DEFAULT_PARSER_CLASSES': ['rest_framework.parsers.JSONParser']
}
DATABASES = MONGODB_DATABASES = {
    'default': {
        'name': 'event_mgmt',
        'host': 'localhost:27017',
        'password': 'rowing2023',
        'username': 'z12Admin',
        'tz_aware': True,  # if you using timezones in django (USE_TZ = True)
    },
}
# for auth
AUTH_USER_MODEL = 'mongo_auth.MongoUser'
# MONGOENGINE_USER_DOCUMENT = 'event_mgmt.User'

SESSION_ENGINE = 'django_mongoengine.sessions'
SESSION_SERIALIZER = 'django_mongoengine.sessions.BSONSerializer'

