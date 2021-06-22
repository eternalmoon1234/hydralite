import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { OauthConnectionUpdateWithoutUserInput } from "../inputs/OauthConnectionUpdateWithoutUserInput";
import { OauthConnectionWhereUniqueInput } from "../inputs/OauthConnectionWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class OauthConnectionUpdateWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => OauthConnectionWhereUniqueInput, {
    nullable: false
  })
  where!: OauthConnectionWhereUniqueInput;

  @TypeGraphQL.Field(_type => OauthConnectionUpdateWithoutUserInput, {
    nullable: false
  })
  data!: OauthConnectionUpdateWithoutUserInput;
}
