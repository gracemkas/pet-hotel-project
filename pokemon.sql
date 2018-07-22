CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    name varchar(255),
	type varchar(255),
	color varchar(255),
	checked_in varchar(255),
	trainer_id integer,
	checked_in_status boolean
);

CREATE TABLE trainers (
    id SERIAL PRIMARY KEY,
    name_trainer varchar(255)
);