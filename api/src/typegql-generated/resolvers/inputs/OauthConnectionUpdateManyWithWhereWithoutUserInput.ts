import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { OauthConnectionScalarWhereInput } from "../inputs/OauthConnectionScalarWhereInput";
import { OauthConnectionUpdateManyMutationInput } from "../inputs/OauthConnectionUpdateManyMutationInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class OauthConnectionUpdateManyWithWhereWithoutUserInput {
  @TypeGraphQL.Field(_type => OauthConnectionScalarWhereInput, {
    nullable: false
  })
  where!: OauthConnectionScalarWhereInput;

  @TypeGraphQL.Field(_type => OauthConnectionUpdateManyMutationInput, {
    nullable: false
  })
  data!: OauthConnectionUpdateManyMutationInput;
}
