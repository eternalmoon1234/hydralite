import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { OauthConnectionCreateManyUserInputEnvelope } from "../inputs/OauthConnectionCreateManyUserInputEnvelope";
import { OauthConnectionCreateOrConnectWithoutUserInput } from "../inputs/OauthConnectionCreateOrConnectWithoutUserInput";
import { OauthConnectionCreateWithoutUserInput } from "../inputs/OauthConnectionCreateWithoutUserInput";
import { OauthConnectionWhereUniqueInput } from "../inputs/OauthConnectionWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class OauthConnectionCreateNestedManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [OauthConnectionCreateWithoutUserInput], {
    nullable: true
  })
  create?: OauthConnectionCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionCreateOrConnectWithoutUserInput], {
    nullable: true
  })
  connectOrCreate?: OauthConnectionCreateOrConnectWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => OauthConnectionCreateManyUserInputEnvelope, {
    nullable: true
  })
  createMany?: OauthConnectionCreateManyUserInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionWhereUniqueInput], {
    nullable: true
  })
  connect?: OauthConnectionWhereUniqueInput[] | undefined;
}
