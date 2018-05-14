from django.urls import path, include
from rest_framework import routers

from api.views import TaskView

router = routers.DefaultRouter()
router.register('task', TaskView)

urlpatterns = [
    path('', include(router.urls))
]


