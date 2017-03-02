
players = Player.create([
  {screen_name: "lilVader", first_name: "Luke", last_name:"Skywalker", email: "lskywalker@resistance.org", commissioner_attributes: {password_digest: "password"}},
  {screen_name: "Sith Lord", first_name: "Darth", last_name:"Vader", email: "vader@empire.gov", commissioner_attributes: {password_digest: "password"}},
  {screen_name: "gustavio", first_name: "Gus", last_name:"Nordhielm", email: "gnordhielm@gmail.com", commissioner_attributes: {password_digest: "$2a$10$CETd53yPYQTLzPOejiufXO74bWlS7SkZaZ1hroi/hb8l9E2.qtNaS", designer:true}},
])

leagues = League.create([
  {league_name: "The Resistance", award_name: "The Exhaust Port" },
  {league_name: "The Empire", award_name: "Golden Death Star" },
  {league_name: "Fancy League", award_name: "Golden Curly Brace" }
])

league_commissioners = LeagueCommissioner.create([
  {commissioner_id: 1, league_id: 1},
  {commissioner_id: 2, league_id: 2},
  {commissioner_id: 3, league_id: 3},
])

players = Player.create([
  {screen_name: "general_O", first_name: "Leia", last_name:"Organa", email: "genorgana@resistance.org", ballot_attributes: {league_id: 1, best_picture: "A New Hope", best_actress: "A New Hope", best_actor: "A New Hope"}},
  {screen_name: "falconator", first_name: "Han", last_name:"Solo", email: "hansolo@gmail.com", ballot_attributes: {league_id: 1, best_picture: "Return of the Jedi", best_actress: "Return of the Jedi", best_actor: "Return of the Jedi"}},
  {screen_name: "theEmp", first_name: "Emperor", last_name:"Palpatine", email: "emperor@empire.gov", ballot_attributes: {league_id: 2, best_picture: "The Empire Strikes Back", best_actress: "The Empire Strikes Back", best_actor: "The Empire Strikes Back"}}
])