from django.urls import path
from .events import views as eventViews
from .clubs import views as clubViews
from .users import views as userViews
from .auth import views as authViews

urlpatterns = [
    path('events', eventViews.manage_events, name='events'),
    path('events/series', eventViews.list_event_series, name='events-series'),
    path('events/categories', eventViews.list_event_categories, name='events-categories'),
    path('events/headings', eventViews.list_table_headings, name='events-headings'),
    path('events/<slug:event_id>', eventViews.list_event_details, name='events-id'),
    path('clubs', clubViews.list_clubs, name='clubs'),
    path('users', userViews.create, name='users'),
    path('users/<slug:users_id>', userViews.get_profile_details, name='users-details'),
    path('auth/getToken', authViews.get_csrf_token, name='auth-get-token'),
    path('auth/getSession', authViews.get_session, name='auth-get-session'),
    path('auth/login', authViews.login_view, name='auth-login')
]
