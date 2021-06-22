import * as TypeGraphQL from "type-graphql";

export enum ProjectScalarFieldEnum {
  id = "id",
  title = "title",
  description = "description",
  logoUrl = "logoUrl",
  bannerUrl = "bannerUrl",
  ownerId = "ownerId"
}
TypeGraphQL.registerEnumType(ProjectScalarFieldEnum, {
  name: "ProjectScalarFieldEnum",
  description: undefined,
});
