import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCreateOrConnectWithoutMembersInput } from "../inputs/ProjectCreateOrConnectWithoutMembersInput";
import { ProjectCreateWithoutMembersInput } from "../inputs/ProjectCreateWithoutMembersInput";
import { ProjectScalarWhereInput } from "../inputs/ProjectScalarWhereInput";
import { ProjectUpdateManyWithWhereWithoutMembersInput } from "../inputs/ProjectUpdateManyWithWhereWithoutMembersInput";
import { ProjectUpdateWithWhereUniqueWithoutMembersInput } from "../inputs/ProjectUpdateWithWhereUniqueWithoutMembersInput";
import { ProjectUpsertWithWhereUniqueWithoutMembersInput } from "../inputs/ProjectUpsertWithWhereUniqueWithoutMembersInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ProjectUpdateManyWithoutMembersInput {
  @TypeGraphQL.Field(_type => [ProjectCreateWithoutMembersInput], {
    nullable: true
  })
  create?: ProjectCreateWithoutMembersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectCreateOrConnectWithoutMembersInput], {
    nullable: true
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectUpsertWithWhereUniqueWithoutMembersInput], {
    nullable: true
  })
  upsert?: ProjectUpsertWithWhereUniqueWithoutMembersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true
  })
  connect?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true
  })
  set?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true
  })
  disconnect?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true
  })
  delete?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectUpdateWithWhereUniqueWithoutMembersInput], {
    nullable: true
  })
  update?: ProjectUpdateWithWhereUniqueWithoutMembersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectUpdateManyWithWhereWithoutMembersInput], {
    nullable: true
  })
  updateMany?: ProjectUpdateManyWithWhereWithoutMembersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ProjectScalarWhereInput[] | undefined;
}
