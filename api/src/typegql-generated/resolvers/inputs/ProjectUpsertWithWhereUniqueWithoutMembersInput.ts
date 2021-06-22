import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateWithoutMembersInput } from "../inputs/ProjectCreateWithoutMembersInput";
import { ProjectUpdateWithoutMembersInput } from "../inputs/ProjectUpdateWithoutMembersInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ProjectUpsertWithWhereUniqueWithoutMembersInput {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectUpdateWithoutMembersInput, {
    nullable: false
  })
  update!: ProjectUpdateWithoutMembersInput;

  @TypeGraphQL.Field(_type => ProjectCreateWithoutMembersInput, {
    nullable: false
  })
  create!: ProjectCreateWithoutMembersInput;
}
