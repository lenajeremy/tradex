from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from userAuthentication.models import User
import random, json

# Create your models here.
class Store(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'store')
  
  def serialize(self):
    data_to_return = {'id': self.id, 'owner': self.user.username, 'user_id': self.user.id, 'products': [product.serialize() for product in self.products.all()]}
    return data_to_return
  
  def __str__(self):
    return f"{self.user} {len(self.products.all())}"


class Product(models.Model):
  name = models.CharField(max_length=100)
  description = models.TextField()
  price = models.IntegerField()
  imageUrl = models.TextField()
  watchers = models.ManyToManyField(User, related_name='watched_products')
  store = models.ForeignKey(Store, on_delete = models.CASCADE, related_name = 'products')
  isAvailable = models.BooleanField(default = False)
  dataAdded = models.DateTimeField(auto_now_add=True)
  
  def getOwner(self):
    return self.store.user
  
  def serialize(self):
    data_to_return = {'id': self.id, 'name': self.name, 'description': self.description, 'price': self.price, 'imageUrl': self.imageUrl, 'store': self.store, 'isAvailable': self.isAvailable, 'dateAdded': self.dataAdded.timestamp, 'owner': {'id': self.getOwner().id, 'username': self.getOwner().username}}
    return data_to_return
  
  
  def __str__(self):
      return f"{self.name} {self.price}"

class Cart(models.Model):
  user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'cart')
  products = models.ManyToManyField(Product, related_name='cart')
  
  def serialize(self):
    data_to_return = {'id': self.id, 'user': {'id': self.user.id, 'username': self.user.username}, 'products': [product.serialize() for product in self.products.all()]}
    return data_to_return
  
  def __str__(self):
    return f"{self.user} {len(self.products.all())}"
  
  
class Post(models.Model):
  content = models.TextField()
  poster = models.ForeignKey(User, on_delete= models.CASCADE, related_name='posts')
  image = models.TextField()
  dateCreated = models.DateTimeField(auto_now_add = True)
  
  def serialize(self):
    data_to_return = {'id': self.id, "content": self.content, "poster": self.poster.username, 'image': self.image.name, 'dateCreated': self.dateCreated.timestamp()}
    return data_to_return
    
  def __str__(self):
      return f"{self.content[:25]}..."
  
class Account(models.Model):
  owner = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'account')
  number = models.IntegerField(default = random.randint(9999999, 99999999))
  amount = models.IntegerField(default = 0)
  
  def serialize(self):
    data_to_return = {'id': self.id, "owner": self.owner.username, 'number': self.number, 'accountName': f"{self.owner.first_name} {self.owner.last_name}", 'balance': f"${self.amount}"}
    return data_to_return
    
  def __str__(self):
    return f"NAME: {self.owner.first_name} {self.owner.last_name} NUMBER: {str(self.number)}"
  
class Like(models.Model):
  post = models.ForeignKey(Post, on_delete = models.DO_NOTHING, related_name='likes')
  liker = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'likes')
  
  def __str__(self):
    return f"Like {len(self.post.likes.all())} on {self.post}"
  
  def serialize(self):
    data_to_return = {'id': self.id, 'post_id': self.post.id, 'post_content_shortened': self.post.__str__()}
    return data_to_return

class Comment(models.Model):
  text = models.CharField(max_length = 300)
  post = models.ForeignKey(Post, on_delete = models.CASCADE, related_name = 'comments')
  commenter = models.ForeignKey(User, on_delete = models.DO_NOTHING, related_name = 'comments')
  
  def __str__(self):
    return f"{self.text} {self.post}"
  
  def serialize(self):
    data_to_return = {'id': self.id, 'post_id': self.post.id, 'commenter': self.commenter.__str__(), 'post_content_shortened': self.post.__str__()}
    return data_to_return