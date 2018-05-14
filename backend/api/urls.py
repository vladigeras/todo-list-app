from django.conf.urls import url
from django.urls import include
from rest_framework.routers import DefaultRouter

from api import views

router = DefaultRouter()
router.register(r'task', views.TaskView, base_name='task')

urlpatterns = [
    url(r'^', include(router.urls))
]
