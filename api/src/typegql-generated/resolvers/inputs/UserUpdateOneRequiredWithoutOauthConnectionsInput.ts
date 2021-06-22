import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutOauthConnectionsInput } from "../inputs/UserCreateOrConnectWithoutOauthConnectionsInput";
import { UserCreateWithoutOauthConnectionsInput } from "../inputs/UserCreateWithoutOauthConnectionsInput";
import { UserUpdateWithoutOauthConnectionsInput } from "../inputs/UserUpdateWithoutOauthConnectionsInput";
import { UserUpsertWithoutOauthConnectionsInput } from "../inputs/UserUpsertWithoutOauthConnectionsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpdateOneRequiredWithoutOauthConnectionsInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutOauthConnectionsInput, {
    nullable: true
  })
  create?: UserCreateWithoutOauthConnectionsInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutOauthConnectionsInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutOauthConnectionsInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutOauthConnectionsInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutOauthConnectionsInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutOauthConnectionsInput, {
    nullable: true
  })
  update?: UserUpdateWithoutOauthConnectionsInput | undefined;
}
