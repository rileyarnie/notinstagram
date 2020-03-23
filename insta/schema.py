import graphene
from .models import Post, Comment, Like
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from user.schema import UserType
from graphql_jwt.decorators import login_required


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment


class Query(graphene.ObjectType):
    posts = graphene.List(PostType)
    comments = graphene.List(CommentType)

    def resolve_posts(self, info):
        posts = Post.objects.all()
        return posts

    def resolve_comments(self, info):
        comments = Comment.objects.all()
        return comments


class CreatePost(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        image = graphene.String(required=True)
        caption = graphene.String()
        posted_by = graphene.String()

    @login_required
    def mutate(self, info, image, caption, posted_by):
        user = info.context.user
        post = Post(image=image, caption=caption, posted_by=user)
        post.save()
        return CreatePost(post=post)


class CreateComment(graphene.Mutation):
    user = graphene.Field(UserType)
    post = graphene.Field(PostType)

    class Arguments:
        post_id = graphene.Int(required=True)
        content = graphene.String(required=True)

    @login_required
    def mutate(self, info, post_id, content):
        user = info.context.user
        post = Post.objects.get(id=post_id)

        if user.is_anonymous:
            raise Exception("Please Login to comment!")

        if not Post:
            raise Exception("Can't find that post. Sorry!")

        comment = Comment.objects.create(user=user, post=post, content=content)
        comment.save()
        return CreateComment(user=user, post=post)


class DeletePost(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        post_id = graphene.Int()

    def mutate(self, info, post_id):
        post = Post.objects.get(id=post_id)
        post.delete()
        return post


class CreateLike(graphene.Mutation):
    user = graphene.Field(UserType)
    post = graphene.Field(PostType)

    class Arguments:
        post_id = graphene.Int(required=True)

    def mutate(self, info, post_id):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("Please Log In to like posts")
        post = Post.objects.get(id=post_id)

        if not post:
            raise Exception("Can't find post")

        Like.objects.create(user=user, post=post)

        return CreateLike(user=user, post=post)


class Mutations(graphene.ObjectType):
    create_post = CreatePost.Field()
    create_comment = CreateComment.Field()
    create_like = CreateLike.Field()
    delete_post=DeletePost.Field()