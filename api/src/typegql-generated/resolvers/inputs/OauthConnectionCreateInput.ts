import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateNestedOneWithoutOauthConnectionsInput } from "../inputs/UserCreateNestedOneWithoutOauthConnectionsInput";
import { OauthConnectionService } from "../../enums/OauthConnectionService";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class OauthConnectionCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => OauthConnectionService, {
    nullable: false
  })
  oauthService!: "github" | "google" | "discord" | "twitter";

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  username!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  oauthServiceUserId!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  isPrimary!: boolean;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutOauthConnectionsInput, {
    nullable: false
  })
  user!: UserCreateNestedOneWithoutOauthConnectionsInput;
}
