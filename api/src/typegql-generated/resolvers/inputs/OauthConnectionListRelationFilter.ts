import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { OauthConnectionWhereInput } from "../inputs/OauthConnectionWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class OauthConnectionListRelationFilter {
  @TypeGraphQL.Field(_type => OauthConnectionWhereInput, {
    nullable: true
  })
  every?: OauthConnectionWhereInput | undefined;

  @TypeGraphQL.Field(_type => OauthConnectionWhereInput, {
    nullable: true
  })
  some?: OauthConnectionWhereInput | undefined;

  @TypeGraphQL.Field(_type => OauthConnectionWhereInput, {
    nullable: true
  })
  none?: OauthConnectionWhereInput | undefined;
}
