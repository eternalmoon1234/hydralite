import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { OauthConnectionCreateWithoutUserInput } from "../inputs/OauthConnectionCreateWithoutUserInput";
import { OauthConnectionUpdateWithoutUserInput } from "../inputs/OauthConnectionUpdateWithoutUserInput";
import { OauthConnectionWhereUniqueInput } from "../inputs/OauthConnectionWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class OauthConnectionUpsertWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => OauthConnectionWhereUniqueInput, {
    nullable: false
  })
  where!: OauthConnectionWhereUniqueInput;

  @TypeGraphQL.Field(_type => OauthConnectionUpdateWithoutUserInput, {
    nullable: false
  })
  update!: OauthConnectionUpdateWithoutUserInput;

  @TypeGraphQL.Field(_type => OauthConnectionCreateWithoutUserInput, {
    nullable: false
  })
  create!: OauthConnectionCreateWithoutUserInput;
}
