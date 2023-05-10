#############################################################
#
#                   - DATASET FOOTZI -
#
#############################################################

#------------------------------------------------------------
# INSERT: FIRST USER
#
# info CREDENTIAL :
#   email : exemple@domain.com,
#   password: aa123456789
#------------------------------------------------------------



INSERT INTO user
(firstname, lastname, phone_number,  email, password, ROLE, is_valid_email, createdAt, updateAt)
VALUES
("oat"     , "thettick"   ,"0612345678", "samantha55@ernser.info"         , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("karen"   , "onnabit"    ,"0612345678", "bennie044@gmail.com"             , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("greg"    , "arias"      ,"0612345678", "marlee.rowe@littel.info"        , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("ann"     , "chovey"     ,"0612345678", "jabari.purdy@hotmail.com"       , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 0,  NOW(), NOW()),
("barry"   , "cuda"       ,"0612345678", "hodkiewicz.jana@reilly.info"    , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("hazel"   , "nutt"       ,"0612345678", "bennie064@gmail.com"             , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"BAN\"]"  , 0,  NOW(), NOW()),
("pete"    , "tsa"        ,"0612345678", "kertzmannu.soledad@boyer.info"   , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("lois"    , "lane"       ,"0612345678", "michaela.bortell@schneider.net" , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"BAN\"]"  , 1,  NOW(), NOW()),
("clark"   , "kent"       ,"0612345678", "michaela1.bartella@schneider.net", "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("joseph"  , "arimathea"  ,"0612345678", "nbotsford12@kessler.com"          , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\"]"           , 1,  NOW(), NOW()),
("dixie"   , "normous"    ,"0612345678", "godfrey12.beatty@hotmail.com"     , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("ann"     , "chovey"     ,"0612345678", "jabari5.purdy25@hotmail.com"       , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 0,  NOW(), NOW()),
("barry"   , "cuda"       ,"0612345678", "hodkiewicz58.jana@reilly.info"    , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("hazel"   , "nutt"       ,"0612345678", "bennie04@gmail.com"             , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"BAN\"]"  , 0,  NOW(), NOW()),
("pete"    , "tsa"        ,"0612345678", "kertzmann.soledad@boyer.info"   , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("lois"    , "lane"       ,"0612345678", "michaela5.bartelli@schneider.net", "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"BAN\"]"  , 1,  NOW(), NOW()),
("clark"   , "kent"       ,"0612345678", "michaela8.bartell@schneider.net" , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("joseph"  , "arimathea"  ,"0612345678", "nbotsford@kessler.com"          , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\"]"           , 1,  NOW(), NOW()),
("dixie"   , "normous"    ,"0612345678", "godfrey.beatty@hotmail.com"     , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW()),
("dustin"  , "trailblazer","0612345678", "runte.raegan@yahoo.com"         , "$2b$16$.6DGMsHQv2G5GRePXEGn.eUD5mLFuPy4tfcgZn7fz6GocxE0wbLb2","[\"USER\", \"ADMIN\"]", 1,  NOW(), NOW());


#------------------------------------------------------------
# INSERT: CATEGORY
#------------------------------------------------------------
INSERT INTO category (name) VALUES
("u6-u7/u8-U9"),
("u15-u14"),
("u17-u16"),
("u19-u18"),
("séniors"),
("anciens"),
('vétérans +45ans');

#------------------------------------------------------------
# INSERT: TERRAIN
#------------------------------------------------------------
INSERT INTO football_pitch (name) VALUES
("terrain - ouest"),
("terrain - sud"),
("terrain - est"),
("terrain - nord");

#------------------------------------------------------------
# INSERT: TRAINING
#------------------------------------------------------------
INSERT INTO soccer_training
        (day, hour_start, id_football_pitch, id_category)
VALUES
    ("mardi"   , "18:00", 1, 2),
    ("mercredi", "16:00", 1, 1),
    ("vendredi", "19:30", 3, 1),
    ("samedi"  , "10:00", 2, 3),
    ("lundi"   , "18:30", 1, 2),
    ("mardi"   , "18:00", 2, 3),
    ("samedi"  , "10:00", 1, 2);

#------------------------------------------------------------
# INSERT: OPPOSING TEAM
#------------------------------------------------------------
INSERT INTO team_opposing (name) VALUES
("psg"),
("marseille"),
("lyon"),
("toulouse");

