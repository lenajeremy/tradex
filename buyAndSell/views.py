import json
from django.shortcuts import render, reverse, get_object_or_404
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect, Http404
from django.contrib.auth import login, logout
from .models import User, Post, Store, Product, Cart, Account
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

@login_required
def index(request):
  return render(request, 'buyAndSell/index.html', context={'allPosts':Post.objects.all().order_by('-dateCreated'), 'len': len(request.user.getProducts())})

@login_required
@csrf_exempt
def new_post(request):
  if request.method == 'POST':
    informationPosted = json.loads(request.body)
    content = informationPosted.get('content')
    image = informationPosted.get('image')
    Post.objects.create(content = content, poster = request.user, image = image)
    return JsonResponse({'message': 'Your post has been successfully uploaded', 'status': 200})
  
  return JsonResponse({'message': "Post request required", 'status': 403})

@login_required
def new_product(request):
  if request.method == 'POST':
    if request.user.userType == 'buyer':
      return JsonResponse({'message': "Operation DisAllowed, User is not a seller", 'status': 403})
    else:  
      data_sent = json.loads(request.body)
      print(data_sent)
      name = data_sent['name']
      description = data_sent['description']
      price = data_sent['price']
      imageUrl = data_sent['imageUrl']
      store = request.user.getCart()
      Product.objects.create(name = name, description = description ,price = price, imageUrl = imageUrl, store = store)
  
      return JsonResponse({'message': 'Product has been added to your store', 'status': 200})
  return JsonResponse({'message': "Post Request Required", 'status': 403})

def get_user(request, user_id):
  try:
    return JsonResponse({'user': get_object_or_404(User, id = user_id).serialize(), 'status': 200})
  except Http404 as e:
    return JsonResponse({'message': e.__str__(), 'status': 404})

def get_all_users(request):
  return JsonResponse({'users': [user.serialize() for user in User.objects.exclude(username = 'admin')], 'status': 200})

def get_all_posts(request):
  return JsonResponse({'posts': [post.serialize() for post in Post.objects.all()]})

def get_post(request, post_id):
  try:
    return JsonResponse(get_object_or_404(Post, id = post_id).serialize())
  except Http404 as e:
    return JsonResponse({'message': e.__str__(), 'status': 404})


def get_all_products(request):
  return JsonResponse({'allProducts': [product.serialize() for product in Product.objects.all()]})


def perform_product_operation(request, product_id, operation, user_id):
  try:
    product = Product.objects.get(id = product_id)
    if operation == 'add':
      print(request.user)
    else:
      pass
    return JsonResponse({'product': product.serialize()})
  except Product.DoesNotExist:
    return HttpResponse(f"Product with the id {product_id} does not exist")
  
def get_user_field(request, user_id, field):
  user = User.objects.get(id = user_id)
  if field.lower() == "posts":
    return JsonResponse({'user_posts': [post.serialize() for post in Post.objects.filter(poster = user)]})
  elif field.lower() == 'products' and user.userType == 'seller':
    return JsonResponse({'user_products': [product.serialize() for product in Product.objects.filter(store = Store.objects.get(user = user))]})
  else:
    return JsonResponse({'message': "User with such details not found", 'status': 404})