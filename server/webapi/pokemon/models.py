from django.db import models
import numpy as np
import tensorflow as tf
from tensorflow import keras
from PIL import Image
import io, base64

graph = tf.compat.v1.get_default_graph()

class ImageFile(models.Model):
  image = models.ImageField(upload_to='images')

  IMAGE_SIZE = 75
  MODEL_FILE_PATH = './pokemon/h5/pokemon-60.h5'
  classes = [str(number) for number in range(1, 152)]
  num_classes = len(classes)

  def predict(self):
    model = None
    global graph
    with graph.as_default():
      model = keras.models.load_model(self.MODEL_FILE_PATH)

      img_data = self.image.read()
      img_bin = io.BytesIO(img_data)

      image = Image.open(img_bin)
      image = image.convert("RGB")
      image = image.resize((self.IMAGE_SIZE, self.IMAGE_SIZE))
      data = np.asarray(image) / 255.0
      X = []
      X.append(data)
      X = np.array(X)
      result = model.predict([X])[0]
      predicted = result.argmax()
      percentage = int(result[predicted] * 100)

      return self.classes[predicted], percentage