import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumOauthConnectionServiceFilter } from "../inputs/NestedEnumOauthConnectionServiceFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { OauthConnectionService } from "../../enums/OauthConnectionService";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class NestedEnumOauthConnectionServiceWithAggregatesFilter {
  @TypeGraphQL.Field(_type => OauthConnectionService, {
    nullable: true
  })
  equals?: "github" | "google" | "discord" | "twitter" | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionService], {
    nullable: true
  })
  in?: Array<"github" | "google" | "discord" | "twitter"> | undefined;

  @TypeGraphQL.Field(_type => [OauthConnectionService], {
    nullable: true
  })
  notIn?: Array<"github" | "google" | "discord" | "twitter"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumOauthConnectionServiceWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumOauthConnectionServiceWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumOauthConnectionServiceFilter, {
    nullable: true
  })
  _min?: NestedEnumOauthConnectionServiceFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumOauthConnectionServiceFilter, {
    nullable: true
  })
  _max?: NestedEnumOauthConnectionServiceFilter | undefined;
}
