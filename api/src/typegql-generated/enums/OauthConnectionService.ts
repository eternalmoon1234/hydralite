import * as TypeGraphQL from "type-graphql";

export enum OauthConnectionService {
  github = "github",
  google = "google",
  discord = "discord",
  twitter = "twitter"
}
TypeGraphQL.registerEnumType(OauthConnectionService, {
  name: "OauthConnectionService",
  description: undefined,
});
