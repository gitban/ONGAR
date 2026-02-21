-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-02-2026 a las 14:47:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ongar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `gestionar_contenido` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `usuario_id`, `username`, `password_hash`, `gestionar_contenido`) VALUES
(16, 0, 'esteban', '$2b$10$R3s3LmxJZT1vnOKHgRFvG.JwVS0S5ENlsB/b07SGOok1MDD1LaXZi', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animales`
--

CREATE TABLE `animales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `edad_aproximada` varchar(50) NOT NULL,
  `tamaño` varchar(50) NOT NULL,
  `estado_salud` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `foto` varchar(255) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `adoptado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `animales`
--

INSERT INTO `animales` (`id`, `nombre`, `sexo`, `edad_aproximada`, `tamaño`, `estado_salud`, `descripcion`, `foto`, `fecha_ingreso`, `adoptado`) VALUES
(23, 'Greta', 'Femenino', '3', 'grande', 'Esta castrada, vacunada y desparasitada!', 'Es una companía ideal para los niños y es muy guardiana y es merecedora de todo el amor!', '[\"/imagenes/1770932268866-11804194.jpg\",\"/imagenes/1770932300583-144941502.jpg\",\"/imagenes/1770932356191-435874616.jpg\"]', '2026-02-18', 0),
(24, 'Loto', 'Masculino', '4', '', 'desparasitado y vacunado', 'Es hermosaaaa', '[\"/imagenes/1770929623136-422263260.jpg\",\"/imagenes/1770932616429-728916518.jpg\",\"/imagenes/1770932616445-237835039.jpg\"]', '0000-00-00', 0),
(34, 'sarni 3', 'Masculino', '3', '', 'bueno, un poco bajo de peso pero lo estamos recuperando', 'Es muy cariñoso', '[\"/imagenes/1770930482671-248189649.jpg\",\"/imagenes/1770930482685-237339755.jpg\"]', '0000-00-00', 0),
(36, 'Lila', 'Femenino', '4', '', 'Bueno', '', '[\"/imagenes/1770901484773-109120113.jpg\",\"/imagenes/1770901484806-80390129.jpg\",\"/imagenes/1770901484814-185592309.jpg\"]', '0000-00-00', 20),
(37, 'Firulais', 'Masculino', '', '', 'desparasitado y vacunado', 'Es muy jugueton y simpatico', '[\"/imagenes/1770991518916-975365847.jpg\",\"/imagenes/1770991518938-67862249.jpg\",\"/imagenes/1770991519050-979957231.webp\"]', '0000-00-00', 21),
(38, 'Asrrael P', 'Masculino', '3', '', 'bueno, un poco bajo de peso pero lo estamos recuperando', 'Mimoso y muy esponjoso', '[\"/imagenes/1770992135423-782399764.jpg\",\"/imagenes/1770992135427-41108278.jpg\",\"/imagenes/1770992412343-442269942.webp\"]', '0000-00-00', 18),
(39, 'Garfield', 'No definido', '4', '', 'desparasitado y vacunado', 'esponjoso', '[\"/imagenes/1771247984811-455958718.jpg\",\"/imagenes/1771247984817-940796257.jpg\",\"/imagenes/1771247984826-447197194.webp\"]', '0000-00-00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donaciones`
--

CREATE TABLE `donaciones` (
  `id` int(11) NOT NULL,
  `donante_nombre` varchar(150) NOT NULL,
  `monto` float NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `referencia_pago` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias`
--

CREATE TABLE `historias` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `imagenes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `historias`
--

INSERT INTO `historias` (`id`, `titulo`, `contenido`, `imagenes`, `fecha_publicacion`) VALUES
(1, 'Un nuevo comienzo', 'Greta tuvo una nueva oportunidad cuando lo rescatamos, lo llevamos de la desnutrición a la posibilidad de crecer y encontrar una familia que lo ame y lo cuide', 'Greta', '2026-02-04 13:24:35'),
(2, 'Conoce a Sarni', 'Él es Sarni ❤️\r\n\r\nFue rescatado al costado de la ruta, estaba con sarna, heridas en su piel y tenía mucho miedo, tanto que nos acercábamos y se hacía pis.\r\nPasaba sus días en una garita, mañanas, tardes, noches solito ahí adentro esperando que alguien lo vea.\r\n\r\nHasta que un día pasamos y decidimos ¡Cambiarle el destino!\r\n\r\nHoy está en perfecto estado de salud, está desparasitado, vacunado y castrado.\r\n\r\nSe lleva bien con perras hembras, con gatos no sabemos y con las personas es un amor, quiere cariño y mimos.', 'Sarni', '2026-02-04 13:24:35'),
(3, 'Conocé a Dalila', 'Dalila es la \"abuela\" del grupo, una perra senior llena de sabiduría. Fue abandonada a una edad avanzada, pero nunca perdió su dulzura.<br>\r\n\r\nNo necesita largos paseos ni juegos intensos, solo un rincón cómodo, comida rica y una mano amiga que la acaricie.\r\n\r\nAdoptar a un perro senior como Dalila es un acto de amor puro. Ella tiene mucho agradecimiento para dar.', 'Dalila', '2026-02-04 14:04:27'),
(4, 'Conocé a Scooby', 'Scooby fue encontrado vagando cerca de la ruta, desorientado y buscando comida. Al principio era muy tímido, pero pronto descubrimos que detrás de esa timidez había un corazón enorme.\r\n\r\nEs un perro joven con mucha energía, ideal para familias activas. Le encanta correr y jugar a la pelota.\r\n\r\nScooby espera ansioso una familia que le dé la seguridad y el cariño que nunca tuvo en la calle.', 'Scooby', '2026-02-04 13:24:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id`, `titulo`, `contenido`, `imagen`, `fecha_publicacion`) VALUES
(1, 'Castraciones para perros y gatos a bajo costo', 'Este fin de semana estaremos realizando una jornada de castraciones a bajo costo en el club del barrio. Es fundamental reservar turno con anticipación para asegurar el lugar de tu mascota.\r\n\r\nLa castración es la única manera ética y efectiva de controlar la sobrepoblación animal. Además, trae múltiples beneficios para la salud de tu mascota, previniendo enfermedades y mejorando su comportamiento.\r\n\r\nRequisitos: Acercate con tu mascota con 8 horas de ayuno sólido y líquido. Los perros deben ir con correa y los gatos en transportadora o bolsa de red. ¡Te esperamos para cuidar juntos a nuestros animales!\r\n\r\n', 'castraciones', '2026-01-31 01:30:08'),
(2, 'Jornada de adopción en la plaza principal', '¡Vení a conocer a tu próximo mejor amigo! Estaremos este domingo en la plaza principal con nuestros perros que buscan un hogar para toda la vida.\r\n\r\nHabrá un stand informativo donde podrás aprender sobre tenencia responsable, cuidados básicos y cómo colaborar con nuestra causa. Si no podés adoptar en este momento, podés ayudarnos siendo hogar de tránsito o donando alimento.\r\n\r\n¡No te lo pierdas! Habrá música, sorteos y mucho amor peludo esperando por vos.', 'deuda', '2026-02-04 15:55:59'),
(3, 'Convocatoria para nuevos voluntarios Esteban', '¿Amás a los animales y querés hacer la diferencia real? ¡Sumate a nuestro equipo de voluntarios! Estamos buscando personas con gran corazón.\r\n\r\nNecesitamos ayuda en diversas áreas: paseos de los perros del refugio, limpieza y mantenimiento de caniles, traslados al veterinario y organización de eventos de recaudación.\r\n\r\nNo se necesita experiencia previa, solo compromiso y ganas de ayudar. Escribinos a nuestro contacto para más información sobre las charlas de capacitación que daremos la próxima semana.', 'voluntarios', '2026-02-04 01:46:41'),
(4, 'Ayudemos a Lamparita', 'Lamparita es una perrita que perdió un ojo y es necesarios administrarle medicación especial, el costo de la misma es alto lo que provoca que nos cueste mucho obtenerla!! con tu donación podes ayudar a que Lamparita se recupere....gracias!!!', 'lamparita', '2026-02-04 15:59:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_adopcion`
--

CREATE TABLE `solicitudes_adopcion` (
  `id_adopcion` int(11) NOT NULL,
  `id_animal` int(11) NOT NULL,
  `nombre_apellido` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `telefono` bigint(20) NOT NULL,
  `mensaje` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 0,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `observaciones` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `solicitudes_adopcion`
--

INSERT INTO `solicitudes_adopcion` (`id_adopcion`, `id_animal`, `nombre_apellido`, `email`, `direccion`, `telefono`, `mensaje`, `estado`, `fecha_envio`, `observaciones`) VALUES
(9, 23, 'esteban Perez', 'eaperez@comunidad.unnoba.edu.ar', 'Matheu 2878', 2914237918, 'A ver si me dan bola', 0, '2026-02-14 22:55:47', ''),
(18, 38, 'Gabina', 'gabi@gmail.com', 'mi casa', 2914779973, 'Mira que lindo!!', 1, '2026-02-15 00:37:49', ''),
(19, 38, 'Fermin', 'fermin@gmail.com', 'casa', 2914237918, 'esos bigotes', 0, '2026-02-13 23:55:08', ''),
(20, 36, 'Emilia', 'emi@gmail.com', 'casita', 2914779973, 'parece una vaquita\n', 1, '2026-02-15 01:00:20', 'Es una hermosa personita que ama a los animales ?❤️?'),
(21, 37, 'Fermin', 'fermin@gmail.com', 'Matheu 2878', 2914237918, 'Me gusta muchisimo!!', 1, '2026-02-15 00:34:31', ''),
(22, 34, 'Gabina', 'eaperez@comunidad.unnoba.edu.ar', 'casa', 2914779973, 'Lo quiero', 0, '2026-02-17 01:10:05', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `animales`
--
ALTER TABLE `animales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `donaciones`
--
ALTER TABLE `donaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historias`
--
ALTER TABLE `historias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitudes_adopcion`
--
ALTER TABLE `solicitudes_adopcion`
  ADD PRIMARY KEY (`id_adopcion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `animales`
--
ALTER TABLE `animales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `donaciones`
--
ALTER TABLE `donaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historias`
--
ALTER TABLE `historias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `solicitudes_adopcion`
--
ALTER TABLE `solicitudes_adopcion`
  MODIFY `id_adopcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
