import graphene
import user.schema
import graphql_jwt
import insta.schema


class Query(insta.schema.Query,user.schema.Query, graphene.ObjectType):
    pass


class Mutation(insta.schema.Mutations,user.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
