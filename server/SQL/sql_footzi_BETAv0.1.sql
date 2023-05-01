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
        id  Int  Auto_increment  NOT NULL ,
        nom Varchar (255) NOT NULL
	,CONSTRAINT category_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        id             Int  Auto_increment  NOT NULL ,
        firstname      Varchar (255) NOT NULL ,
        lastname       Varchar (255) NOT NULL ,
        email          Varchar (255) NOT NULL ,
        password       Varchar (255) NOT NULL ,
        ROLE           Longtext NOT NULL ,
        is_valid_email Bool NOT NULL ,
        id_category    Int
	,CONSTRAINT user_PK PRIMARY KEY (id)

	,CONSTRAINT user_category_FK FOREIGN KEY (id_category) REFERENCES category(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: opposing_team
#------------------------------------------------------------

CREATE TABLE opposing_team(
        id  Int  Auto_increment  NOT NULL ,
        nom Varchar (255) NOT NULL
	,CONSTRAINT opposing_team_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: match_play
#------------------------------------------------------------

CREATE TABLE match_play(
        id                Int  Auto_increment  NOT NULL ,
        date              Date NOT NULL ,
        local             Bool NOT NULL ,
        id_football_pitch Int ,
        id_category       Int NOT NULL ,
        id_opposing_team  Int NOT NULL
	,CONSTRAINT match_play_PK PRIMARY KEY (id)

	,CONSTRAINT match_play_football_pitch_FK FOREIGN KEY (id_football_pitch) REFERENCES football_pitch(id)
	,CONSTRAINT match_play_category0_FK FOREIGN KEY (id_category) REFERENCES category(id)
	,CONSTRAINT match_play_opposing_team1_FK FOREIGN KEY (id_opposing_team) REFERENCES opposing_team(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: soccer_training
#------------------------------------------------------------

CREATE TABLE soccer_training(
        id                Varchar (255) NOT NULL ,
        day               Int NOT NULL ,
        hour_start        Time NOT NULL ,
        hour_end          Time NOT NULL ,
        time_diff         Int NOT NULL ,
        id_football_pitch Int NOT NULL ,
        id_category       Int NOT NULL
	,CONSTRAINT soccer_training_PK PRIMARY KEY (id)

	,CONSTRAINT soccer_training_football_pitch_FK FOREIGN KEY (id_football_pitch) REFERENCES football_pitch(id)
	,CONSTRAINT soccer_training_category0_FK FOREIGN KEY (id_category) REFERENCES category(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: resultat
#------------------------------------------------------------

CREATE TABLE resultat(
        id                  Int  Auto_increment  NOT NULL ,
        opposing_team       Varchar (255) NOT NULL ,
        opposing_team_score Int NOT NULL ,
        date                Date NOT NULL ,
        team_score          Int NOT NULL ,
        local               Bool NOT NULL ,
        category            Varchar (255) NOT NULL ,
        id_opposing_team    Int NOT NULL ,
        id_match_play       Int NOT NULL ,
        id_category         Int NOT NULL
	,CONSTRAINT resultat_PK PRIMARY KEY (id)

	,CONSTRAINT resultat_opposing_team_FK FOREIGN KEY (id_opposing_team) REFERENCES opposing_team(id)
	,CONSTRAINT resultat_match_play0_FK FOREIGN KEY (id_match_play) REFERENCES match_play(id)
	,CONSTRAINT resultat_category1_FK FOREIGN KEY (id_category) REFERENCES category(id)
)ENGINE=InnoDB;

