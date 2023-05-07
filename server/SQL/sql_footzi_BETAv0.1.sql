#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: football_pitch
#------------------------------------------------------------

CREATE TABLE football_pitch(
        id   Int  Auto_increment  NOT NULL ,
        name Varchar (255) NOT NULL
	,CONSTRAINT football_pitch_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: category
#------------------------------------------------------------

CREATE TABLE category(
        id   Int  Auto_increment  NOT NULL ,
        name Varchar (255) NOT NULL
	,CONSTRAINT category_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        id                   Int  Auto_increment  NOT NULL ,
        firstname            Varchar (255) NOT NULL ,
        lastname             Varchar (255) NOT NULL ,
        phone_number         Varchar (50) NOT NULL ,
        email                Varchar (255) NOT NULL ,
        password             Varchar (255) NOT NULL ,
        ROLE                 Longtext NOT NULL ,
        is_valid_email       Bool NOT NULL ,
        token_reset_password Varchar (255) ,
        token_valid_email    Varchar (255) ,
        token_time_validity  Datetime ,
        createdAt            Datetime NOT NULL ,
        updateAt             Datetime NOT NULL ,
        id_category          Int
	,CONSTRAINT user_PK PRIMARY KEY (id)

	,CONSTRAINT user_category_FK FOREIGN KEY (id_category) REFERENCES category(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: team_opposing
#------------------------------------------------------------

CREATE TABLE team_opposing(
        id  Int  Auto_increment  NOT NULL ,
        nom Varchar (255) NOT NULL
	,CONSTRAINT team_opposing_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: soccer_training
#------------------------------------------------------------

CREATE TABLE soccer_training(
        id                Int  Auto_increment  NOT NULL ,
        day               Varchar (50) NOT NULL ,
        hour_start        Varchar (50) NOT NULL ,
        id_football_pitch Int NOT NULL ,
        id_category       Int NOT NULL
	,CONSTRAINT soccer_training_PK PRIMARY KEY (id)

	,CONSTRAINT soccer_training_football_pitch_FK FOREIGN KEY (id_football_pitch) REFERENCES football_pitch(id)
	,CONSTRAINT soccer_training_category0_FK FOREIGN KEY (id_category) REFERENCES category(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: team
#------------------------------------------------------------

CREATE TABLE team(
        id           Int  Auto_increment  NOT NULL ,
        name_team    Varchar (255) ,
        name_address Varchar (255) ,
        address      Varchar (255) ,
        code_zip     Varchar (20) ,
        city         Varchar (255) ,
        id_user      Int NOT NULL
	,CONSTRAINT team_PK PRIMARY KEY (id)

	,CONSTRAINT team_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
	,CONSTRAINT team_user_AK UNIQUE (id_user)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: match_play
#------------------------------------------------------------

CREATE TABLE match_play(
        id                Int  Auto_increment  NOT NULL ,
        date              Datetime NOT NULL ,
        local             Bool NOT NULL ,
        id_football_pitch Int NOT NULL ,
        id_category       Int NOT NULL ,
        id_team_opposing  Int NOT NULL ,
        id_team           Int NOT NULL
	,CONSTRAINT match_play_PK PRIMARY KEY (id)

	,CONSTRAINT match_play_football_pitch_FK FOREIGN KEY (id_football_pitch) REFERENCES football_pitch(id)
	,CONSTRAINT match_play_category0_FK FOREIGN KEY (id_category) REFERENCES category(id)
	,CONSTRAINT match_play_team_opposing1_FK FOREIGN KEY (id_team_opposing) REFERENCES team_opposing(id)
	,CONSTRAINT match_play_team2_FK FOREIGN KEY (id_team) REFERENCES team(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: resultat
#------------------------------------------------------------

CREATE TABLE resultat(
        id                  Int  Auto_increment  NOT NULL ,
        opposing_team       Varchar (255) NOT NULL ,
        opposing_team_score Int NOT NULL ,
        date                Datetime NOT NULL ,
        team_score          Int NOT NULL ,
        local               Bool NOT NULL ,
        category            Varchar (255) NOT NULL ,
        id_team_opposing    Int NOT NULL ,
        id_match_play       Int NOT NULL ,
        id_category         Int NOT NULL
	,CONSTRAINT resultat_PK PRIMARY KEY (id)

	,CONSTRAINT resultat_team_opposing_FK FOREIGN KEY (id_team_opposing) REFERENCES team_opposing(id)
	,CONSTRAINT resultat_match_play0_FK FOREIGN KEY (id_match_play) REFERENCES match_play(id)
	,CONSTRAINT resultat_category1_FK FOREIGN KEY (id_category) REFERENCES category(id)
)ENGINE=InnoDB;


#############################################################
#
#                   - INIT DATABASE -
#
#############################################################

#------------------------------------------------------------
# INSERT: FIRST USER
#
# info CREDENTIAL :
#   email : nicolas@zanardo.com,
#   password: aa123456789
#------------------------------------------------------------



INSERT INTO user
(firstname, lastname, phone_number,  email, password, ROLE, is_valid_email, createdAt, updateAt)
VALUES
("nicolas" , "zanardo"    ,"0612345678", "nicolas@zanardo.com"             , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]",1,  NOW(), NOW()),
("Pat"     , "Thettick"   ,"0612345678", "samantha55@ernser.info"         , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Karen"   , "Onnabit"    ,"0612345678", "bennie04@gmail.com"             , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Greg"    , "Arias"      ,"0612345678", "marlee.rowe@littel.info"        , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Ann"     , "Chovey"     ,"0612345678", "jabari.purdy@hotmail.com"       , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 0,  NOW(), NOW()),
("Barry"   , "Cuda"       ,"0612345678", "hodkiewicz.jana@reilly.info"    , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Hazel"   , "Nutt"       ,"0612345678", "bennie04@gmail.com"             , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"BAN\"]"  , 0,  NOW(), NOW()),
("Pete"    , "Tsa"        ,"0612345678", "kertzmann.soledad@boyer.info"   , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Lois"    , "Lane"       ,"0612345678", "michaela.bortell@schneider.net" , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"BAN\"]"  , 1,  NOW(), NOW()),
("Clark"   , "Kent"       ,"0612345678", "michaela.bartella@schneider.net", "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Joseph"  , "Arimathea"  ,"0612345678", "nbotsford@kessler.com"          , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\"]"           , 1,  NOW(), NOW()),
("Dixie"   , "Normous"    ,"0612345678", "godfrey.beatty@hotmail.com"     , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Ann"     , "Chovey"     ,"0612345678", "jabari.purdy@hotmail.com"       , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 0,  NOW(), NOW()),
("Barry"   , "Cuda"       ,"0612345678", "hodkiewicz.jana@reilly.info"    , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Hazel"   , "Nutt"       ,"0612345678", "bennie04@gmail.com"             , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"BAN\"]"  , 0,  NOW(), NOW()),
("Pete"    , "Tsa"        ,"0612345678", "kertzmann.soledad@boyer.info"   , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Lois"    , "Lane"       ,"0612345678", "michaela.bartelli@schneider.net", "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"BAN\"]"  , 1,  NOW(), NOW()),
("Clark"   , "Kent"       ,"0612345678", "michaela.bartell@schneider.net" , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Joseph"  , "Arimathea"  ,"0612345678", "nbotsford@kessler.com"          , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\"]"           , 1,  NOW(), NOW()),
("Dixie"   , "Normous"    ,"0612345678", "godfrey.beatty@hotmail.com"     , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("Dustin"  , "Trailblazer","0612345678", "runte.raegan@yahoo.com"         , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW());


#------------------------------------------------------------
# INSERT: TEAM
#------------------------------------------------------------

INSERT INTO team (name_team, name_address, address, code_zip, city, id_user)
VALUES ("OSNY","OSNY Football Club","Rue du stade","95520","Osny",1);


#------------------------------------------------------------
# INSERT: CATEGORY
#------------------------------------------------------------
INSERT INTO category (name) VALUES
("SENIOR"),
("BENJAMIN"),
("POUSSIN");


#------------------------------------------------------------
# INSERT: TERRAIN
#------------------------------------------------------------
INSERT INTO football_pitch (name) VALUES
("TERRAIN - 1"),
("TERRAIN - 2"),
("TERRAIN - 3");