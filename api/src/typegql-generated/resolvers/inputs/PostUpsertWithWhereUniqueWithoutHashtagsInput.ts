import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateWithoutHashtagsInput } from "../inputs/PostCreateWithoutHashtagsInput";
import { PostUpdateWithoutHashtagsInput } from "../inputs/PostUpdateWithoutHashtagsInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class PostUpsertWithWhereUniqueWithoutHashtagsInput {
  @TypeGraphQL.Field(_type => PostWhereUniqueInput, {
    nullable: false
  })
  where!: PostWhereUniqueInput;

  @TypeGraphQL.Field(_type => PostUpdateWithoutHashtagsInput, {
    nullable: false
  })
  update!: PostUpdateWithoutHashtagsInput;

  @TypeGraphQL.Field(_type => PostCreateWithoutHashtagsInput, {
    nullable: false
  })
  create!: PostCreateWithoutHashtagsInput;
}
