from django.db import models

# Create your models here.
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

# Load class names
with open("api/food-101-classes.txt", "r") as f:
    classes = [line.strip() for line in f.readlines()]

# # Define the model class
class FoodModel(nn.Module):
    def __init__(self, num_classes=101):
        super(FoodModel, self).__init__()
        self.model = models.resnet18(pretrained=False)
        self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)

    def forward(self, x):
        return self.model(x)

# # Load the model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = FoodModel(num_classes=len(classes))
model.load_state_dict(torch.load("api/food_model.pth", map_location=device),strict=False)
model.to(device)
model.eval()

# # Image transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Predict function
def predict_image(image_file):
    image = Image.open(image_file).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        return classes[predicted.item()]


# from django.db import models
# class FoodItem(models.Model):
#     description = models.CharField(max_length=255)
#     amount_per_100g = models.FloatField()
#     protein = models.FloatField()
#     fat = models.FloatField()
#     carbs = models.FloatField()
#     fiber = models.FloatField()
#     sugar = models.FloatField()

#     def __str__(self):
#         return self.name


# myapp/models.py
from django.db import models

class Food(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

    class Meta:
        db_table = 'merge_food_data'      # must match the table name in extra_db
        managed = False          # tells Django not to create/migrate this table
