import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutOauthConnectionsInput } from "../inputs/UserCreateWithoutOauthConnectionsInput";
import { UserUpdateWithoutOauthConnectionsInput } from "../inputs/UserUpdateWithoutOauthConnectionsInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpsertWithoutOauthConnectionsInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutOauthConnectionsInput, {
    nullable: false
  })
  update!: UserUpdateWithoutOauthConnectionsInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutOauthConnectionsInput, {
    nullable: false
  })
  create!: UserCreateWithoutOauthConnectionsInput;
}
