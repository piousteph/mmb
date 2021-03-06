DROP TABLE IF EXISTS mmb_media;
DROP TABLE IF EXISTS mmb_shelf;
DROP TABLE IF EXISTS mmb_user;
DROP TABLE IF EXISTS mmb_profile;

CREATE TABLE mmb_profile (
    profile_id INTEGER NOT NULL AUTO_INCREMENT,
    profile VARCHAR(128) NOT NULL,
    PRIMARY KEY (profile_id)
);

INSERT INTO mmb_profile (profile) VALUES ('Administrateur');
INSERT INTO mmb_profile (profile) VALUES ('Utilisateur');

CREATE TABLE mmb_user (
    user_id INTEGER NOT NULL AUTO_INCREMENT,
    user VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_digest VARCHAR(255) NOT NULL,
    id_profile INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (user_id)
);

INSERT INTO mmb_user (user, email, password_digest, id_profile) VALUES ('Stephane', 'piousteph@gmail.com', '$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW', 1);
INSERT INTO mmb_user (user, email, password_digest, id_profile) VALUES ('Sylvie', 'sylvie.tinseau@gmail.com', '$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW', 2);

CREATE TABLE mmb_shelf (
    shelf_id INTEGER NOT NULL AUTO_INCREMENT,
    shelf VARCHAR(128) NOT NULL,
    icon VARCHAR(32) NOT NULL,
    provider INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    PRIMARY KEY (shelf_id)
);

INSERT INTO mmb_shelf (shelf, icon, provider, id_user) VALUES ('Films', 'eva eva-film', 1, 1);

CREATE TABLE mmb_media (
    media_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    extra VARCHAR(64),
    inferno TINYINT NOT NULL DEFAULT 0,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_lend TIMESTAMP,
    id_shelf INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (media_id)
);

