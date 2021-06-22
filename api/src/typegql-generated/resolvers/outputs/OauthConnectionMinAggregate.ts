import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { OauthConnectionService } from "../../enums/OauthConnectionService";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class OauthConnectionMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => OauthConnectionService, {
    nullable: true
  })
  oauthService!: "github" | "google" | "discord" | "twitter" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  username!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  oauthServiceUserId!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isPrimary!: boolean | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  userId!: string | null;
}
