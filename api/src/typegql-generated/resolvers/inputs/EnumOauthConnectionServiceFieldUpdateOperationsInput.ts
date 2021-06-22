import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { OauthConnectionService } from "../../enums/OauthConnectionService";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class EnumOauthConnectionServiceFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => OauthConnectionService, {
    nullable: true
  })
  set?: "github" | "google" | "discord" | "twitter" | undefined;
}
