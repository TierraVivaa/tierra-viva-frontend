INSERT INTO usuarios (nombre, usuario, email, numeroCelular, contraseña) VALUES
('Juan Pérez', 'juanp', 'juan@email.com', 3001234567, '123456'),
('María Gómez', 'mariag', 'maria@email.com', 3017654321, '123456'),
('Carlos Ruiz', 'carlosr', 'carlos@email.com', 3029876543, '123456');

INSERT INTO categoria (nombre, descripcion) VALUES
('Frutas', 'Frutas frescas colombianas'),
('Tubérculos', 'Tubérculos del campo'),
('Verduras', 'Verduras orgánicas'),
('Café', 'Café colombiano'),
('Granos', 'Granos y legumbres');

INSERT INTO producto (nombre, descripcion, fechaVencimiento, precioUnitario, unidadDePeso, stock, imagen, id_categoria) VALUES
('Banano', 'Banano del Urabá', '2026-01-20', 1800, 'kg', 200, 'banano.jpg', 1),
('Mango Tommy', 'Mango dulce', '2026-01-18', 2500, 'kg', 150, 'mango.jpg', 1),
('Papa Criolla', 'Papa criolla lavada', '2026-02-10', 2200, 'kg', 300, 'papa.jpg', 2),
('Yuca', 'Yuca fresca', '2026-02-05', 1900, 'kg', 250, 'yuca.jpg', 2),
('Tomate', 'Tomate chonto', '2026-01-15', 2300, 'kg', 180, 'tomate.jpg', 3),
('Lechuga', 'Lechuga crespa', '2026-01-14', 1500, 'unidad', 120, 'lechuga.jpg', 3),
('Café Premium', 'Café molido 100%', '2027-01-01', 18000, '500g', 100, 'cafe.jpg', 4),
('Fríjol Cargamanto', 'Fríjol seco', '2026-06-01', 6500, 'kg', 90, 'frijol.jpg', 5),
('Lenteja', 'Lenteja nacional', '2026-06-01', 6000, 'kg', 80, 'lenteja.jpg', 5);

INSERT INTO carrito (id_usuario, precioTotal, fechaPedido) VALUES
(1, 4300, '2026-01-05'),
(2, 24500, '2026-01-06'),
(3, 8300, '2026-01-07');

INSERT INTO detalle_pedido (id_carrito, id_producto, cantidad) VALUES
(1, 1, 1),  -- Banano
(1, 5, 1),  -- Tomate

(2, 7, 1),  -- Café
(2, 9, 1),  -- Lenteja

(3, 3, 2),  -- Papa criolla
(3, 6, 1);  -- Lechuga


INSERT INTO pago (id_carrito, metodoPago, fecha_pago, monto) VALUES
(1, 'Tarjeta Débito', '2026-01-05', 4300),
(2, 'PSE', '2026-01-06', 24500),
(3, 'Efectivo', '2026-01-07', 8300);


