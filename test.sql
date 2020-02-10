SELECT
"Help"."id",
"Help"."id_type",
"Help"."id_category",
"Help"."id_creator",
"Help"."title",
"Help"."description",
"Help"."image",
"Help"."halfhourValidity",
"Help"."dateStartValidity",
"Help"."dateEndValidity",
"Help"."dateCompletion",
"Help"."createdAt",
"Help"."updatedAt",
"HelpType"."id" AS "HelpType.id",
"HelpType"."code" AS "HelpType.code",
"HelpType"."name" AS "HelpType.name",
"HelpCategory"."id" AS "HelpCategory.id",
"HelpCategory"."code" AS "HelpCategory.code",
"HelpCategory"."name" AS "HelpCategory.name",
"User"."id" AS "User.id",
"User"."username" AS "User.username",
"User"."firstname" AS "User.firstname",
"User"."lastname" AS "User.lastname",
"User"."avatar" AS "User.avatar",
"responses"."id" AS "responses.id",
"responses"."accepted" AS "responses.accepted",
"responses"."completed" AS "responses.completed",
"responses->responder"."id" AS "responses.responder.id",
"responses->responder"."username" AS "responses.responder.username",
"responses->responder"."firstname" AS "responses.responder.firstname",
"responses->responder"."lastname" AS "responses.responder.lastname",
"responses->responder"."avatar" AS "responses.responder.avatar"
FROM "Help" AS "Help"
INNER JOIN "HelpTypes" AS "HelpType" ON "Help"."id_type" = "HelpType"."id"
INNER JOIN "HelpCategories" AS "HelpCategory" ON "Help"."id_category" = "HelpCategory"."id"
INNER JOIN "Users" AS "User" ON "Help"."id_creator" = "User"."id"
LEFT OUTER JOIN (
  "HelpResponses" AS "responses"
  INNER JOIN "Users" AS "responses->responder" ON "responses"."id_responder" = "responses->responder"."id"
) ON "Help"."id" = "responses"."id_help"
WHERE "Help"."id" = '3';
