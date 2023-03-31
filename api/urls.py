from django.urls import path
from .events import views as eventViews
from .clubs import views as clubViews
from .users import views as userViews
from .auth import views as authViews

urlpatterns = [
    path('events', eventViews.manage_events),
    path('events/series', eventViews.list_event_series),
    path('events/categories', eventViews.list_event_categories),
    path('events/headings', eventViews.list_table_headings),
    path('events/<slug:title>', eventViews.list_event_details),
    path('clubs', clubViews.list_clubs),
    path('users', userViews.create),
    path('auth/getToken', authViews.get_csrf_token),
    path('auth/getSession', authViews.get_session),
    path('auth/login', authViews.login_view)
]
