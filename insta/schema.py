import graphene
from .models import Post, Comment
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from user.schema import UserType


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment


class Query(graphene.ObjectType):
    posts = graphene.List(PostType)
    comments = graphene.List(CommentType)

    def resolve_comment(self, info):
        comments = Comment.objects.all()
        return comments

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
        user = info.context.user
        post = Post(image=image, caption=caption, posted_by=user)
        post.save()
        return CreatePost(post=post)


# class CreateComment(graphene.Mutation):
#     user = graphene.Field(UserType)
#     post = graphene.Field(PostType)

#     class Arguments:
#         post_id = graphene.Int(required=True)

#     def mutate(self, info, post_id):
#         user = info.context.user
#         post = Post.objects.get(id=post_id)

#         if user.is_anonymous:
#             raise Exception("Please Login to comment!")

#         if not Post:
#             raise Exception("Can't find that post. Sorry!")

#         Comment.objects.create(user=user, post=post)
#         return CreateComment(user=user, post=post)


class Mutations(graphene.ObjectType):
    create_post = CreatePost.Field()
    create_comment = CreateComment.Field()
