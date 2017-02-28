
players = Player.create([
  {screen_name: "lilVader", first_name: "Luke", last_name:"Skywalker", email: "lskywalker@resistance.org"},
  {screen_name: "general_O", first_name: "Leia", last_name:"Organa", email: "genorgana@resistance.org"},
  {screen_name: "falconator", first_name: "Han", last_name:"Solo", email: "hansolo@gmail.com"},
  {screen_name: "Sith Lord", first_name: "Darth", last_name:"Vader", email: "vader@empire.gov"},
  {screen_name: "theEmp", first_name: "Emperor", last_name:"Palpatine", email: "emperor@empire.gov"}
])

commissioners = Commissioner.create([
  {player_id: Player.find_by(screen_name: 'lilVader').id, password_digest: "password", designer: false},
  {player_id: Player.find_by(screen_name: 'Sith Lord').id, password_digest: "password", designer: false}
])

leagues = League.create([
  {league_name: "The Resistance", award_name: "The Exhaust Port" },
  {league_name: "The Empire", award_name: "Golden Death Star" }
])

league_commissioners = LeagueCommissioner.create([
  {league_id: League.find_by(league_name: 'The Resistance').id, commissioner_id: Commissioner.find_by(player_id: 1).id},
  {league_id: League.find_by(league_name: 'The Empire').id, commissioner_id: Commissioner.find_by(player_id: 4).id},
])

ballots = Ballot.create([
  {player_id: Player.find_by(screen_name: 'lilVader').id, league_id: League.find_by(league_name: 'The Resistance').id, 
    best_picture: "La La Land", best_actress: "Fences", best_actor: "Fences"},
  {player_id: Player.find_by(screen_name: 'general_O').id, league_id: League.find_by(league_name: 'The Resistance').id, 
    best_picture: "Moonlight", best_actress: "Hidden Figures", best_actor: "Fences"},
])