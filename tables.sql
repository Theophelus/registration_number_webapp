create table towns
(
    id serial primary key,
    town_names text not null,
    town_code text not null
);

create table registration_numbers
(
    id serial not null primary key,
    registration_plates text not null,
    towns_id int,
    foreign key (towns_id) references towns(id)
);