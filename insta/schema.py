import graphene
from .models import Post
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class Query(graphene.ObjectType):
    posts = graphene.List(PostType)

    def resolve_posts(self, info):
        posts = Post.objects.all()
        return posts


class CreatePost(graphene.Mutation):
    post = graphene.Field(PostType)


    class Arguments:
        image = graphene.String()
        caption = graphene.String()
        posted_by = graphene.String()

    def mutate(self, info, image, caption, posted_by):
        user=info.context.user
        post = Post(image=image, caption=caption, posted_by=user)
        post.save()
        return CreatePost(post=post) 


class Mutations(graphene.ObjectType):
    create_post=CreatePost.Field()
