DROP database IF EXISTS recipes ;
CREATE database recipes;
USE recipes;

create TABLE recipes (
	id int primary key AUTO_INCREMENT not null,
    name varchar (50) ,
    ethnic varchar (50),
    ingredients varchar (500),
    preparation text
    
);

insert into recipes (name, ethnic, Ingredients, preparation)
values ("marocain fish","maroco",
"1 red pepper,
4-5 tomatos,
1 gurlic head,
1 chopped coriander,
sweet paprika,
turmeric,
salt
3 Spicy dried red peppers
4-5 Pieces of Paddled Fish - Boneless fillet
canola oil",
"Heat some oil in a saucepan, cut the sweet pepper into thin strips and fry. Slice the tomatoes into thin slices and add to the pot.
Peel the garlic, add to the pot and lower the heat.
Add a quarter of the amount of coriander, half a teaspoon of paprika and a quarter teaspoon of turmeric.
Add half a cup of water and the hot pepper and cook over low heat with the lid closed.
In a separate bowl, mix a cup of canola oil with a heaping tablespoon of paprika,
 half a teaspoon of turmeric, a tablespoon of salt and the remaining coriander, until a uniform mixture is obtained.
Dip each fillet separately in a bowl and place in a saucepan.
 Pour the rest of the sauce over the fish. Continue to cook until the fish is ready.");


select* from recipes;

