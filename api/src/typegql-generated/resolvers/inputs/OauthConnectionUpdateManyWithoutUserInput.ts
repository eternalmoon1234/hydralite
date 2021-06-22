import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { OauthConnectionCreateManyUserInputEnvelope } from "../inputs/OauthConnectionCreateManyUserInputEnvelope";
import { OauthConnectionCreateOrConnectWithoutUserInput } from "../inputs/OauthConnectionCreateOrConnectWithoutUserInput";
import { OauthConnectionCreateWithoutUserInput } from "../inputs/OauthConnectionCreateWithoutUserInput";
import { OauthConnectionScalarWhereInput } from "../inputs/OauthConnectionScalarWhereInput";
import { OauthConnectionUpdateManyWithWhereWithoutUserInput } from "../inputs/OauthConnectionUpdateManyWithWhereWithoutUserInput";
import { OauthConnectionUpdateWithWhereUniqueWithoutUserInput } from "../inputs/OauthConnectionUpdateWithWhereUniqueWithoutUserInput";
import { OauthConnectionUpsertWithWhereUniqueWithoutUserInput } from "../inputs/OauthConnectionUpsertWithWhereUniqueWithoutUserInput";
import { OauthConnectionWhereUniqueInput } from "../inputs/OauthConnectionWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class OauthConnectionUpdateManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [OauthConnectionCreateWithoutUserInput], {
    nullable: true
  })
  create?: OauthConnectionCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionCreateOrConnectWithoutUserInput], {
    nullable: true
  })
  connectOrCreate?: OauthConnectionCreateOrConnectWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionUpsertWithWhereUniqueWithoutUserInput], {
    nullable: true
  })
  upsert?: OauthConnectionUpsertWithWhereUniqueWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => OauthConnectionCreateManyUserInputEnvelope, {
    nullable: true
  })
  createMany?: OauthConnectionCreateManyUserInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionWhereUniqueInput], {
    nullable: true
  })
  connect?: OauthConnectionWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionWhereUniqueInput], {
    nullable: true
  })
  set?: OauthConnectionWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionWhereUniqueInput], {
    nullable: true
  })
  disconnect?: OauthConnectionWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionWhereUniqueInput], {
    nullable: true
  })
  delete?: OauthConnectionWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionUpdateWithWhereUniqueWithoutUserInput], {
    nullable: true
  })
  update?: OauthConnectionUpdateWithWhereUniqueWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionUpdateManyWithWhereWithoutUserInput], {
    nullable: true
  })
  updateMany?: OauthConnectionUpdateManyWithWhereWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionScalarWhereInput], {
    nullable: true
  })
  deleteMany?: OauthConnectionScalarWhereInput[] | undefined;
}
