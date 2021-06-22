import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutOauthConnectionsInput } from "../inputs/UserCreateOrConnectWithoutOauthConnectionsInput";
import { UserCreateWithoutOauthConnectionsInput } from "../inputs/UserCreateWithoutOauthConnectionsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserCreateNestedOneWithoutOauthConnectionsInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutOauthConnectionsInput, {
    nullable: true
  })
  create?: UserCreateWithoutOauthConnectionsInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutOauthConnectionsInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutOauthConnectionsInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
