
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

insert into towns(town_names, town_code) values('Cape Town', 'CA');
insert into towns(town_names, town_code) values('Paarl', 'CL');
insert into towns(town_names, town_code) values('George', 'CAW');
insert into towns(town_names, town_code) values('Stellenbosch', 'CJ');

