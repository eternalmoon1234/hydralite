import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutOwnedProjectsInput } from "../inputs/UserCreateWithoutOwnedProjectsInput";
import { UserUpdateWithoutOwnedProjectsInput } from "../inputs/UserUpdateWithoutOwnedProjectsInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpsertWithoutOwnedProjectsInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutOwnedProjectsInput, {
    nullable: false
  })
  update!: UserUpdateWithoutOwnedProjectsInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutOwnedProjectsInput, {
    nullable: false
  })
  create!: UserCreateWithoutOwnedProjectsInput;
}
