from django.urls import path
from . import views

app_name = 'mainApp'

urlpatterns = [
    path('', views.index, name = 'index'),
    path('posts/new', views.new_post, name = 'create_new_post'),
    path('product/new', views.new_product, name = 'create_new_product'),
    path('users/<int:user_id>', views.get_user, name = 'get_user'),
    path('users/all', views.get_all_users, name = 'get_all_users'),
    path('posts/all', views.get_all_posts, name = 'get_all_posts'),
    path('products/all', views.get_all_products, name = 'get_all_products'),
    path('posts/<int:post_id>', views.get_post, name = 'get_post'),
    path('post/<int:post_id>/<str:operation>', views.post_operation, name = 'post_operation')
]
