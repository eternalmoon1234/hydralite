import { ClassType } from "type-graphql";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";
import * as argsTypes from "./resolvers/crud/args.index";

const crudResolversMap = {
  OauthConnection: crudResolvers.OauthConnectionCrudResolver,
  User: crudResolvers.UserCrudResolver,
  UserProfile: crudResolvers.UserProfileCrudResolver,
  Project: crudResolvers.ProjectCrudResolver
};
const relationResolversMap = {
  OauthConnection: relationResolvers.OauthConnectionRelationsResolver,
  User: relationResolvers.UserRelationsResolver,
  UserProfile: relationResolvers.UserProfileRelationsResolver,
  Project: relationResolvers.ProjectRelationsResolver
};
const actionResolversMap = {
  OauthConnection: {
    oauthConnection: actionResolvers.FindUniqueOauthConnectionResolver,
    findFirstOauthConnection: actionResolvers.FindFirstOauthConnectionResolver,
    oauthConnections: actionResolvers.FindManyOauthConnectionResolver,
    createOauthConnection: actionResolvers.CreateOauthConnectionResolver,
    createManyOauthConnection: actionResolvers.CreateManyOauthConnectionResolver,
    deleteOauthConnection: actionResolvers.DeleteOauthConnectionResolver,
    updateOauthConnection: actionResolvers.UpdateOauthConnectionResolver,
    deleteManyOauthConnection: actionResolvers.DeleteManyOauthConnectionResolver,
    updateManyOauthConnection: actionResolvers.UpdateManyOauthConnectionResolver,
    upsertOauthConnection: actionResolvers.UpsertOauthConnectionResolver,
    aggregateOauthConnection: actionResolvers.AggregateOauthConnectionResolver,
    groupByOauthConnection: actionResolvers.GroupByOauthConnectionResolver
  },
  User: {
    user: actionResolvers.FindUniqueUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    users: actionResolvers.FindManyUserResolver,
    createUser: actionResolvers.CreateUserResolver,
    createManyUser: actionResolvers.CreateManyUserResolver,
    deleteUser: actionResolvers.DeleteUserResolver,
    updateUser: actionResolvers.UpdateUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    upsertUser: actionResolvers.UpsertUserResolver,
    aggregateUser: actionResolvers.AggregateUserResolver,
    groupByUser: actionResolvers.GroupByUserResolver
  },
  UserProfile: {
    userProfile: actionResolvers.FindUniqueUserProfileResolver,
    findFirstUserProfile: actionResolvers.FindFirstUserProfileResolver,
    userProfiles: actionResolvers.FindManyUserProfileResolver,
    createUserProfile: actionResolvers.CreateUserProfileResolver,
    createManyUserProfile: actionResolvers.CreateManyUserProfileResolver,
    deleteUserProfile: actionResolvers.DeleteUserProfileResolver,
    updateUserProfile: actionResolvers.UpdateUserProfileResolver,
    deleteManyUserProfile: actionResolvers.DeleteManyUserProfileResolver,
    updateManyUserProfile: actionResolvers.UpdateManyUserProfileResolver,
    upsertUserProfile: actionResolvers.UpsertUserProfileResolver,
    aggregateUserProfile: actionResolvers.AggregateUserProfileResolver,
    groupByUserProfile: actionResolvers.GroupByUserProfileResolver
  },
  Project: {
    project: actionResolvers.FindUniqueProjectResolver,
    findFirstProject: actionResolvers.FindFirstProjectResolver,
    projects: actionResolvers.FindManyProjectResolver,
    createProject: actionResolvers.CreateProjectResolver,
    createManyProject: actionResolvers.CreateManyProjectResolver,
    deleteProject: actionResolvers.DeleteProjectResolver,
    updateProject: actionResolvers.UpdateProjectResolver,
    deleteManyProject: actionResolvers.DeleteManyProjectResolver,
    updateManyProject: actionResolvers.UpdateManyProjectResolver,
    upsertProject: actionResolvers.UpsertProjectResolver,
    aggregateProject: actionResolvers.AggregateProjectResolver,
    groupByProject: actionResolvers.GroupByProjectResolver
  }
};
const resolversInfo = {
  OauthConnection: ["oauthConnection", "findFirstOauthConnection", "oauthConnections", "createOauthConnection", "createManyOauthConnection", "deleteOauthConnection", "updateOauthConnection", "deleteManyOauthConnection", "updateManyOauthConnection", "upsertOauthConnection", "aggregateOauthConnection", "groupByOauthConnection"],
  User: ["user", "findFirstUser", "users", "createUser", "createManyUser", "deleteUser", "updateUser", "deleteManyUser", "updateManyUser", "upsertUser", "aggregateUser", "groupByUser"],
  UserProfile: ["userProfile", "findFirstUserProfile", "userProfiles", "createUserProfile", "createManyUserProfile", "deleteUserProfile", "updateUserProfile", "deleteManyUserProfile", "updateManyUserProfile", "upsertUserProfile", "aggregateUserProfile", "groupByUserProfile"],
  Project: ["project", "findFirstProject", "projects", "createProject", "createManyProject", "deleteProject", "updateProject", "deleteManyProject", "updateManyProject", "upsertProject", "aggregateProject", "groupByProject"]
};
const relationResolversInfo = {
  OauthConnection: ["user"],
  User: ["profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserProfile: ["user"],
  Project: ["owner", "members", "likers", "followers"]
};
const modelsInfo = {
  OauthConnection: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId"],
  User: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profileId"],
  UserProfile: ["id", "avatarURL", "bio"],
  Project: ["id", "title", "description", "logoUrl", "bannerUrl", "ownerId"]
};
const inputsInfo = {
  OauthConnectionWhereInput: ["AND", "OR", "NOT", "id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "user", "userId"],
  OauthConnectionOrderByInput: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId"],
  OauthConnectionWhereUniqueInput: ["id"],
  OauthConnectionScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId"],
  UserWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "profileId", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserOrderByInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profileId"],
  UserWhereUniqueInput: ["id", "username", "email"],
  UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "createdAt", "username", "email", "joinDate", "hydra", "profileId"],
  UserProfileWhereInput: ["AND", "OR", "NOT", "id", "user", "avatarURL", "bio"],
  UserProfileOrderByInput: ["id", "avatarURL", "bio"],
  UserProfileWhereUniqueInput: ["id"],
  UserProfileScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "avatarURL", "bio"],
  ProjectWhereInput: ["AND", "OR", "NOT", "id", "title", "description", "logoUrl", "bannerUrl", "owner", "ownerId", "members", "likers", "followers"],
  ProjectOrderByInput: ["id", "title", "description", "logoUrl", "bannerUrl", "ownerId"],
  ProjectWhereUniqueInput: ["id"],
  ProjectScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "title", "description", "logoUrl", "bannerUrl", "ownerId"],
  OauthConnectionCreateInput: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "user"],
  OauthConnectionUpdateInput: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "user"],
  OauthConnectionCreateManyInput: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId"],
  OauthConnectionUpdateManyMutationInput: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary"],
  UserCreateInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserUpdateInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserCreateManyInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profileId"],
  UserUpdateManyMutationInput: ["id", "createdAt", "username", "email", "joinDate", "hydra"],
  UserProfileCreateInput: ["id", "avatarURL", "bio", "user"],
  UserProfileUpdateInput: ["id", "avatarURL", "bio", "user"],
  UserProfileCreateManyInput: ["id", "avatarURL", "bio"],
  UserProfileUpdateManyMutationInput: ["id", "avatarURL", "bio"],
  ProjectCreateInput: ["id", "title", "description", "logoUrl", "bannerUrl", "owner", "members", "likers", "followers"],
  ProjectUpdateInput: ["id", "title", "description", "logoUrl", "bannerUrl", "owner", "members", "likers", "followers"],
  ProjectCreateManyInput: ["id", "title", "description", "logoUrl", "bannerUrl", "ownerId"],
  ProjectUpdateManyMutationInput: ["id", "title", "description", "logoUrl", "bannerUrl"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  EnumOauthConnectionServiceFilter: ["equals", "in", "notIn", "not"],
  BoolFilter: ["equals", "not"],
  UserRelationFilter: ["is", "isNot"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  EnumOauthConnectionServiceWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  UserProfileRelationFilter: ["is", "isNot"],
  ProjectListRelationFilter: ["every", "some", "none"],
  OauthConnectionListRelationFilter: ["every", "some", "none"],
  UserListRelationFilter: ["every", "some", "none"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  IntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  UserCreateNestedOneWithoutOauthConnectionsInput: ["create", "connectOrCreate", "connect"],
  StringFieldUpdateOperationsInput: ["set"],
  EnumOauthConnectionServiceFieldUpdateOperationsInput: ["set"],
  BoolFieldUpdateOperationsInput: ["set"],
  UserUpdateOneRequiredWithoutOauthConnectionsInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserProfileCreateNestedOneWithoutUserInput: ["create", "connectOrCreate", "connect"],
  ProjectCreateNestedManyWithoutOwnerInput: ["create", "connectOrCreate", "createMany", "connect"],
  ProjectCreateNestedManyWithoutMembersInput: ["create", "connectOrCreate", "connect"],
  ProjectCreateNestedManyWithoutLikersInput: ["create", "connectOrCreate", "connect"],
  ProjectCreateNestedManyWithoutFollowersInput: ["create", "connectOrCreate", "connect"],
  OauthConnectionCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  UserCreateNestedManyWithoutFollowersInput: ["create", "connectOrCreate", "connect"],
  UserCreateNestedManyWithoutFollowingInput: ["create", "connectOrCreate", "connect"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  UserProfileUpdateOneRequiredWithoutUserInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  ProjectUpdateManyWithoutOwnerInput: ["create", "connectOrCreate", "upsert", "createMany", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  ProjectUpdateManyWithoutMembersInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  ProjectUpdateManyWithoutLikersInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  ProjectUpdateManyWithoutFollowersInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  OauthConnectionUpdateManyWithoutUserInput: ["create", "connectOrCreate", "upsert", "createMany", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  UserUpdateManyWithoutFollowersInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  UserUpdateManyWithoutFollowingInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  UserCreateNestedOneWithoutProfileInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneWithoutProfileInput: ["create", "connectOrCreate", "upsert", "connect", "disconnect", "delete", "update"],
  UserCreateNestedOneWithoutOwnedProjectsInput: ["create", "connectOrCreate", "connect"],
  UserCreateNestedManyWithoutAllProjectsInput: ["create", "connectOrCreate", "connect"],
  UserCreateNestedManyWithoutLikedProjectsInput: ["create", "connectOrCreate", "connect"],
  UserCreateNestedManyWithoutFollowedProjectsInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneRequiredWithoutOwnedProjectsInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserUpdateManyWithoutAllProjectsInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  UserUpdateManyWithoutLikedProjectsInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  UserUpdateManyWithoutFollowedProjectsInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedEnumOauthConnectionServiceFilter: ["equals", "in", "notIn", "not"],
  NestedBoolFilter: ["equals", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedEnumOauthConnectionServiceWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  UserCreateWithoutOauthConnectionsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "following", "followers"],
  UserCreateOrConnectWithoutOauthConnectionsInput: ["where", "create"],
  UserUpsertWithoutOauthConnectionsInput: ["update", "create"],
  UserUpdateWithoutOauthConnectionsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "following", "followers"],
  UserProfileCreateWithoutUserInput: ["id", "avatarURL", "bio"],
  UserProfileCreateOrConnectWithoutUserInput: ["where", "create"],
  ProjectCreateWithoutOwnerInput: ["id", "title", "description", "logoUrl", "bannerUrl", "members", "likers", "followers"],
  ProjectCreateOrConnectWithoutOwnerInput: ["where", "create"],
  ProjectCreateManyOwnerInputEnvelope: ["data", "skipDuplicates"],
  ProjectCreateWithoutMembersInput: ["id", "title", "description", "logoUrl", "bannerUrl", "owner", "likers", "followers"],
  ProjectCreateOrConnectWithoutMembersInput: ["where", "create"],
  ProjectCreateWithoutLikersInput: ["id", "title", "description", "logoUrl", "bannerUrl", "owner", "members", "followers"],
  ProjectCreateOrConnectWithoutLikersInput: ["where", "create"],
  ProjectCreateWithoutFollowersInput: ["id", "title", "description", "logoUrl", "bannerUrl", "owner", "members", "likers"],
  ProjectCreateOrConnectWithoutFollowersInput: ["where", "create"],
  OauthConnectionCreateWithoutUserInput: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary"],
  OauthConnectionCreateOrConnectWithoutUserInput: ["where", "create"],
  OauthConnectionCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  UserCreateWithoutFollowersInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following"],
  UserCreateOrConnectWithoutFollowersInput: ["where", "create"],
  UserCreateWithoutFollowingInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "followers"],
  UserCreateOrConnectWithoutFollowingInput: ["where", "create"],
  UserProfileUpsertWithoutUserInput: ["update", "create"],
  UserProfileUpdateWithoutUserInput: ["id", "avatarURL", "bio"],
  ProjectUpsertWithWhereUniqueWithoutOwnerInput: ["where", "update", "create"],
  ProjectUpdateWithWhereUniqueWithoutOwnerInput: ["where", "data"],
  ProjectUpdateManyWithWhereWithoutOwnerInput: ["where", "data"],
  ProjectScalarWhereInput: ["AND", "OR", "NOT", "id", "title", "description", "logoUrl", "bannerUrl", "ownerId"],
  ProjectUpsertWithWhereUniqueWithoutMembersInput: ["where", "update", "create"],
  ProjectUpdateWithWhereUniqueWithoutMembersInput: ["where", "data"],
  ProjectUpdateManyWithWhereWithoutMembersInput: ["where", "data"],
  ProjectUpsertWithWhereUniqueWithoutLikersInput: ["where", "update", "create"],
  ProjectUpdateWithWhereUniqueWithoutLikersInput: ["where", "data"],
  ProjectUpdateManyWithWhereWithoutLikersInput: ["where", "data"],
  ProjectUpsertWithWhereUniqueWithoutFollowersInput: ["where", "update", "create"],
  ProjectUpdateWithWhereUniqueWithoutFollowersInput: ["where", "data"],
  ProjectUpdateManyWithWhereWithoutFollowersInput: ["where", "data"],
  OauthConnectionUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  OauthConnectionUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  OauthConnectionUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  OauthConnectionScalarWhereInput: ["AND", "OR", "NOT", "id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId"],
  UserUpsertWithWhereUniqueWithoutFollowersInput: ["where", "update", "create"],
  UserUpdateWithWhereUniqueWithoutFollowersInput: ["where", "data"],
  UserUpdateManyWithWhereWithoutFollowersInput: ["where", "data"],
  UserScalarWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "username", "email", "joinDate", "hydra", "profileId"],
  UserUpsertWithWhereUniqueWithoutFollowingInput: ["where", "update", "create"],
  UserUpdateWithWhereUniqueWithoutFollowingInput: ["where", "data"],
  UserUpdateManyWithWhereWithoutFollowingInput: ["where", "data"],
  UserCreateWithoutProfileInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserCreateOrConnectWithoutProfileInput: ["where", "create"],
  UserUpsertWithoutProfileInput: ["update", "create"],
  UserUpdateWithoutProfileInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserCreateWithoutOwnedProjectsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserCreateOrConnectWithoutOwnedProjectsInput: ["where", "create"],
  UserCreateWithoutAllProjectsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserCreateOrConnectWithoutAllProjectsInput: ["where", "create"],
  UserCreateWithoutLikedProjectsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserCreateOrConnectWithoutLikedProjectsInput: ["where", "create"],
  UserCreateWithoutFollowedProjectsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "oauthConnections", "following", "followers"],
  UserCreateOrConnectWithoutFollowedProjectsInput: ["where", "create"],
  UserUpsertWithoutOwnedProjectsInput: ["update", "create"],
  UserUpdateWithoutOwnedProjectsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserUpsertWithWhereUniqueWithoutAllProjectsInput: ["where", "update", "create"],
  UserUpdateWithWhereUniqueWithoutAllProjectsInput: ["where", "data"],
  UserUpdateManyWithWhereWithoutAllProjectsInput: ["where", "data"],
  UserUpsertWithWhereUniqueWithoutLikedProjectsInput: ["where", "update", "create"],
  UserUpdateWithWhereUniqueWithoutLikedProjectsInput: ["where", "data"],
  UserUpdateManyWithWhereWithoutLikedProjectsInput: ["where", "data"],
  UserUpsertWithWhereUniqueWithoutFollowedProjectsInput: ["where", "update", "create"],
  UserUpdateWithWhereUniqueWithoutFollowedProjectsInput: ["where", "data"],
  UserUpdateManyWithWhereWithoutFollowedProjectsInput: ["where", "data"],
  ProjectCreateManyOwnerInput: ["id", "title", "description", "logoUrl", "bannerUrl"],
  OauthConnectionCreateManyUserInput: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary"],
  ProjectUpdateWithoutOwnerInput: ["id", "title", "description", "logoUrl", "bannerUrl", "members", "likers", "followers"],
  ProjectUpdateWithoutMembersInput: ["id", "title", "description", "logoUrl", "bannerUrl", "owner", "likers", "followers"],
  ProjectUpdateWithoutLikersInput: ["id", "title", "description", "logoUrl", "bannerUrl", "owner", "members", "followers"],
  ProjectUpdateWithoutFollowersInput: ["id", "title", "description", "logoUrl", "bannerUrl", "owner", "members", "likers"],
  OauthConnectionUpdateWithoutUserInput: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary"],
  UserUpdateWithoutFollowersInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "following"],
  UserUpdateWithoutFollowingInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "followedProjects", "oauthConnections", "followers"],
  UserUpdateWithoutAllProjectsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "likedProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserUpdateWithoutLikedProjectsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "followedProjects", "oauthConnections", "following", "followers"],
  UserUpdateWithoutFollowedProjectsInput: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profile", "ownedProjects", "allProjects", "likedProjects", "oauthConnections", "following", "followers"]
};
const outputsInfo = {
  AggregateOauthConnection: ["_count", "_min", "_max"],
  OauthConnectionGroupBy: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId", "_count", "_min", "_max"],
  AggregateUser: ["_count", "_avg", "_sum", "_min", "_max"],
  UserGroupBy: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profileId", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateUserProfile: ["_count", "_min", "_max"],
  UserProfileGroupBy: ["id", "avatarURL", "bio", "_count", "_min", "_max"],
  AggregateProject: ["_count", "_min", "_max"],
  ProjectGroupBy: ["id", "title", "description", "logoUrl", "bannerUrl", "ownerId", "_count", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  OauthConnectionCountAggregate: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId", "_all"],
  OauthConnectionMinAggregate: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId"],
  OauthConnectionMaxAggregate: ["id", "oauthService", "email", "username", "oauthServiceUserId", "isPrimary", "userId"],
  UserCountAggregate: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profileId", "_all"],
  UserAvgAggregate: ["hydra"],
  UserSumAggregate: ["hydra"],
  UserMinAggregate: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profileId"],
  UserMaxAggregate: ["id", "createdAt", "username", "email", "joinDate", "hydra", "profileId"],
  UserProfileCountAggregate: ["id", "avatarURL", "bio", "_all"],
  UserProfileMinAggregate: ["id", "avatarURL", "bio"],
  UserProfileMaxAggregate: ["id", "avatarURL", "bio"],
  ProjectCountAggregate: ["id", "title", "description", "logoUrl", "bannerUrl", "ownerId", "_all"],
  ProjectMinAggregate: ["id", "title", "description", "logoUrl", "bannerUrl", "ownerId"],
  ProjectMaxAggregate: ["id", "title", "description", "logoUrl", "bannerUrl", "ownerId"]
};
const argsInfo = {
  FindUniqueOauthConnectionArgs: ["where"],
  FindFirstOauthConnectionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyOauthConnectionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateOauthConnectionArgs: ["data"],
  CreateManyOauthConnectionArgs: ["data", "skipDuplicates"],
  DeleteOauthConnectionArgs: ["where"],
  UpdateOauthConnectionArgs: ["data", "where"],
  DeleteManyOauthConnectionArgs: ["where"],
  UpdateManyOauthConnectionArgs: ["data", "where"],
  UpsertOauthConnectionArgs: ["where", "create", "update"],
  AggregateOauthConnectionArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByOauthConnectionArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueUserArgs: ["where"],
  FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateUserArgs: ["data"],
  CreateManyUserArgs: ["data", "skipDuplicates"],
  DeleteUserArgs: ["where"],
  UpdateUserArgs: ["data", "where"],
  DeleteManyUserArgs: ["where"],
  UpdateManyUserArgs: ["data", "where"],
  UpsertUserArgs: ["where", "create", "update"],
  AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueUserProfileArgs: ["where"],
  FindFirstUserProfileArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserProfileArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateUserProfileArgs: ["data"],
  CreateManyUserProfileArgs: ["data", "skipDuplicates"],
  DeleteUserProfileArgs: ["where"],
  UpdateUserProfileArgs: ["data", "where"],
  DeleteManyUserProfileArgs: ["where"],
  UpdateManyUserProfileArgs: ["data", "where"],
  UpsertUserProfileArgs: ["where", "create", "update"],
  AggregateUserProfileArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByUserProfileArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueProjectArgs: ["where"],
  FindFirstProjectArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyProjectArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateProjectArgs: ["data"],
  CreateManyProjectArgs: ["data", "skipDuplicates"],
  DeleteProjectArgs: ["where"],
  UpdateProjectArgs: ["data", "where"],
  DeleteManyProjectArgs: ["where"],
  UpdateManyProjectArgs: ["data", "where"],
  UpsertProjectArgs: ["where", "create", "update"],
  AggregateProjectArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByProjectArgs: ["where", "orderBy", "by", "having", "take", "skip"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
  > = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
  > = Partial<Record<ModelResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = resolversInfo[modelName as keyof typeof resolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        for (const allActionsDecorator of allActionsDecorators) {
          allActionsDecorator(
            crudTarget,
            resolverActionName,
            Object.getOwnPropertyDescriptor(crudTarget, resolverActionName)!,
          );
          allActionsDecorator(
            actionTarget,
            resolverActionName,
            Object.getOwnPropertyDescriptor(actionTarget, resolverActionName)!,
          );
        }
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      for (const decorator of decorators) {
        decorator(
          crudTarget,
          resolverActionName,
          Object.getOwnPropertyDescriptor(crudTarget, resolverActionName)!,
        );
        decorator(
          actionTarget,
          resolverActionName,
          Object.getOwnPropertyDescriptor(actionTarget, resolverActionName)!,
        );
      }
    }
  }
}

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
  > = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    if (relationResolverActionsConfig._all) {
      const allActionsDecorators = relationResolverActionsConfig._all;
      const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
      for (const relationResolverActionName of relationResolverActionNames) {
        for (const allActionsDecorator of allActionsDecorators) {
          allActionsDecorator(
            relationResolverTarget,
            relationResolverActionName,
            Object.getOwnPropertyDescriptor(relationResolverTarget, relationResolverActionName)!,
          );
        }
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      for (const decorator of decorators) {
        decorator(
          relationResolverTarget,
          relationResolverActionName,
          Object.getOwnPropertyDescriptor(relationResolverTarget, relationResolverActionName)!,
        );
      }
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | "_all", PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    for (const decorator of enhanceConfig.class) {
      decorator(typeClass);
    }
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        for (const allFieldsDecorator of allFieldsDecorators) {
          allFieldsDecorator(typePrototype, typeFieldName);
        }
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
      it => it !== "_all"
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      for (const fieldDecorator of fieldDecorators) {
        fieldDecorator(typePrototype, typeFieldName);
      }
    }
  }
}

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
  > = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
  > = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
  > = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}







