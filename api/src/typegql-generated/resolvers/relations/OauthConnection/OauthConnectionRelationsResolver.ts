import * as TypeGraphQL from "type-graphql";
import { OauthConnection } from "../../../models/OauthConnection";
import { User } from "../../../models/User";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => OauthConnection)
export class OauthConnectionRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async user(@TypeGraphQL.Root() oauthConnection: OauthConnection, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).oauthConnection.findUnique({
      where: {
        id: oauthConnection.id,
      },
    }).user({});
  }
}
