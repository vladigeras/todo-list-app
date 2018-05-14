from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(default="")
    isImportant = models.BooleanField(default=False)
    date = models.DateField(null=True)

    def __str__(self):
        return self.title
