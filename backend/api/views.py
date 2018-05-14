import datetime

from rest_framework import viewsets

from api.models import Task
from api.serializers import TaskSerializer


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        dateString = self.request.query_params.get("date")
        date = datetime.datetime.strptime(dateString, "%d.%m.%Y").date()
        queryset = Task.objects.filter(date=date)

        return queryset
