import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutAllProjectsInput } from "../inputs/UserCreateOrConnectWithoutAllProjectsInput";
import { UserCreateWithoutAllProjectsInput } from "../inputs/UserCreateWithoutAllProjectsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserCreateNestedManyWithoutAllProjectsInput {
  @TypeGraphQL.Field(_type => [UserCreateWithoutAllProjectsInput], {
    nullable: true
  })
  create?: UserCreateWithoutAllProjectsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserCreateOrConnectWithoutAllProjectsInput], {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutAllProjectsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  connect?: UserWhereUniqueInput[] | undefined;
}
