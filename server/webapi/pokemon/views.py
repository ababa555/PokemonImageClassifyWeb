from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import ImageFile

from PIL import Image
import io, base64
import re

@require_POST
@csrf_exempt
def predict(request):
  upload_file = request.FILES["file"]
  imageFile = ImageFile(image=upload_file)
  predicted, percentage = imageFile.predict()
  return JsonResponse({ "predicted": predicted, "percentage": percentage })

def health(request):
  return HttpResponse("OK.")