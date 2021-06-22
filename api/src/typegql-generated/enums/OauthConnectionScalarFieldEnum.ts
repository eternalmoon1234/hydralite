import * as TypeGraphQL from "type-graphql";

export enum OauthConnectionScalarFieldEnum {
  id = "id",
  oauthService = "oauthService",
  email = "email",
  username = "username",
  oauthServiceUserId = "oauthServiceUserId",
  isPrimary = "isPrimary",
  userId = "userId"
}
TypeGraphQL.registerEnumType(OauthConnectionScalarFieldEnum, {
  name: "OauthConnectionScalarFieldEnum",
  description: undefined,
});