INSERT INTO mmb_media (media_id, name, extra, date_created) VALUES
(3, 'Shanghaï Kid', 'Jackie Chan, Owen Wilson, Lucy Liu, Xander Berkeley', '2015-08-07 00:00:00'),
(4, 'Le Flic de Beverly Hills III', 'Eddie Murphy, John Saxon, Hector Elizondo, Theresa Randle', '0000-00-00 00:00:00'),
(5, 'Police Academy 2, Au boulot !', 'Steve Guttenberg, Bubba Smith, David Graf, Michael Winslow', '0000-00-00 00:00:00'),
(6, 'Twister - Édition Simple', 'Helen Hunt, Bill Paxton, Philip Seymour Hoffman, Todd Field', '0000-00-00 00:00:00'),
(8, 'Monopoly Junior', '', '0000-00-00 00:00:00'),
(10, 'Kung Pow, Enter The Fist', 'Steve Oedekerk, Fei Lung, Léo Lee, Ling Ling Tse', '0000-00-00 00:00:00'),
(11, 'Michael Jackson : Number Ones', 'Michael Jackson', '0000-00-00 00:00:00'),
(12, 'Le Peuple migrateur', '', '0000-00-00 00:00:00'),
(13, 'Karate Kid', 'Ralph Macchio,, al.', '0000-00-00 00:00:00'),
(14, 'Karate kid 2', 'Raplh Macchio,, al.', '0000-00-00 00:00:00'),
(15, 'Karate Kid 3 - La Sfida Finale', 'Ralph Macchio, Pat Morita, Martin Kove', '0000-00-00 00:00:00'),
(16, 'Les Dieux sont tombés sur la tête', 'Marius Weyers, Sandra Prinsloo, Xao, Nic de Jager', '0000-00-00 00:00:00'),
(17, 'Les dieux sont encore tombes sur la tete', '', '0000-00-00 00:00:00'),
(19, 'Le Flic de Beverly Hills - Édition Collector', 'Eddie Murphy, Judge Reinhold, John Ashton, Paul Reiser', '0000-00-00 00:00:00'),
(20, 'Tomb Raider - Édition Spéciale Collector', 'Angelina Jolie, Iain Glen, Daniel Craig, Jon Voight', '0000-00-00 00:00:00'),
(21, 'Tomb Raider 2, Le Berceau de la vie - Édition Collector', 'Angelina Jolie, Chris Barrie, Djimon Hounsou, Noah Taylor', '0000-00-00 00:00:00'),
(22, 'Toys', 'Robin Williams, Michael Gambon, Joan Cusack, Robin Wright Penn', '0000-00-00 00:00:00'),
(23, 'Ocean\'s Eleven', 'George Clooney, Brad Pitt, Julia Roberts, Matt Damon', '0000-00-00 00:00:00'),
(24, 'Top Gun', 'Tom Cruise, Tom Skerritt, Kelly Mcgillis, Val Kilmer', '0000-00-00 00:00:00'),
(25, 'Hero', 'Jet Li, Maggie Cheung, Ziyi Zhang, Tony Leung', '0000-00-00 00:00:00'),
(26, 'Coffret Alien', 'Sigourney Weaver, Tom Skerritt, John Hurt, Michael Biehn', '0000-00-00 00:00:00'),
(30, 'A la poursuite d\'Octobre Rouge', ' Alec Baldwin  Sean Connery  Scott Glenn  Sam Neill', '0000-00-00 00:00:00'),
(31, 'La Soupe aux choux', 'Jean Carmet, Louis de Funès, Jacques Villeret, Marco Perrin', '0000-00-00 00:00:00'),
(32, 'A la poursuite du diamant vert', '', '0000-00-00 00:00:00'),
(36, 'Rasta rocket', 'John Candy, E Doug Doug, Leon, Rawle d Lewis', '0000-00-00 00:00:00'),
(37, 'Rambo II (la mission)', 'Sylvester Stallone,, al.', '0000-00-00 00:00:00'),
(38, 'Rambo III', 'Sylvester Stallone,, al.', '0000-00-00 00:00:00'),
(39, 'Le Flic de Beverly Hills II', 'Eddie Murphy, Judge Reinhold, Jurgen Prochnow, Ronny Cox', '0000-00-00 00:00:00'),
(40, 'Le Grand Bleu - Version Longue', 'Jean-Marc Barr, Jean Reno, Rosanna Arquette, Jean Bouise', '0000-00-00 00:00:00'),
(41, 'The Score', 'Robert de Niro, Edward Norton, Marlon Brando, Angela Bassett', '0000-00-00 00:00:00'),
(42, 'Spy Kids, les apprentis espions', 'Antonio Banderas, Carla Gugino, Teri Hatcher, Cheech Marin', '0000-00-00 00:00:00'),
(43, 'Spy Kids 2, espions en herbe', 'Antonio Banderas, Carla Gugino, Alexa Vega, Daryl Sabara', '0000-00-00 00:00:00'),
(44, 'Stargate, la porte des étoiles', '', '0000-00-00 00:00:00'),
(46, 'L\'Affaire Pélican', 'Julia Roberts, Denzel Washington, Sam Shepard, John Heard', '0000-00-00 00:00:00'),
(47, 'Super Noël 3 : Super Noël méga givré', 'Tim Allen, Martin Short, Elizabeth Mitchell', '0000-00-00 00:00:00'),
(48, 'Hyper Noël', 'Tim Allen, Spencer Breslin, Elizabeth Mitchell, David Krumholtz', '0000-00-00 00:00:00'),
(49, 'Les Goonies', 'Sean Sastin, Josh Brolin, Corey Feldman', '0000-00-00 00:00:00'),
(51, 'Le pic de dante', 'Pierce Brosnan, Linda Hamilton, Jamie Renee Smith, Jeremy Foley', '0000-00-00 00:00:00'),
(1024, 'Minority Report - Special Edition', 'Tom Cruise, Max Von Sydow, Colin Farrell, Samantha Morton', '0000-00-00 00:00:00'),
(53, 'Les Sept mercenaires - Édition Collector', 'Yul Brynner, Eli Wallach, Steve Mcqueen, James Coburn', '0000-00-00 00:00:00'),
(55, 'Une bouteille à la mer', 'Kevin Costner, Robin Wright Penn, Paul Newman, John Savage', '0000-00-00 00:00:00'),
(56, 'Le Jour le plus long - Édition Collector 2 DVD', 'Curd Jürgens, John Wayne, Richard Burton, Robert Mitchum', '0000-00-00 00:00:00'),
(1009, 'Avatar [Blu-ray]', 'Sam Worthington, Zoe Saldana, Sigourney Weaver', '0000-00-00 00:00:00'),
(60, 'Le Père Noel Est Une Ordure', 'Christian Clavier, Thierry Lhermitte, Gérard Jugnot', '0000-00-00 00:00:00'),
(62, 'Coffret Splendid 3 DVD : Les Bronzés / Les Bronzés font du ski / Le Père Noël est une ordure', 'Anémone, Christian Clavier, Josiane Balasko, Marie-Anne Chazel', '0000-00-00 00:00:00'),
(67, 'Benjamin Gates et le trésor des Templiers', '', '0000-00-00 00:00:00'),
(1035, 'Florence Foresti fait des sketches à la Cigale', 'Florence Foresti', '0000-00-00 00:00:00'),
(69, 'Kill Bill Vol. 1 et 2 - Coffret 2 DVD', 'Uma Thurman', '0000-00-00 00:00:00'),
(70, 'Kill Bill - Vol.2', 'Uma Thurman, Gordon Liu, David Carradine, Michael Madsen', '0000-00-00 00:00:00'),
(71, 'La Marche de l\'Empereur', 'Romane Bohringer, Charles Berling, Jules Sitruk', '0000-00-00 00:00:00'),
(72, 'Le Pôle Express', 'Tom Hanks, Leslie Harter Zemeckis, Eddie Deezen, Nona Gaye', '0000-00-00 00:00:00'),
(73, 'Contact', '', '0000-00-00 00:00:00'),
(74, 'Bandidas', 'Salma Hayek, Penelope Cruz, Steve Zahn, Dwight Yoakam', '0000-00-00 00:00:00'),
(75, 'Charlie et la chocolaterie', 'Johnny Depp, Freddie Highmore, Annasophia Robb, Julia Winter', '0000-00-00 00:00:00'),
(76, 'L\'Ecole Fantastique', 'Michael Angarano, Kurt Russell, Kelly Preston', '0000-00-00 00:00:00'),
(77, 'Apocalypse Snow', 'Didier Lafond, Régis Roland', '0000-00-00 00:00:00'),
(85, 'TRON', 'Jeff Bridges, Bruce Boxleitner, David Warner, Cindy Morgan', '0000-00-00 00:00:00'),
(127, 'Men in Black - Édition Collector', 'Will Smith, Tommy Lee Jones, Vincent D\'Onofrio, Linda Fiorentino', '0000-00-00 00:00:00'),
(128, 'Il était une fois dans l\'Ouest (Édition simple)', 'Charles Bronson, Henry Fonda, Claudia Cardinale, Jason Robards', '0000-00-00 00:00:00'),
(1023, 'Prince of Persia [Blu-ray]', 'Jake Gyllenhaal, Gemma Arteton, Ben Kingsley', '0000-00-00 00:00:00'),
(130, 'Pirates des Caraïbes', 'Johnny Depp, Geoffrey Rush, Orlando Bloom, Keira Knightley', '0000-00-00 00:00:00'),
(131, 'Police Academy', 'Steve Guttenberg, Kim Cattrall, George Gaines', '0000-00-00 00:00:00'),
(132, 'Maverick', 'Mel Gibson, Jodie Foster, James Garner, Alfred Molina', '0000-00-00 00:00:00'),
(133, 'La Leçon de piano', 'Holly Hunter, Harvey Keitel, Sam Neill, Anna Paquin', '0000-00-00 00:00:00'),
(134, 'Le Dernier samaritain', 'Bruce Willis, Damon Wayans, Chelsea Field, Noble Willingham', '0000-00-00 00:00:00'),
(135, 'Cyrano de Bergerac', 'Gérard Depardieu, Anne Brochet, Vincent Perez, Jacques Weber', '0000-00-00 00:00:00'),
(182, 'Good Morning Vietnam', 'Robin Williams, Forest Whitaker, Bruno Kirby', '0000-00-00 00:00:00'),
(1017, 'Memoires d\'une Geisha', 'Zhang Ziyi, Gong Li, Michelle Yeoh', '0000-00-00 00:00:00'),
(1037, 'Wild Wild West', 'Will Smith, Kevin Kline, Kenneth Branagh, Salma Hayek', '0000-00-00 00:00:00'),
(1036, 'Désaccord parfait', 'Jean Rochefort, Charlotte Rampling, Isabelle Nanty, Ian Richardson', '0000-00-00 00:00:00'),
(191, 'Indiana Jones : La Trilogie - Coffret 4 DVD', 'Harrison Ford, Karen Allen, Kate Capshaw, Sean Connery', '0000-00-00 00:00:00'),
(457, 'Angles d\'attaque', 'Dennis Quaid, Forrest Whitaker, Matthew Fox', '0000-00-00 00:00:00'),
(439, 'DOA - Dead Or Alive', 'Sarah Carter, Holly Valance, Jaime Pressly', '0000-00-00 00:00:00'),
(442, 'Flubber [Import anglais]', 'Robin Williams, Marcia Gay Harden, Christopher McDonald', '0000-00-00 00:00:00'),
(443, 'Harry Potter et l\'Ordre du Phénix', 'Daniel Radcliffe, Rupert Grint, Emma Watson', '0000-00-00 00:00:00'),
(444, 'Spider-man 3', 'Tobey Maguire, Kirsten Dunst, James Franco', '0000-00-00 00:00:00'),
(219, 'Léon', 'Jean Reno, Gary Oldman, Nathalie Portman, Danny Aiello', '0000-00-00 00:00:00'),
(221, 'Le Journal de Bridget Jones', 'Renee Zellweger, Hugh Grant, Colin Firth, Jim Broadbent', '0000-00-00 00:00:00'),
(222, 'Ce que veulent les femmes', '', '0000-00-00 00:00:00'),
(223, 'Hypnose', 'Kevin Bacon, Kevin Dunn, Illeana Douglas, Kathryn Erbe', '0000-00-00 00:00:00'),
(227, 'Le Gendarme et les extra-terrestres', 'Funes Louis De,, al.', '0000-00-00 00:00:00'),
(228, 'Le Gendarme de Saint-Tropez', 'Louis de Funes, Michel Galabru, Genevieve Grad, Christian Marin', '0000-00-00 00:00:00'),
(229, 'Le Gendarme et les gendarmettes', 'Funes Louis De,, al.', '0000-00-00 00:00:00'),
(230, 'Le Gendarme à New-York', 'Louis de Funes, Michel Galabru, Christian Marin, Guy Grosso', '0000-00-00 00:00:00'),
(231, 'Le Gendarme en balade', 'Funes Louis De, Yves Vincent, Christian Marin, Claude Gensac', '0000-00-00 00:00:00'),
(232, 'Le Gendarme se marie', 'Louis de Funes, Claude Gensac, Michel Galabru, Genevieve Grad', '0000-00-00 00:00:00'),
(233, 'Fantômas se déchaîne', 'Funes Louis De', '0000-00-00 00:00:00'),
(234, 'Fantômas contre Scotland Yard', 'Jean Marais, Louis de Funes, Mylene Demongeot, Jacques Dynam', '0000-00-00 00:00:00'),
(235, 'Fantômas', 'Jean Marais, Louis de Funes, Mylene Demongeot, Jacques Dynam', '0000-00-00 00:00:00'),
(236, 'La Grande Vadrouille (Édition simple)', 'Bourvil, Louis de Funes, Claudio Brook, Mike Marshall', '0000-00-00 00:00:00'),
(237, 'Stalingrad - Édition Collector 2 DVD', 'Jude Law, Rachel Weisz, Joseph Fiennes, Bob Hoskins', '0000-00-00 00:00:00'),
(238, 'Astérix & Obélix : Mission Cléopâtre', 'Gérard Depardieu, Christian Clavier, Jamel Debbouze, Alain Chabat', '0000-00-00 00:00:00'),
(242, 'Le Cinquième élément', 'Bruce Willis, Gary Oldman, Ian Holm, Milla Jovovich', '0000-00-00 00:00:00'),
(243, 'Le 13ème Guerrier - Édition Prestige', 'Antonio Banderas, Dennis Storhoi, Vladimir Kulich, Diane Venora', '0000-00-00 00:00:00'),
(247, 'Tigre et dragon', 'Chang Chen, Zhang Ziyi, Michelle Yeoh', '0000-00-00 00:00:00'),
(248, 'James Bond, Meurs un autre jour', 'Pierce Brosnan, Halle Berry, Toby Stephens, Rosamund Pike', '0000-00-00 00:00:00'),
(253, 'Magdane show', 'Roland Magdane', '0000-00-00 00:00:00'),
(258, 'Le Monde de Narnia, Chapitre I : Le lion, la sorcière blanche et l\'armoire magique', 'Georgie Henley, Skandar Keynes, Anna Popplewell, William Moseley', '0000-00-00 00:00:00'),
(260, 'Mon nom est Personne', 'Tonino Valerii,, al.', '0000-00-00 00:00:00'),
(262, 'Salut l\'ami, adieu le trésor', 'Terence Hill, Bud Spencer, Sal Borgese, Tom Tully', '0000-00-00 00:00:00'),
(264, 'On l\'appelle Trinita', 'Terence Hill, Bud Spencer, Farley Granger', '0000-00-00 00:00:00'),
(265, 'Maintenant on l\'appelle plata', 'Terence Hill, Bud Spencer, Reinhard Kolldehoff', '0000-00-00 00:00:00'),
(266, 'On continue à l\'appeler Trinita', 'Terence Hill, Bud Spencer, Yanti Sommer', '0000-00-00 00:00:00'),
(270, 'K-19 : Le Piège des profondeurs', 'Harrison Ford, Liam Neeson, Peter Sarsgaard, Joss Ackland', '0000-00-00 00:00:00'),
(271, 'U-571', 'Matthew McConaughey, Bill Paxton, Harvey Keitel, Jon Bon Jovi', '0000-00-00 00:00:00'),
(273, 'Golden Child, l\'enfant sacré du Tibet', 'Eddie Murphy, Charles Dance, Charlotte Lewis', '0000-00-00 00:00:00'),
(275, 'Pirates des Caraïbes, le secret du coffre maudit', 'Jack Davenport, Keira Knightley, Orlando Bloom', '0000-00-00 00:00:00'),
(276, 'Rocky, L\'intégrale - Coffret 5 DVD', 'Sylvester Stallone', '0000-00-00 00:00:00'),
(281, 'Monster House - Edition Collector 2 DVD', 'Mitchel Musso, Sam Lerner, Spencer Locke, Steve Buscemi', '0000-00-00 00:00:00'),
(282, 'L\'Enfer du devoir', 'Samuel L. Jackson, Guy Pearce, Tommy Lee Jones, Bruce Greenwood', '0000-00-00 00:00:00'),
(1038, 'L\'Agence Tous Risques', '', '0000-00-00 00:00:00'),
(285, 'Mr et Mrs Smith - [Blu-ray]', 'Brad Pitt, Angelina Jolie, Vince Vaughn', '0000-00-00 00:00:00'),
(287, 'The Extremist', '', '0000-00-00 00:00:00'),
(289, 'Un jour sans fin', 'Bill Murray, Andie MacDowell, Stephen Tobolowsky', '0000-00-00 00:00:00'),
(293, 'Casino Royale', '', '0000-00-00 00:00:00'),
(294, 'Sister Act - Édition Spéciale', 'Whoopi Goldberg, Maggie Smith, Kathy Najimy, Wendy Makkena', '0000-00-00 00:00:00'),
(295, 'Sister Act 2', 'Whoopi Goldberg, Kathy Najimy, Barnard Hughes, James Coburn', '0000-00-00 00:00:00'),
(296, 'Jumpin\'Jack Flash', 'Whoopi Goldberg, Stephen Collins, John Wood, Carol Kane', '0000-00-00 00:00:00'),
(297, 'James Bond, Goldfinger', 'Sean Connery, Gert Frobe, Honor Blackman, Shirley Eaton', '0000-00-00 00:00:00'),
(298, 'James Bond, Dangereusement Vôtre', '', '0000-00-00 00:00:00'),
(299, 'James Bond contre Docteur No', '', '0000-00-00 00:00:00'),
(300, 'James Bond, Les diamants sont éternels', 'Sean Connery, Jill St. John, Charles Gray, Bruce Glover', '0000-00-00 00:00:00'),
(301, 'James Bond, Octopussy', 'Roger Moore, Louis Jourdan, Maud Adams, Kristina Wayborn', '0000-00-00 00:00:00'),
(302, 'James Bond, On ne vit que deux fois', 'Sean Connery, Akiko Wakabayashi, Tetsuro Tamba, Mie Hama', '0000-00-00 00:00:00'),
(303, 'James Bond, Tuer n\'est pas jouer', 'Timothy Dalton, Maryam D\'Abo, Jeroen Krabbe, John Rhys-Davies', '0000-00-00 00:00:00'),
(304, 'James Bond, L\'Homme au pistolet d\'or', 'Roger Moore, Christopher Lee, Britt Ekland, Maud Adams', '0000-00-00 00:00:00'),
(305, 'James Bond, Permis de tuer', 'Timothy Dalton, Anthony Zerbe, Carey Lowell, Robert Davi', '0000-00-00 00:00:00'),
(306, 'James Bond, Moonraker', 'Roger Moore, Lois Chiles, Michael Lonsdale, Richard Kiel', '0000-00-00 00:00:00'),
(307, 'James Bond, Au service secret de sa Majesté', 'George Lazenby, Diana Rigg, Telly Savalas, Gabriele Ferzetti', '0000-00-00 00:00:00'),
(440, 'Transformers', 'Megan Fox, Shia Labeouf, Josh Duhamel', '0000-00-00 00:00:00'),
(308, 'Cléopâtre', 'Billy Zane, Timothy Dalton, Rupert Graves', '0000-00-00 00:00:00'),
(309, 'James Bond, Opération tonnerre', 'Sean Connery, Bernard Lee, Claudine Auger, Adolfo Celi', '0000-00-00 00:00:00'),
(310, 'James Bond, Vivre et laisser mourir', 'Roger Moore, Yaphet Kotto, Jane Seymour', '0000-00-00 00:00:00'),
(311, 'James Bond, Bons baisers de Russie', 'Sean Connery, Pedro Armendariz, Daniela Banchi, Lotte Lenya', '0000-00-00 00:00:00'),
(312, 'James Bond, Rien que pour vos yeux', '', '0000-00-00 00:00:00'),
(313, 'James Bond, L\'Espion qui m\'aimait', 'Roger Moore, Curd Jurgens, Barbara Bach, Richard Kiel', '0000-00-00 00:00:00'),
(314, 'USS Alabama - Édition Spéciale', 'Gene Hackman, Denzel Washington, George Dzundza, Viggo Mortensen', '0000-00-00 00:00:00'),
(316, 'La Nuit au musée [Blu-ray]', 'Ben Stiller, Carla Gugino, Dyke Dick Van', '0000-00-00 00:00:00'),
(321, 'Pirates des Caraibes 3: Jusqu\'au bout du monde', 'Johnny Depp, Orlando Bloom, Keira Knightley', '0000-00-00 00:00:00'),
(323, 'Rain Man - Édition Collector', 'Dustin Hoffman, Tom Cruise, Valeria Golino, Jerry Molen', '0000-00-00 00:00:00'),
(324, 'Ghost', 'Patrick Swayze, Demi Moore, Whoopi Goldberg, Tony Goldwyn', '0000-00-00 00:00:00'),
(325, 'Le Règne du feu - Édition Spéciale', 'Christian Bale, Matthew Mcconaughey, Izabella Scorupco', '0000-00-00 00:00:00'),
(326, 'James Bond, Demain ne meurt jamais', 'Pierce Brosnan, Jonathan Pryce, Michelle Yeoh, Teri Hatcher', '0000-00-00 00:00:00'),
(327, 'James Bond, Goldeneye', 'Pierce Brosnan, Sean Bean, Izabella Scorupco, Famke Janssen', '0000-00-00 00:00:00'),
(328, 'James Bond, Casino Royale [Blu-ray]', 'Daniel Craig, Eva Green, Mads Mikkelsen, Judi Dench', '0000-00-00 00:00:00'),
(329, 'James Bond, Le Monde ne suffit pas', 'Pierce Brosnan, Sophie Marceau, Denise Richards, Robert Carlyle', '0000-00-00 00:00:00'),
(381, 'Le petit monde de Don Camillo', 'Fernandel,, al.', '0000-00-00 00:00:00'),
(337, 'Cyber traque', 'Skeet Ulrich, Tom Berenger, Russell Wong', '0000-00-00 00:00:00'),
(338, 'Sixième sens - Édition Spéciale', 'Bruce Willis, Haley Joel Osment, Toni Collette, Olivia Williams', '0000-00-00 00:00:00'),
(339, 'Robin des Bois, prince des voleurs', 'Kevin Costner, Morgan Freeman, Alan Rickman, Mary Elizabeth Mastrantonio', '0000-00-00 00:00:00'),
(354, 'Rambo', 'Sylvester Stallone, Richard Crenna, Brian Dennehy', '0000-00-00 00:00:00'),
(358, 'Le Bonheur est dans le pré', 'Michel Serrault, Eddy Mitchell, Sabine Azema, Gérard Morel', '0000-00-00 00:00:00'),
(458, 'Le Jour d\'après - Édition Collector 2 DVD', 'Dennis Quaid, Jake Gyllenhaal, Ian Holm, Emmy Rossum', '0000-00-00 00:00:00'),
(360, 'Volcano', 'Tommy Lee Jones, Anne Heche, Gaby Hoffmann, Don Cheadle', '0000-00-00 00:00:00'),
(371, 'Abyss (Extended Version)', 'Ed Harris, Mary Elizabeth Mastrantonio, Michael Biehn, Leo Burmeister', '0000-00-00 00:00:00'),
(459, 'Fusion, The Core', 'Aaron Eckhart, Hilary Swank, Tcheky Karyo, DJ Qualls', '0000-00-00 00:00:00'),
(460, 'A la croisée des mondes : La boussole d\'or - \" \'Edition collector\' \"', 'Nicole Kidman, Daniel Craig, Dakota Blue Richards', '0000-00-00 00:00:00'),
(452, 'Benjamin Gates 2 : Le livre des secrets [Blu-ray]', 'Nicolas Cage, Diane Kruger, Jon Voight', '0000-00-00 00:00:00'),
(378, 'Retour vers le futur', 'Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover', '0000-00-00 00:00:00'),
(379, 'Retour vers le futur 2', 'Michael J. Fox, Christopher Lloyd, Lea Thompson, Thomas F. Wilson', '0000-00-00 00:00:00'),
(380, 'Retour vers le futur III', 'Michael J Fox, Christopher Lloyd, Crispin Glover', '0000-00-00 00:00:00'),
(382, 'Le retour de Don Camillo', 'Fernandel,, al.', '0000-00-00 00:00:00'),
(383, 'Don Camillo Monseigneur', 'Fernandel, Gino Cervi, Gina Rovere, Leda Gloria', '0000-00-00 00:00:00'),
(384, 'La Grande bagarre de Don Camillo', 'Fernandel, Gino Cervi, Claude Sylvain, Gaston Rey', '0000-00-00 00:00:00'),
(385, 'Don Camillo en Russie', 'Fernandel, Gino Cervi, Graziella Granata, Gianni Garko', '0000-00-00 00:00:00'),
(386, 'Don Camillo contestatère', '', '0000-00-00 00:00:00'),
(391, 'Gomez & Tavarès', 'Stomy Bugsy, Titoff, Jean Yanne, Elodie Navarre', '0000-00-00 00:00:00'),
(420, 'Piège de cristal (Édition simple)', 'Bruce Willis, Alan Rickman, Alexander Godunov, Bonnie Bedelia', '0000-00-00 00:00:00'),
(421, '58 minutes pour vivre', 'Bruce Willis, Bonnie Bedelia, Franco Nero, William Atherton', '0000-00-00 00:00:00'),
(422, 'Une Journée en enfer', 'Bruce Willis, Jeremy Irons, Samuel l. Jackson, Graham Greene', '0000-00-00 00:00:00'),
(423, 'Die hard 4 - retour en enfer', 'Bruce Willis, Justin Long, Timothy Olyphant', '0000-00-00 00:00:00'),
(431, 'Les Aventures de Rabbi Jacob', 'Louis de Funes, Claude Giraud, Suzy Delair, Marcel Dalio', '0000-00-00 00:00:00'),
(747, 'E.T. l\'extra-terrestre', 'Dee Wallace, Henry Thomas, Peter Coyote, Robert MacNaughton', '0000-00-00 00:00:00'),
(748, 'Ghost Rider [Blu-ray]', '', '0000-00-00 00:00:00'),
(750, 'Indiana Jones et le royaume du crâne de cristal  - Edition simple', 'Harrison Ford, Cate Blanchett, Karen Allen', '0000-00-00 00:00:00'),
(751, 'Le Dragon des mers, la dernière légende [Blu-ray]', 'Emily Watson, Ben Chaplin, Alex Etel', '0000-00-00 00:00:00'),
(752, 'Le monde de Narnia, chapitre 2 : Le prince Caspian', 'Georgie Henley, Skandar Keynes, Anna Popplewell', '0000-00-00 00:00:00'),
(753, 'Les Chroniques de Spiderwick', 'Freddie Highmore, Sarah Bolger, Mary-Louise Parker', '0000-00-00 00:00:00'),
(756, 'Rock - Édition Spéciale', 'Nicolas Cage, Sean Connery, ed Harris, John C. Mcginley', '0000-00-00 00:00:00'),
(757, 'Un jour sur Terre [Blu-ray]', '', '0000-00-00 00:00:00'),
(1026, 'Le Merveilleux Magasin de Mr Magorium', 'Natalie Portman, Dustin Hoffman, Jason Bateman', '0000-00-00 00:00:00'),
(1025, 'Le fabuleux destin d\'Amélie Poulain', 'Audrey Tautou, Mathieu Kassovitz, Rufus', '0000-00-00 00:00:00'),
(1018, 'Percy Jackson, le voleur de foudre - Combo Blu-ray   DVD [Blu-ray]', '', '0000-00-00 00:00:00'),
(881, 'James Bond : Quantum of Solace [Blu-ray]', 'Mathieu Amalric, Daniel Craig, Olga Kurylenko', '0000-00-00 00:00:00'),
(882, 'Batman - The Dark Knight, Le Chevalier Noir [Blu-ray]', 'Christian Bale, Heath Ledger, Aaron Eckhart', '0000-00-00 00:00:00'),
(969, 'Home', 'Jacques Gamblin, Yann Arthus-Bertrand, Salma Hayek', '0000-00-00 00:00:00'),
(966, 'Beethoven', 'Charles Grodin, Bonnie Hunt, Oliver Platt, Dean Jones', '0000-00-00 00:00:00'),
(970, 'Twilight - chapitre 1 : Fascination - Edition simple', 'Kristen Stewart, Robert Pattinson, Billy Burke', '0000-00-00 00:00:00'),
(971, 'De l\'autre côté du lit', 'Sophie Marceau, Dany Boon, Roland Giraud', '0000-00-00 00:00:00'),
(972, 'Histoires enchantées', 'Adam Sandler, Keri Russell, Guy Pearce', '0000-00-00 00:00:00'),
(985, 'Le Royaume de Ga\'Hoole - La légende des gardiens [Blu-ray]', 'Emily Barclay, Abbie Cornish, Essie Davis', '0000-00-00 00:00:00'),
(988, 'L\'Apprenti sorcier', 'Nicolas Cage, Jay Baruchel, Teresa Palmer', '0000-00-00 00:00:00'),
(989, 'Je suis une légende', 'Alice Braga, Will Smith, Dash Mihok', '0000-00-00 00:00:00'),
(990, 'Deux frères - Combo Blu-ray   DVD [Blu-ray]', 'Guy Pearce, Jean-Claude Dreyfus, Philippine Leroy-Beaulieu', '0000-00-00 00:00:00'),
(992, 'Le Petit Nicolas', 'Maxime Godart, Valerie Lemercier, Kad Merad', '0000-00-00 00:00:00'),
(993, '2012 - Edition limitée Boitier métal [Blu-ray]', ' John Cusack  Amanda Peet  Chiwetel Ejiofor', '0000-00-00 00:00:00'),
(997, 'Twilight - chapitre 2 : Tentation - Edition simple', 'Kristen Stewart, Taylor Lautner, Robert Pattinson', '0000-00-00 00:00:00'),
(998, 'Et  L\'Homme Créa La Femme', 'Matthew Broderick,, al.', '0000-00-00 00:00:00'),
(999, 'Quand Harry rencontre Sally', 'Billy Crystal, Meg Ryan, Carrie Fisher, Bruno Kirby', '0000-00-00 00:00:00'),
(1006, 'Le Transporteur 2', 'Jason Statham, Amber Valletta, Alessandro Gassman, Kate Nauta', '0000-00-00 00:00:00'),
(1007, 'Le Purificateur', 'Heath Ledger, Shannyn Sossamon, Mark Addy, Benno Furmann', '0000-00-00 00:00:00'),
(1046, 'Transformers 2 - La revanche', 'Shia Labeouf, Megan Fox, Josh Duhamel', '0000-00-00 00:00:00'),
(1047, 'Moi, Arthur, 12 ans, chasseur de dragons', 'Lea Thompson, Wendie Malick, Amy Pietz', '0000-00-00 00:00:00'),
(1048, 'Le dernier maître de l\'air - Combo Blu-ray   DVD [Blu-ray]', 'Noah Ringer, Dev Patel, Nicola Peltz', '0000-00-00 00:00:00'),
(1049, 'Traque sur internet', 'Sandra Bullock, Jeremy Northam, Denis Miller, Diane Baker', '0000-00-00 00:00:00'),
(1056, 'Night and Day', 'Tom Cruise, Cameron Diaz, Peter Sarsgaard', '0000-00-00 00:00:00'),
(1057, 'Jonah Hex', 'Josh Brolin, John Malkovitch, Megan Fox', '0000-00-00 00:00:00'),
(1060, 'Karate Kid', 'Jaden Smith, Jackie Chan, Taraji P. Henson', '0000-00-00 00:00:00'),
(1068, 'Sherlock Holmes [Blu-ray]', 'Jr Robert Downey, Jude Law, Rachel Mcadams', '0000-00-00 00:00:00'),
(1123, 'Arthur et les Minimoys [Blu-ray]', 'Freddie Highmore, Mylene Farmer, Mia Farrow', '0000-00-00 00:00:00'),
(1124, 'Apollo 13', 'Tom Hanks, Kevin Bacon, Bill Paxton, Gary Sinise', '0000-00-00 00:00:00'),
(1125, 'Rien à déclarer - Combo Blu-ray   DVD [Blu-ray]', 'Benoît Poelvoorde, Dany Boon, Karin Viard, Zinedine Soualem', '0000-00-00 00:00:00'),
(1126, 'Moi Moche et Méchant - Combo Blu-ray   DVD [Blu-ray]', '', '0000-00-00 00:00:00'),
(1141, 'Le Manoir hanté et les 999 fantômes', 'Eddie Murphy, Jennifer Tilly, Terence Stamp, Marsha Thomason', '0000-00-00 00:00:00'),
(1149, 'Independence Day', 'Will Smith, Bill Pullman, Jeff Goldblum, Mary Mcdonnell', '0000-00-00 00:00:00'),
(1159, 'Men in Black II', 'Tommy Lee Jones, Patrick Warburton, Tony Shalhoub', '0000-00-00 00:00:00'),
(1165, 'Le Monde de Narnia 3 : L\'Odyssée du Passeur d\'Aurore', 'Georgie Henley, Skandar Keynes, Ben Barnes', '0000-00-00 00:00:00'),
(1749, 'Le Médaillon', 'Jackie Chan, Claire Forlani, Julian Sands, John Rhys-Davies', '0000-00-00 00:00:00'),
(1750, 'Seize the day', '', '0000-00-00 00:00:00'),
(1751, 'Bienvenue chez les Ch\'tis', '', '0000-00-00 00:00:00'),
(1907, 'Le Transporteur', 'Jason Statham, Shu Qi, Matt Schulze, François Berleand', '0000-00-00 00:00:00'),
(1912, 'Le Cercle 2', 'Naomi Watts, Simon Baker, David Dorfman, Elizabeth Perkins', '0000-00-00 00:00:00'),
(1913, 'Le Cercle - Edition Collector', 'Naomi Watts, Brian Cox, Martin Henderson, David Dorfman', '0000-00-00 00:00:00'),
(1943, 'Pirates des Caraïbes : la fontaine de jouvence [Blu-ray]', 'Johnny Depp, Penélope Cruz, Geoffrey Rush, Keith Richards', '0000-00-00 00:00:00'),
(1944, 'Star Wars - L\'intégrale de la saga - Coffret Collector 9 Blu-ray [Blu-ray]', 'Harrison Ford, Mark Hamill, Liam Neeson', '0000-00-00 00:00:00'),
(1946, 'Arrietty, le petit monde des chapardeurs', '', '0000-00-00 00:00:00'),
(1947, 'Angel-A', 'Jamel Debbouze, Rie Rasmussen, Gilbert Melki, Serge Riaboukine', '0000-00-00 00:00:00'),
(1951, 'Super Noël', 'Peter Boyle, Wendy Crewson, Judge Reinhold, Tim Allen', '0000-00-00 00:00:00'),
(1952, 'Il était une fois', 'Amy Adams, Patrick Dempsey, James Marsden', '0000-00-00 00:00:00'),
(1969, 'Coffret Trilogie Le Seigneur des Anneaux - Intégrale Versions longues - 15 disques  - Edition spéciale limitée 2011 [Blu-ray]', 'Viggo Mortensen, Elijah Wood, Liv Tyler', '0000-00-00 00:00:00'),
(2151, 'The Matrix Trilogy (The Matrix, Matrix Revolutions, Matrix Reloaded) [Blu-ray] [Import anglais]', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, Gloria Foster', '2012-11-02 00:00:00'),
(2152, 'Coffret Trilogie Le Seigneur des Anneaux - Intégrale Versions longues', 'Viggo Mortensen, Elijah Wood, Liv Tyler', '2016-04-03 09:38:59');