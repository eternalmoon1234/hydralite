import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutAllProjectsInput } from "../inputs/UserCreateOrConnectWithoutAllProjectsInput";
import { UserCreateWithoutAllProjectsInput } from "../inputs/UserCreateWithoutAllProjectsInput";
import { UserScalarWhereInput } from "../inputs/UserScalarWhereInput";
import { UserUpdateManyWithWhereWithoutAllProjectsInput } from "../inputs/UserUpdateManyWithWhereWithoutAllProjectsInput";
import { UserUpdateWithWhereUniqueWithoutAllProjectsInput } from "../inputs/UserUpdateWithWhereUniqueWithoutAllProjectsInput";
import { UserUpsertWithWhereUniqueWithoutAllProjectsInput } from "../inputs/UserUpsertWithWhereUniqueWithoutAllProjectsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpdateManyWithoutAllProjectsInput {
  @TypeGraphQL.Field(_type => [UserCreateWithoutAllProjectsInput], {
    nullable: true
  })
  create?: UserCreateWithoutAllProjectsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserCreateOrConnectWithoutAllProjectsInput], {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutAllProjectsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpsertWithWhereUniqueWithoutAllProjectsInput], {
    nullable: true
  })
  upsert?: UserUpsertWithWhereUniqueWithoutAllProjectsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  connect?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  set?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  disconnect?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  delete?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpdateWithWhereUniqueWithoutAllProjectsInput], {
    nullable: true
  })
  update?: UserUpdateWithWhereUniqueWithoutAllProjectsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpdateManyWithWhereWithoutAllProjectsInput], {
    nullable: true
  })
  updateMany?: UserUpdateManyWithWhereWithoutAllProjectsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserScalarWhereInput], {
    nullable: true
  })
  deleteMany?: UserScalarWhereInput[] | undefined;
}
