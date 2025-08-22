from django.db import models
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image


with open("api/food-101-classes.txt", "r") as f:
    CLASSES = [line.strip() for line in f.readlines()]

class FoodModel(nn.Module):
    def __init__(self, num_classes=len(CLASSES)):
        super(FoodModel, self).__init__()
        self.model = models.resnet18(pretrained=False)
        self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)

    def forward(self, x):
        return self.model(x)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
food_model = FoodModel(num_classes=len(CLASSES))
food_model.load_state_dict(
    torch.load("api/food_model.pth", map_location=DEVICE),
    strict=False
)
food_model.to(DEVICE)
food_model.eval()

IMAGE_TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def predict_image(image_file):
    image = Image.open(image_file).convert("RGB")
    image = IMAGE_TRANSFORM(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = food_model(image)
        _, predicted = torch.max(outputs, 1)
        return CLASSES[predicted.item()]

from django.db import models
class Food(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

    class Meta:
        db_table = 'merge_food_data'  # Table name in external DB
        managed = False               # Django won't manage migrations for this table
