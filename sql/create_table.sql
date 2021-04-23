use blog;

CREATE TABLE posts(
ID int primary key auto_increment,
Titulo varchar(25),
Contenido varchar(140),
Imagen varchar(140),
Categoria varchar(25),
Fecha_Creacion date)