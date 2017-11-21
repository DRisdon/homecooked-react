# Homecooked
# A meal planning app
 This app allows a user to plan out their meals by choosing recipes and inviting friends.
 Try it [here](http://homecooked.surge.sh)

## Tech
- Ruby on Rails
- React
- Edamam API

## Structure
- 5 tables - users, dinners, invites, attendees, recipes
- A user can be invited by the owner of the event, and then the invited user can accept. When a user accepts an invitation, the database entry for that invitation is deleted, after being copied to the attendee table in the db.
- A user can search for recipes using the edamam API, and save them to a specific event.

## Wireframes
Your meals:
<img width="1027" alt="screen shot 2017-11-14 at 11 33 17 am" src="https://git.generalassemb.ly/storage/user/7633/files/e564c048-c931-11e7-8d63-5c7e8ead901c">
A meal that friends have been invited to:
<img width="1028" alt="screen shot 2017-11-14 at 11 39 29 am" src="https://git.generalassemb.ly/storage/user/7633/files/e85b2d1e-c931-11e7-94ca-d3ac5bae8f86">
A meal with no guests yet:
<img width="1024" alt="screen shot 2017-11-14 at 11 41 17 am" src="https://git.generalassemb.ly/storage/user/7633/files/ea98dc52-c931-11e7-8eac-dcf062ed66f8">
Finding a recipe to add to a meal:
<img width="1027" alt="screen shot 2017-11-14 at 11 44 01 am" src="https://git.generalassemb.ly/storage/user/7633/files/ec8a8e7a-c931-11e7-8e2b-ee496f9151cf">
Viewing a recipe:
<img width="1028" alt="screen shot 2017-11-14 at 11 45 23 am" src="https://git.generalassemb.ly/storage/user/7633/files/ef1efe14-c931-11e7-93e8-67b84f30f43f">
Friends list (reach goal):
<img width="1026" alt="screen shot 2017-11-14 at 11 49 07 am" src="https://git.generalassemb.ly/storage/user/7633/files/f4104252-c931-11e7-8e90-66f4eb4db5d2">
Friend's meal list (reach goal):
<img width="1027" alt="screen shot 2017-11-14 at 11 46 27 am" src="https://git.generalassemb.ly/storage/user/7633/files/f5a24b56-c931-11e7-8e5c-74f70dcbe72d">
