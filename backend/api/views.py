import datetime

from django.http import Http404
from rest_framework import viewsets, status
from rest_framework.response import Response

from api.models import Task
from api.serializers import TaskSerializer


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        dateString = self.request.query_params.get("date")
        if dateString is not None:
            date = datetime.datetime.strptime(dateString, "%d.%m.%Y").date()
            queryset = Task.objects.filter(date=date)
        else:
            queryset = Task.objects.all()
        return queryset

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)
